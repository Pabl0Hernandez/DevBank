using System;

namespace API_VSCode.Models
{
    public class UserReadDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public string Phone { get; set; }
        public string DocumentId { get; set; }
    }
}
