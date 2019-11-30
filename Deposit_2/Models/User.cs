using System;
using Newtonsoft.Json;

namespace Deposit_2.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Email { get; set; }
        public string FiltersConfig { get; set; }
        public string ProfileConfig { get; set; }
        [JsonIgnore]
        public DateTime BlockExpires { get; set; }
        [JsonIgnore]
        public int FailedAuthRetryCount { get; set; }
    }
}
