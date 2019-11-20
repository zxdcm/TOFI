using System;
using System.Security.Cryptography;
using System.Text;

namespace Deposit_2.Utils
{
    public class SecurityExtensions
    {
        public static string SecureWithMd5(string message, string salt)
            => Convert.ToBase64String(MD5.Create().ComputeHash(Encoding.UTF8.GetBytes(string.Join("", message, salt, Configuration.HashSalt))));
    }
}
