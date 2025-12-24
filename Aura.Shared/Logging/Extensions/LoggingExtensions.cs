using Serilog;
using Serilog.Events;

namespace Aura.Shared.Logging.Extensions;

public static class LoggingExtensions
{
    public static void AddAuraLogging(this IHostApplicationBuilder builder)
    {
        var isDev = builder.Environment.IsDevelopment();
        // 定义日志模板
        const string outputTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss.fff} [{Level:u3}] {Message:lj}{NewLine}{Exception}";

        var config = new LoggerConfiguration()
        // 级别控制：开发环境 Debug，生产环境 Info
            .MinimumLevel.Is(isDev ? LogEventLevel.Debug : LogEventLevel.Information)
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
            .Enrich.FromLogContext();

        // 控制台输出 (同步输出，方便实时查看)
        config.WriteTo.Console(isDev ? LogEventLevel.Debug : LogEventLevel.Information, outputTemplate: outputTemplate);

        // 异步文件输出 (生产环境必备，防止 IO 阻塞)
        config.WriteTo.Async(a =>
        {
            // Error 及以上级别
            a.Logger(lc => lc
                .Filter.ByIncludingOnly(e => e.Level >= LogEventLevel.Error)
                .WriteTo.File("logs/error-.log",
                    rollingInterval: RollingInterval.Day,
                    outputTemplate: outputTemplate));

            // Warning 级别
            a.Logger(lc => lc
                .Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Warning)
                .WriteTo.File("logs/warn-.log",
                    rollingInterval: RollingInterval.Day,
                    outputTemplate: outputTemplate));

            // Information 级别
            a.Logger(lc => lc
                .Filter.ByIncludingOnly(e => e.Level == LogEventLevel.Information)
                .WriteTo.File("logs/info-.log",
                    rollingInterval: RollingInterval.Day,
                    outputTemplate: outputTemplate));
        });

        Log.Logger = config.CreateLogger();

        builder.Services.AddSerilog();
    }
}