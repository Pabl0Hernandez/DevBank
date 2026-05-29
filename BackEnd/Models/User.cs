using System;
using System.Collections.Generic;

namespace API_VSCode.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public string Phone { get; set; }
        public string DocumentId { get; set; }
        public ICollection<Card>? Cards { get; set; }
        public ICollection<Transaction>? Transactions { get; set; }
        public UserSettings? UserSettings { get; set; }
        public ICollection<BankIntegration>? BankIntegrations { get; set; }
    }
}