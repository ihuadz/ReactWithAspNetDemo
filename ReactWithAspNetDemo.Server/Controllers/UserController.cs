using Aura.Shared.Core.Exceptions;
using Aura.Shared.Core.Models;
using Masuit.Tools.Models;
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
        public async Task<PageResults<User>> PageListAsync([FromQuery]PageInput input)
        {
            RefAsync<int> total = 0;
            var list = await db.SqlQueryable<User>("select * from User")
                .OrderBy(a => a.Id)
                .ToPageListAsync(input.PageNumber, input.PageSize, total);

            return list.ToPagedList(total, input);
        }

        [HttpGet("test")]
        public void Test()
        {
            throw new DomainException("This is a customer error!", extensions: new Dictionary<string, object?>()
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
