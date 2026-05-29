using System;
using System.Collections.Generic;

namespace API_VSCode.Models
{
    public class Card
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Number { get; set; }
        public string HolderName { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Type { get; set; }
        public decimal CardLimit { get; set; }
        public decimal CurrentBalance { get; set; }
        public User User { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}