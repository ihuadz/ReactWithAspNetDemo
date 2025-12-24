namespace Aura.Shared.Core.Exceptions
{
    /// <summary>
    /// 所有主动抛出的业务异常
    /// </summary>
    /// <param name="message"></param>
    /// <param name="statusCode"></param>
    /// <param name="extensions"></param>
    public class DomainException(string message, int statusCode = 400, Dictionary<string, object?>? extensions = null) : Exception(message)
    {
        public int StatusCode { get; } = statusCode;
        public Dictionary<string, object?>? Extensions { get; } = extensions;
    }
}
