namespace Hdz.Core.Models
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
        public bool HasNext => PageNumber < TotalPage;
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
}
