namespace BeatsWave.Web.Controllers
{
    using System;
    using System.IO;
    using System.Text.RegularExpressions;
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
    using SixLabors.ImageSharp;
    using SixLabors.ImageSharp.Formats;
    using SixLabors.ImageSharp.Formats.Gif;
    using SixLabors.ImageSharp.Formats.Jpeg;
    using SixLabors.ImageSharp.Formats.Png;
    using SixLabors.ImageSharp.Processing;

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
            var blockBlob = await this.UploadImageToStorage(file, GlobalConstants.BlobImageContainer);

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
            var blockBlob = await this.UploadImageToStorage(file, GlobalConstants.BlobImageContainer);

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
            var blockBlob = await this.UploadBeatToStorage(file, GlobalConstants.BlobBeatContainer);

            return this.Ok(new
            {
                name = blockBlob.Name,
                uri = blockBlob.Uri,
                size = blockBlob.Properties.Length,
            });
        }

        private static IImageEncoder GetEncoder(string extension)
        {
            IImageEncoder encoder = null;

            extension = extension.Replace(".", "");

            var isSupported = Regex.IsMatch(extension, "gif|png|jpe?g", RegexOptions.IgnoreCase);

            if (isSupported)
            {
                switch (extension.ToLower())
                {
                    case "png":
                        encoder = new PngEncoder();
                        break;
                    case "jpg":
                        encoder = new JpegEncoder();
                        break;
                    case "jpeg":
                        encoder = new JpegEncoder();
                        break;
                    case "gif":
                        encoder = new GifEncoder();
                        break;
                    default:
                        break;
                }
            }

            return encoder;
        }

        private async Task<CloudBlockBlob> UploadBeatToStorage(IFormFile file, string storage)
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

        private async Task<CloudBlockBlob> UploadImageToStorage(IFormFile file, string storage)
        {
            var storageAccount = CloudStorageAccount.Parse(this.appSettings.AccessKey);

            var blobClient = storageAccount.CreateCloudBlobClient();

            var container = blobClient.GetContainerReference($"{storage}");

            var thumbnailWidth = 320;
            var extension = Path.GetExtension(file.FileName);
            var encoder = GetEncoder(extension);

            var blockBlob = container.GetBlockBlobReference(file.FileName);
            blockBlob.Properties.ContentType = file.ContentType;

            using (var fileStream = file.OpenReadStream())
            {
                using (var output = new MemoryStream())
                using (Image image = Image.Load(fileStream))
                {
                    var divisor = image.Width / thumbnailWidth;
                    var height = Convert.ToInt32(Math.Round((decimal)(image.Height / divisor)));

                    image.Mutate(x => x.Resize(thumbnailWidth, height));
                    image.Save(output, encoder);
                    output.Position = 0;
                    await blockBlob.UploadFromStreamAsync(output);
                }
            }

            return blockBlob;
        }
    }
}
