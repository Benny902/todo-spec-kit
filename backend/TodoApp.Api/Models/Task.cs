using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.Models
{
    public class Task
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

    public bool Completed { get; set; } = false;

    public string? Description { get; set; }

    public DateTime? DueDate { get; set; }
    }
}
