using DataTransferObject;
using Newtonsoft.Json;

namespace Presentation.Helpers
{
    public class CustomAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        public CustomAuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            await _next(context);

            if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
            {
                // Customize the response for forbidden access
                context.Response.ContentType = "application/json";
                var response = new ApiResponse { Success = false, Message = "You do not have permission to perform this action." };
                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            }
        }
    }
}
