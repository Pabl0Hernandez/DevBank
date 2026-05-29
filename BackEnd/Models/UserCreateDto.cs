using System;

namespace API_VSCode.Models
{
    public class UserCreateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public string Phone { get; set; }
        public string DocumentId { get; set; }
    }
}
