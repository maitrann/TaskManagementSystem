using System.ComponentModel.DataAnnotations;
using TaskStatus = TaskMS.Server.Common.TaskStatus;

namespace TaskMS.Server.Models
{
    public class TodoTask
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Todo;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
