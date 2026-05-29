using System;

namespace API_VSCode.Models
{
    public class BankIntegration
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string BankName { get; set; }
        public decimal Balance { get; set; }
        public string Status { get; set; }
        public User User { get; set; }
    }
}