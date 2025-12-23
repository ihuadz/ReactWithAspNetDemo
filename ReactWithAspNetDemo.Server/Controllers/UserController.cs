using Microsoft.AspNetCore.Mvc;
using ReactWithAspNetDemo.Server.Models.Entities;
using SqlSugar;

namespace ReactWithAspNetDemo.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(ISqlSugarClient db) : ControllerBase
    {
        [HttpGet("page-list")]
        public async Task<dynamic> PageListAsync()
        {
            var list = await db.SqlQueryable<User>("select * from User")
                .OrderBy(a => a.Id)
                .ToPageListAsync(1,2);

            return list;
        }
    }
}
