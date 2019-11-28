using Deposit_2.Services;
using Deposit_2.Utils;
using Deposit_2.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Deposit_2.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ApplicationConfiguration _configuration;

        public UserController(
            IUserService userService,
            ApplicationConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost(Name = nameof(SignIn))]
        public IActionResult SignIn([FromBody] UserViewModel signInVw) 
            => Ok(_userService.SignIn(signInVw.Email, signInVw.Password));

        [HttpPost(Name = nameof(SignUp))]
        public IActionResult SignUp([FromBody] UserViewModel signUpVm)
            => Ok(_userService.SignUp(signUpVm));

        // PUT: api/User/5
        [HttpPut("{id}", Name = nameof(EditPassword))]
        public IActionResult EditPassword(int id, [FromBody] string password, [FromBody] string newPassword)
            => Ok(_userService.EditPassword(id, password, newPassword));

        [HttpPut("{id}", Name = nameof(EditFilterConfig))]
        public IActionResult EditFilterConfig(int id, [FromBody] string filterConfig)
            => Ok(_userService.EditFiltersConfig(id, filterConfig));

        [HttpPut("{id}", Name = nameof(EditProfileConfig))]
        public IActionResult EditProfileConfig(int id, string password, [FromBody] string profileConfig)
            => Ok(_userService.EditProfileConfig(id, password, profileConfig));

        [HttpPut("{id}", Name = nameof(EditEmail))]
        public IActionResult EditEmail(int id, string password, [FromBody] string email)
            => Ok(_userService.EditEmail(id, password, email));

        public IActionResult ConfirmEmail([FromQuery] string confirmationCode)
        {
            var result = _userService.ConfirmEmail(confirmationCode);
            return result.IsSuccess // Change urls
                ? result.Data
                    ? Redirect("") // success
                    : Redirect("") // expired
                : Redirect(""); // invalid code url page
        }
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
