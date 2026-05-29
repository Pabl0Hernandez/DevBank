using System;

namespace API_VSCode.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? CardId { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public string RecipientIdentifier { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
        public Card Card { get; set; }
    }
}