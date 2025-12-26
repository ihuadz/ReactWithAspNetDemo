namespace Aura.Shared.Core.Models
{
    [Serializable]
    public class PageResults<T>
    {
        public PageResults(
        long total,
        IEnumerable<T> rows,
        long pageSize = 10,
        long pageNumber = 1)
        {
            this.Rows = rows;
            this.Total = total;
            this.PageSize = pageSize;
            this.PageNumber = pageNumber;

            ComputeTotalPage();
        }

        public PageResults(
        long total,
        IEnumerable<T> rows,
        PageInput pageInput)
        {
            this.Rows = rows;
            this.Total = total;
            this.PageSize = pageInput.PageSize;
            this.PageNumber = pageInput.PageNumber;

            ComputeTotalPage();
        }

        public PageResults(
        long total,
        long totalPage,
        IEnumerable<T> rows,
        long pageSize = 10,
        long pageNumber = 1)
        {
            this.Rows = rows;
            this.Total = total;
            this.TotalPage = totalPage;
            this.PageSize = pageSize;
            this.PageNumber = pageNumber;
        }


        public long Total { get; set; }
        public long TotalPage { get; set; }
        public long PageSize { get; set; } = 10;
        public long PageNumber { get; set; } = 1;
        public bool HasPrev => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPage;
        public bool IsFirst => PageNumber == 1;
        public bool IsLast => PageNumber == TotalPage;
        public IEnumerable<T> Rows { get; set; }

        /// <summary>
        /// 计算总页数
        /// </summary>
        protected virtual void ComputeTotalPage()
        {
            if (Total == 0 && !IsNullOrZreo(Rows)) Total = Rows.Count();
            TotalPage = Total % PageSize == 0 ? (int)Total / PageSize : (int)Total / PageSize + 1;
        }

        private static bool IsNullOrZreo(IEnumerable<T> @this)
        {
            if (@this != null)
            {
                return !@this.GetEnumerator().MoveNext();
            }
            return true;
        }
    }

    /// <summary>
    /// 分页静态工具类
    /// </summary>
    public static class PageResults
    {
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="total"></param>
        /// <param name="rows"></param>
        /// <param name="pageInput"></param>
        /// <returns></returns>
        public static PageResults<T> ToPagedList<T>(long total, IEnumerable<T> rows, PageInput pageInput)
        {
            return new PageResults<T>(total, rows, pageInput);
        }

        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="rows"></param>
        /// <param name="total"></param>
        /// <param name="pageInput"></param>
        /// <returns></returns>
        public static PageResults<T> ToPagedList<T>(this IEnumerable<T> rows, long total,  PageInput pageInput)
        {
            return new PageResults<T>(total, rows, pageInput);
        }
    }
}
