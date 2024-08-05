using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using Presentation.Helpers;
using Presentation.Services.Interfaces;

namespace Presentation.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryService(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
                );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<ImageUploadResult> UploadAsync(IFormFile file)
        {
            var result = await _cloudinary.UploadAsync(
                new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    DisplayName = file.FileName,
                    Folder = "asp-net7"
                }
                );
            if (result != null && result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return result;
            }
            return null;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}
