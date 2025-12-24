using Aura.Shared.AspNetCore.ExceptionHandlers;
using Aura.Shared.Logging.Extensions;
using System.Text.Json;

#pragma warning disable IDE0130
namespace Microsoft.Extensions.DependencyInjection;
#pragma warning restore IDE0130

public static class AuraServiceExtensions
{
    /// <summary>
    /// 一键集成 Aura 核心服务：日志分流、异常处理、JSON小驼峰
    /// </summary>
    public static void AddAuraWeb(this WebApplicationBuilder builder)
    {
        // 注册日志
        builder.AddAuraLogging();

        // 注册全局异常
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails();

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
        return app;
    }
}