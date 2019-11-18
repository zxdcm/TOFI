using System;

namespace Deposit_2.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FiltersConfig { get; set; }
        public DateTime LastAuthRetry { get; set; }
        public int AuthRetryCounter { get; set; }
    }
}
