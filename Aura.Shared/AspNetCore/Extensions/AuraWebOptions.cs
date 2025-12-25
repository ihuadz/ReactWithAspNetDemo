namespace Aura.Shared.AspNetCore.Extensions
{
    public class AuraWebOptions
    {
        /// <summary>
        /// 数据库注册选项
        /// </summary>
        public Action<IServiceCollection>? RegisterDb { get; set; }
    }
}
