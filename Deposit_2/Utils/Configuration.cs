namespace Deposit_2.Utils
{
    public class ApplicationConfiguration
    {
        public int BlockTimeInMinutes { get; set; }
        public int AmountOfRetriesUntilBlock { get; set; }
        public int EmailConfirmationCodeLifetimeInMinutes { get; set; }
        public int SignUpConfirmationCodeLifetimeInMinutes { get; set; }

        public string DefaultConnectionString { get; set; }

        public string Host { get; set; }
        public int PortNumber { get; set; }
        public bool UseSsl { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Md5Salt { get; set; }
        public string AesKey { get; set; }
        public string AesSalt { get; set; }
    }
}
