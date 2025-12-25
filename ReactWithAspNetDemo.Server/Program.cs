using SqlSugar;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// 注册Aura
builder.AddAuraWeb(option =>
{
    // 注册ORM
    option.RegisterDb = (services) =>
    {
        services.AddScoped<ISqlSugarClient>(provider =>
         {
             var config = new ConnectionConfig
             {
                 ConnectionString = builder.Configuration.GetConnectionString("SQLite"),
                 DbType = DbType.Sqlite,
                 IsAutoCloseConnection = true, 
                 InitKeyType = InitKeyType.Attribute 
             };

             return new SqlSugarClient(config);
         });
    };
});

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
