using Microsoft.EntityFrameworkCore;
using System;
using TaskMS.Server.Models;

namespace TaskMS.Server.Data
{
    public class TaskMSContext : DbContext
    {
        public TaskMSContext(DbContextOptions<TaskMSContext> options)
            : base(options) { }

        public DbSet<TodoTask> TodoTasks { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoTask>(entity =>
            {
                entity.ToTable("tasks");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                      .HasColumnType("uuid")
                      .ValueGeneratedNever();

                entity.Property(e => e.Title)
                      .IsRequired();

                entity.Property(e => e.Description);

                entity.Property(e => e.Status)
                      .HasConversion<int>()
                      .IsRequired();

                entity.Property(e => e.CreatedAt)
                      .IsRequired();

                entity.Property(e => e.UserId)
                      .HasColumnType("uuid")
                      .IsRequired();
                entity.HasOne(e => e.User)
                  .WithMany(u => u.TodoTasks)
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasKey(x => x.Id);

                entity.HasIndex(x => x.Username)
                      .IsUnique();
            });

        }
    }
}
