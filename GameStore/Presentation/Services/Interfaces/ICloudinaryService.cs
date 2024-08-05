using CloudinaryDotNet.Actions;

namespace Presentation.Services.Interfaces
{
    public interface ICloudinaryService
    {
        Task<DeletionResult> DeletePhotoAsync(string publicId);
        Task<ImageUploadResult> UploadAsync(ImageUploadParams uploadParams);
    }
}