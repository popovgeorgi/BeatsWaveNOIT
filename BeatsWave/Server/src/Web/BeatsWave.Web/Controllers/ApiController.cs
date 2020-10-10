namespace BeatsWave.Web.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public abstract class ApiController : ControllerBase
    {
    }
}
