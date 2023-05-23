using Microsoft.EntityFrameworkCore;
using quiz_backend.models;

namespace quiz_backend
{
    public class QuizContext : DbContext 
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options) { }

        public DbSet<models.Question> Questions{ get; set; }

        public DbSet<quiz_backend.models.Quiz> Quiz { get; set; }
    }
}
