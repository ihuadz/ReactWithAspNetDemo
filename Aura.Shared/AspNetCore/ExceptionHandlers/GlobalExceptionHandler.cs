using Aura.Shared.Core.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Aura.Shared.AspNetCore.ExceptionHandlers
{
    /// <summary>
    /// 全局异常处理
    /// </summary>
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger,
        IProblemDetailsService problemDetailsService) : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger = logger;

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            // 记录日志
            _logger.LogError(exception, "Unhandled exception: {Message}. TraceId: {TraceId}",
                exception.Message, httpContext.TraceIdentifier);

            // 确定状态码和标题
            var (statusCode, title) = exception switch
            {
                DomainException domainEx => (domainEx.StatusCode, "Business Error"),
                _ => (StatusCodes.Status500InternalServerError, "Server Error")
            };

            // 设置HTTP状态码
            httpContext.Response.StatusCode = statusCode;

            // 构建 ProblemDetails
            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = exception.Message,
                Type = $"https://httpstatuses.com/{statusCode}"
            };

#if (DEBUG)
            // 调试模式返回堆栈信息
            problemDetails.Extensions["innerException"] = exception.ToString();
#endif

            // 注入扩展属性
            if (exception is DomainException domainException && domainException.Extensions != null)
            {
                problemDetails.Extensions["additionalInfo"] = domainException.Extensions;
            }

            // 写入响应
            return await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
            {
                HttpContext = httpContext,
                ProblemDetails = problemDetails,
                Exception = exception
            });
        }
    }
}
