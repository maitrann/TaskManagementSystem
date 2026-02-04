namespace TaskMS.Server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }

        public ICollection<TodoTask> TodoTasks { get; set; }

    }
}
