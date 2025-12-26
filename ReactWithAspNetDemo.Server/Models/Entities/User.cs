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

        [SugarColumn(ColumnName = "password_hash", ColumnDataType = "TEXT", IsNullable = false)]
        public string PasswordHash { get; set; } = string.Empty;

        [SugarColumn(ColumnName ="created_at",ColumnDataType = "DATETIME", DefaultValue = "CURRENT_TIMESTAMP")]
        public DateTime CreatedAt { get; set; }

        [SugarColumn(ColumnName = "is_active",DefaultValue = "0")]
        public bool IsActive { get; set; }
    }
}
