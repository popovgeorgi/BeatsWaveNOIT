namespace BeatsWave.Web.Controllers
{
    using System.Threading.Tasks;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure;
    using BeatsWave.Web.Infrastructure.Services;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.WindowsAzure.Storage;

    public class FileUploadController : ApiController
    {
        private readonly AppSettings appSettings;
        private readonly IPictureService pictureService;
        private readonly ICurrentUserService currentUser;

        public FileUploadController(
            IOptions<AppSettings> appSettings,
            IPictureService pictureService,
            ICurrentUserService currentUser)
        {
            this.appSettings = appSettings.Value;
            this.pictureService = pictureService;
            this.currentUser = currentUser;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> SaveFile(IFormFile file)
        {
            var storageAccount = CloudStorageAccount.Parse(this.appSettings.AccessKey);

            var blobClient = storageAccount.CreateCloudBlobClient();

            var container = blobClient.GetContainerReference("photos");

            var blockBlob = container.GetBlockBlobReference(file.FileName);
            blockBlob.Properties.ContentType = file.ContentType;

            using (var fileStream = file.OpenReadStream())
            {
                await blockBlob.UploadFromStreamAsync(fileStream);
            }

            await this.pictureService.SetMainPhotoToUser(this.currentUser.GetId(), blockBlob.Uri.ToString());

            return this.Ok(new
            {
                name = blockBlob.Name,
                uri = blockBlob.Uri,
                size = blockBlob.Properties.Length,
            });
        }
    }
}
