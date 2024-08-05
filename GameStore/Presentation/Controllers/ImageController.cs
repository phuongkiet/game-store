using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presentation.Services.Interfaces;
using System.Net;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ICloudinaryService _cloudinaryService;
        public ImageController(ICloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }
        [HttpPost]
        public async Task<IActionResult> UploadAsync(IFormFile file)
        {
            var result = await _cloudinaryService.UploadAsync(file);
            if (result == null)
            {
                ModelState.AddModelError("Upload image", " Something went wrong");
                return Problem("Something went wrong", null, (int)HttpStatusCode.InternalServerError);
            }
            return Ok(new { link = result.SecureUri.AbsoluteUri, publicId = result.PublicId });

        }
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(string publicId)
        {
            var result = await _cloudinaryService.DeletePhotoAsync(publicId);
            if (result == null)
            {
                ModelState.AddModelError("Delete image", "Something went wrong during deleting the image");
                return Problem("Something went wrong", null, (int)HttpStatusCode.InternalServerError);
            }
            return Ok(new { message = "Image successfully deleted.", deletedPublicId = publicId });
        }
    }
}
