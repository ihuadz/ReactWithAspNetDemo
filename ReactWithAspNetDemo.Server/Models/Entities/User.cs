using SqlSugar;

namespace ReactWithAspNetDemo.Server.Models.Entities
{
    public class User
    {
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        [SugarColumn(ColumnDataType = "TEXT", IsNullable = false)]
        public string Username { get; set; } = string.Empty;

        [SugarColumn(ColumnDataType = "TEXT", IsNullable = false)]
        public string Email { get; set; } = string.Empty;

        [SugarColumn(ColumnDataType = "TEXT", IsNullable = false)]
        public string PasswordHash { get; set; } = string.Empty;

        [SugarColumn(ColumnDataType = "DATETIME", DefaultValue = "CURRENT_TIMESTAMP")]
        public DateTime CreatedAt { get; set; }

        [SugarColumn(DefaultValue = "1")]
        public bool IsActive { get; set; }
    }
}
