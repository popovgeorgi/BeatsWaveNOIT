namespace BeatsWave.Web.Controllers
{
    using System.IO;
    using System.Threading.Tasks;
    using BeatsWave.Common;
    using BeatsWave.Services.Data;
    using BeatsWave.Web.Infrastructure;
    using BeatsWave.Web.Infrastructure.Services;

    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Blob;

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
        public async Task<ActionResult> SaveProfilePhoto(IFormFile file)
        {
            var blockBlob = await this.UploadFileToStorage(file, GlobalConstants.BlobImageContainer);

            await this.pictureService.SetMainPhotoToUser(this.currentUser.GetId(), blockBlob.Uri.ToString());

            return this.Ok(new
            {
                name = blockBlob.Name,
                uri = blockBlob.Uri,
                size = blockBlob.Properties.Length,
            });
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> SavePhoto(IFormFile file)
        {
            var blockBlob = await this.UploadFileToStorage(file, GlobalConstants.BlobImageContainer);

            return this.Ok(new
            {
                name = blockBlob.Name,
                uri = blockBlob.Uri,
                size = blockBlob.Properties.Length,
            });
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> SaveBeat(IFormFile file)
        {
            var blockBlob = await this.UploadFileToStorage(file, GlobalConstants.BlobBeatContainer);

            return this.Ok(new
            {
                name = blockBlob.Name,
                uri = blockBlob.Uri,
                size = blockBlob.Properties.Length,
            });
        }

        private async Task<CloudBlockBlob> UploadFileToStorage(IFormFile file, string storage)
        {
            var storageAccount = CloudStorageAccount.Parse(this.appSettings.AccessKey);

            var blobClient = storageAccount.CreateCloudBlobClient();

            var container = blobClient.GetContainerReference($"{storage}");

            var blockBlob = container.GetBlockBlobReference(file.FileName);
            blockBlob.Properties.ContentType = file.ContentType;

            using (var fileStream = file.OpenReadStream())
            {
                await blockBlob.UploadFromStreamAsync(fileStream);
            }

            return blockBlob;
        }
    }
}
