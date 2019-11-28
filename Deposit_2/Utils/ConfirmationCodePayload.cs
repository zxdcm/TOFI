using System;

namespace Deposit_2.Utils
{
    public class ConfirmationCodePayload
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public int CodeLifetimeInMinutes { get; set; }
        public DateTime CreatedOn { get; } = DateTime.UtcNow;
    }
}
