using Masuit.Tools.Core.AspNetCore;
using SqlSugar;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// 自动扫描注册服务
builder.Services.AutoRegisterServices();

// 注册Aura
builder.AddAuraWeb();

var app = builder.Build();

// 引入Aura
app.UseAura();

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


app.Run();
