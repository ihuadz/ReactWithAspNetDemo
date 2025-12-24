namespace Aura.Shared.Core.Models
{
    [Serializable]
    public class PageInput
    {
        public PageInput() { }

        public PageInput(int pageSize = 10,
            int pageNumber = 1,
            string searchText = "",
            string sortName = "",
            string sortOrder = "")
        {
            SearchText = searchText;
            PageSize = pageSize;
            PageNumber = pageNumber;
            SortName = sortName;
            SortOrder = sortOrder;
        }

        public virtual string? SearchText { get; set; } = string.Empty;
        public virtual int PageSize { get; set; } = 10;
        public virtual int PageNumber { get; set; } = 1;

        public virtual string? SortName { get; set; }
        public virtual string? SortOrder { get; set; }

        public long GetSkip()
        {
            return (PageNumber - 1) * PageSize;
        }
    }

    [Serializable]
    public class PageInput<T> : PageInput where T : class
    {
        public T? Filter { get; set; }
    }
}
