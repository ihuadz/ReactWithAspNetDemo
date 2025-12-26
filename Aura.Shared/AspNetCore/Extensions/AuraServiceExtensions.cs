using Aura.Shared.AspNetCore.ExceptionHandlers;
using Aura.Shared.AspNetCore.Extensions;
using Aura.Shared.Logging.Extensions;
using Masuit.Tools.Core.AspNetCore;
using Microsoft.Extensions.Options;
using System.Text.Json;

#pragma warning disable IDE0130
namespace Microsoft.Extensions.DependencyInjection;
#pragma warning restore IDE0130

public static class AuraServiceExtensions
{
    /// <summary>
    /// 一键集成 Aura 核心服务
    /// </summary>
    public static void AddAuraWeb(this WebApplicationBuilder builder, Action<AuraWebOptions>? setupAction = null)
    {
        var options = new AuraWebOptions();
        setupAction?.Invoke(options);

        // 自动扫描注册服务
        builder.Services.AutoRegisterServices();

        // 注册日志
        builder.AddSerilog();

        // 选择注册数据库服务
        options.RegisterDb?.Invoke(builder.Services);

        // 注册全局异常
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails(option =>
        {
            option.CustomizeProblemDetails = (context) =>
            {
                var httpContext = context.HttpContext;

                // 统一注入 traceId
                context.ProblemDetails.Extensions["traceId"] = httpContext.TraceIdentifier;

                // 统一注入 instance (请求路径)
                context.ProblemDetails.Instance = $"{httpContext.Request.Method} {httpContext.Request.Path}";

                string status = context.ProblemDetails.Status.ToString() ?? "";
                context.ProblemDetails.Type = $"https://httpstatuses.com/{status}";
            };
        });

        // 配置 JSON 序列化 (处理字典与属性的小驼峰)
        builder.Services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.SerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
        });

        // 配置路由选项（确保全小写）
        builder.Services.Configure<RouteOptions>(options =>
        {
            options.LowercaseUrls = true;
            options.LowercaseQueryStrings = true;
        });
    }

    /// <summary>
    /// 启用 Aura 中间件
    /// </summary>
    public static WebApplication UseAura(this WebApplication app)
    {
        app.UseExceptionHandler();
        app.UseStatusCodePages();
        return app;
    }
}