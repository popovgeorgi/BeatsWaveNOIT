namespace BeatsWave.Web.Models.Emails
{
    using System.ComponentModel.DataAnnotations;

    public class SendEmailRequestModel
    {
        [Required]
        public string To { get; set; }

        [Required]
        public string HtmlContent { get; set; }
    }
}
