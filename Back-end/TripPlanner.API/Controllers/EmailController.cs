using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using TripPlannerAPI.Dto.Email;
using TripPlannerAPI.Dto.Trip;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> SendEmail(EmailReponse email)
    {
        try
        {
            string emailAddress = email.EmailAddress;

            // Create and configure the SMTP client
            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential("tripplanner90@gmail.com", "TestTest!");
                smtpClient.EnableSsl = true;

                // Create the email message
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("tripplanner90@gmail.com"),
                    Subject = "Invite Trip Planner",
                    Body = "Dit is een test",
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(emailAddress);

                // Send the email
                await smtpClient.SendMailAsync(mailMessage);

                return Ok("Email sent successfully");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error sending email: {ex.Message}");
        }
    }
}
