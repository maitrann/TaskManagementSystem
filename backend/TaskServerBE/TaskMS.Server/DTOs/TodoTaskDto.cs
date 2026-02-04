using TaskStatus = TaskMS.Server.Common.TaskStatus;

namespace TaskMS.Server.DTOs
{
    public class TodoTaskDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Todo;

    }
}
