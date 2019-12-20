using System.Threading.Tasks;
using Deposit_2.Services;
using Deposit_2.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Deposit_2.Controllers
{
    [Route("api/[controller]/[action]/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult SignIn([FromForm] UserViewModel signInVw) 
            => Ok(_userService.SignIn(signInVw.Login, signInVw.Password));

        [HttpPost]
        public async Task<IActionResult> SignUp([FromForm] UserViewModel signUpVm)
            => Ok(await _userService.SignUp(signUpVm));

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult EditPassword(int id, EditUserViewModel editUserVm)
            => Ok(_userService.EditPassword(id, editUserVm.Password, editUserVm.NewPassword));

        [HttpPut("{id}")]
        public IActionResult EditFilterConfig(int id, [FromBody]EditUserViewModel editUserVm)
            => Ok(_userService.EditFiltersConfig(id, editUserVm.FiltersConfig));

        [HttpPut("{id}")]
        public IActionResult EditProfileConfig(int id, EditUserViewModel editUserVm)
            => Ok(_userService.EditProfileConfig(id, editUserVm.Password, editUserVm.ProfileConfig));

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmail(int id, EditUserViewModel editUserVm)
            => Ok(await _userService.EditEmail(id, editUserVm.Password, editUserVm.Email));

        [HttpPut]
        public async Task<IActionResult> RestorePassword(RestorePasswordVm restorePasswordVm) => 
            Ok(await _userService.RestorePassword(restorePasswordVm.Email));

        [HttpPost]
        public IActionResult ConfirmEmail([FromQuery] string confirmationCode)
        {
            var result = _userService.ConfirmEmail(confirmationCode);
            return result.IsSuccess // Change urls
                ? result.Data
                    ? Redirect("") // success
                    : Redirect("") // expired
                : Redirect(""); // invalid code url page
        }

    }
}
