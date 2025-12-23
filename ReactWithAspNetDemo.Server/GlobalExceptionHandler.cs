using Hdz.Core.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace ReactWithAspNetDemo.Server
{
    /// <summary>
    /// 全局异常处理
    /// </summary>
    public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
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
                UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Unauthorized"),
                KeyNotFoundException => (StatusCodes.Status404NotFound, "Resource Not Found"),
                _ => (StatusCodes.Status500InternalServerError, "Server Error")
            };

            // 构建 ProblemDetails
            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = exception.Message,
                Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}",
                Type = $"https://httpstatuses.com/{statusCode}"
            };

            // 注入扩展属性
            if (exception is DomainException domainException && domainException.Extensions != null)
            {
                problemDetails.Extensions["addtionalInfo"] = domainException.Extensions;
            }

            // 写入响应
            httpContext.Response.StatusCode = statusCode;
            httpContext.Response.ContentType = "application/json";
            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true; // 表示异常已处理
        }
    }
}
