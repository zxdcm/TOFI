namespace Deposit_2.Utils
{
    public class Result<T> 
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public static Result<T> Ok(string message = null, T data = default(T))
            => new Result<T> { IsSuccess = true, Data = data, Message = message };

        public static Result<T> Ok(T data = default(T), string message = null)
            => Ok(message, data);

        public static Result<T> Fail(string message = null, T data = default(T))
            => new Result<T> { IsSuccess = false, Data = data, Message = message };

        public static Result<T> Fail(T data = default(T), string message = null)
            => Fail(message, data);
    }
}
