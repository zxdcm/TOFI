namespace Deposit_2.Utils
{
    public class ApplicationConfiguration
    {
        // Move to config
        public double BlockTimeInMinutes { get; set; }
        public int AmountOfRetriesUntilBlock { get; set; }
        public double ConfirmationCodeValidTimeInMinutes { get; set; }

        public string StmpServer { get; set; }
        public int PortNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string HashSalt { get; set; }
        public string AesKey { get; set; }
    }
}
