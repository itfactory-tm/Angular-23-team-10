using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using TripPlannerAPI.Dto.Email;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;

namespace TripPlanner.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ILogger<EmailController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public EmailController(ILogger<EmailController> logger, IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;

        }

        [HttpPost]
        public IActionResult SendEmail([FromBody] EmailRequest emailRequest)
        {
            try
            {
                string emailAddress = emailRequest.Email;
                string userId = emailRequest.UserId;
                int tripId = emailRequest.TripId;

                var baseUrl = _hostingEnvironment.IsProduction() ?
                _configuration.GetConnectionString("BaseUrlProduction") :
                _configuration.GetConnectionString("BaseUrlLocal");

                Debug.WriteLine(baseUrl);

                // Create and configure the SMTP client
                using (var smtpClient = new SmtpClient("smtp-auth.mailprotect.be"))
                {
                    smtpClient.Port = 587;
                    smtpClient.Credentials = new NetworkCredential("tripplanner@kmaa.be", "admin1234!");
                    smtpClient.EnableSsl = true;
                    smtpClient.UseDefaultCredentials = false;

                    // Create the email message
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("tripplanner@kmaa.be"),
                        Subject = "Invite Trip Planner",
                        Body = $@"<html>
                        <body>
                            <p>Hey,</p>
                            <p>You have been invited to contribute to a trip.</p>
                            <p>Click the button below to start contributing:</p>
                            <form action=""{baseUrl}/{userId}/{tripId}"" method=""post"">
                               
                               <button type=""submit"" style=""cursor:pointer; display:inline-block; padding:10px 20px; background-color:#007BFF; color:#fff; text-decoration:none; border-radius:5px; border: none;"">Contribute to Trip</button>
                            </form>
                            <p>If you have any questions or need more details about the trip, feel free to contact the trip organizer at <a href=""mailto:organizer@tripplanner.com"" style=""color:#007BFF; text-decoration:none;"">organizer@tripplanner.com</a></p>
                            <p>Best Regards,<br/>Trip Planner Team</p>
                        </body>
                        </html>",
                        IsBodyHtml = true,
                    };

                    mailMessage.To.Add(emailAddress);

                    // Send the email
                    smtpClient.Send(mailMessage);

                    _logger.LogInformation("Email sent successfully");
                    return Ok(new { Message = "Email sent successfully" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending email: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = $"Error sending email: {ex.Message}" });
            }
        }

        [HttpPost]
        [Route("contact-email")]
        public IActionResult SendContactEmail([FromBody] EmailRequest emailRequest)
        {
            try
            {
                string emailAddress = emailRequest.Email;
                string contactMessage = emailRequest.Message;

                var baseUrl = _hostingEnvironment.IsProduction() ?
                _configuration.GetConnectionString("BaseUrlProduction") :
                _configuration.GetConnectionString("BaseUrlLocal");

                Debug.WriteLine(baseUrl);

                // Create and configure the SMTP client
                using (var smtpClient = new SmtpClient("smtp-auth.mailprotect.be"))
                {
                    smtpClient.Port = 587;
                    smtpClient.Credentials = new NetworkCredential("tripplanner@kmaa.be", "admin1234!");
                    smtpClient.EnableSsl = true;
                    smtpClient.UseDefaultCredentials = false;

                    // Create the email message
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("tripplanner@kmaa.be"),
                        Subject = "Invite Trip Planner",
                        Body = $@"<html>
                        <body>
                            <p>Message from {emailAddress}:</p>
                            <p>{contactMessage}</>
                        </body>
                        </html>",
                        IsBodyHtml = true,
                    };

                    mailMessage.To.Add("JonasBaelusBeerse@gmail.com");

                    // Send the email
                    smtpClient.Send(mailMessage);

                    _logger.LogInformation("Email sent successfully");
                    return Ok(new { Message = "Email sent successfully" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending email: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { Error = $"Error sending email: {ex.Message}" });
            }
        }
    }
}
