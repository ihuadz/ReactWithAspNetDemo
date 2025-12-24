using Aura.Shared.Core.Exceptions;
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
        public async Task<List<User>> PageListAsync()
        {
            var list = await db.SqlQueryable<User>("select * from User")
                .OrderBy(a => a.Id)
                .ToPageListAsync(1, 2);

            return list;
        }

        [HttpGet("test")]
        public void Test()
        {
            throw new DomainException("An error occurred!", extensions: new Dictionary<string, object?>()
            {
                { "ErrCode",1001}
            });
        }

        [HttpGet("test2")]
        public dynamic Test2()
        {
            return new
            {
                Name = "Test2",

                Age = 20

            };
        }
    }
}
