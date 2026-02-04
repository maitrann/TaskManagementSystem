using System;
using System.Security.Claims;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskMS.Server.Data;
using TaskMS.Server.DTOs;
using TaskMS.Server.Models;

namespace TaskMS.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskMSContext _context;

        public TasksController(TaskMSContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetTodoTasks()
        {
            var userId = GetUserId();

            return await _context.TodoTasks.Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt).ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoTask>> GetTodoTask(Guid id)
        {
            var userId = GetUserId();
            var todoTask = await _context.TodoTasks.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);

            if (todoTask == null)
            {
                return NotFound();
            }

            return todoTask;
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoTask(Guid id, TodoTaskDto modelUpdate)
        {
            var userId = GetUserId();

            var existingTask = await _context.TodoTasks.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (existingTask == null) return NotFound();

            existingTask.Title = modelUpdate.Title;
            existingTask.Description = modelUpdate.Description;
            existingTask.Status = modelUpdate.Status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TodoTask>> PostTodoTask(TodoTaskDto modelUpdate)
        {
            var todoTask = new TodoTask
            {
                Id = Guid.NewGuid(),
                Title = modelUpdate.Title,
                Description = modelUpdate.Description,
                Status = modelUpdate.Status,
                CreatedAt = DateTime.UtcNow,
                UserId = GetUserId()
            };

            _context.TodoTasks.Add(todoTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoTask", new { id = todoTask.Id }, todoTask);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoTask(Guid id)
        {
            var userId = GetUserId();

            var todoTask = await _context.TodoTasks.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
            if (todoTask == null)
            {
                return NotFound();
            }

            _context.TodoTasks.Remove(todoTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private Guid GetUserId()
        {
            return Guid.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );
        }

    }
}
