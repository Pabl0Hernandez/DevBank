using System;

namespace API_VSCode.Models
{
    public class UserSettings
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Language { get; set; }
        public bool TwoFactorAuth { get; set; }
        public bool Biometrics { get; set; }
        public bool EmailNotifications { get; set; }
        public bool PushNotifications { get; set; }
        public User User { get; set; }
    }
}