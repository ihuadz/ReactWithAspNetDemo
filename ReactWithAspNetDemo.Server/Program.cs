using Masuit.Tools.Core.AspNetCore;
using ReactWithAspNetDemo.Server;
using SqlSugar;

var builder = WebApplication.CreateBuilder(args);

// 配置路由选项（确保全小写）
builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;          // 启用小写URL
    options.LowercaseQueryStrings = true;  // 查询字符串也小写
});

// 注册sqlsugar
builder.Services.AddScoped<ISqlSugarClient>(provider =>
{
    var config = new ConnectionConfig
    {
        ConnectionString = builder.Configuration.GetConnectionString("SQLite"),
        DbType = DbType.Sqlite,
        IsAutoCloseConnection = true, // 自动释放连接
        InitKeyType = InitKeyType.Attribute // 通过特性初始化
    };

    return new SqlSugarClient(config);
});

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();


// 自动扫描注册服务
builder.Services.AutoRegisterServices();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.UseExceptionHandler();

app.Run();
