using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quiz_backend.models;
using System.Runtime.InteropServices;

namespace quiz_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        readonly QuizContext context;

        public QuestionsController(QuizContext context) { 
            this.context = context;
        }


        [HttpGet]
        public IEnumerable<models.Question> Get()
        {
            return this.context.Questions;
        }

        [HttpGet("{quizId}")]
        public IEnumerable<models.Question> Get([FromRoute] int quizId)
        {
            var questions = this.context.Questions.Where(q => q.QuizId == quizId);
            if(questions.Any())
            {
                return questions;
            }
            else
            {
                return Enumerable.Empty<models.Question>(); ;
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]models.Question question)
        {
            var quiz = context.Quiz.SingleOrDefault(q => q.ID== question.QuizId);

            if ( quiz ==null) { return NotFound(); }

            this.context.Questions.Add(question);
            await this.context.SaveChangesAsync();
            return Ok(question);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Post(int id, [FromBody] models.Question question)
        {
            this.context.Questions.Add(question);
            await this.context.SaveChangesAsync();
            //return Ok(question);
            return CreatedAtAction("GetQuestion", new { id = question.ID }, question);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] models.Question question)
        {
            if(id != question.ID)
            {
                return BadRequest();
            }

            context.Entry(question).State = EntityState.Modified;
            try
            {
                await this.context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException) 
            {
                if(!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return context.Questions.Any(e => e.ID == id);
        }
    }
}  
