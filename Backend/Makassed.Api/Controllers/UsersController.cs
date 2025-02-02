﻿using Makassed.Api.Services.Users;
using Makassed.Contracts.General;
using Makassed.Contracts.User;
using Makassed.Contracts.User.Roles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

public class UsersController : ApiController
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("upload-avatar")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UploadUserAvatarResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadUserAvatarRequest request)
    {
        var userAvatarUrl = await _userService.UploadUserAvatarAsync(request.Image);

        return userAvatarUrl.Match(
            avatarUrl => Ok(new UploadUserAvatarResponse(avatarUrl)),
            Problem
        );
    }

    // get all users
    [HttpGet]
    [ProducesResponseType(typeof(List<GetUserResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        var usersResult = await _userService.GetAllUsersAsync();

        return Ok(usersResult);
    }

    // get user by id
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> GetUser(string id)
    {
        var userResult = await _userService.GetUserByIdAsync(id);

        return userResult.Match(
            Ok,
            Problem
        );
    }

    // partial update user's info
    [HttpPatch]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> UpdateUserPassword(JsonPatchDocument<UpdateUserRequest> patchDocument)
    {
        var userResult = await _userService.ApplyPatchAsync(patchDocument);

        return userResult.Match(
            Ok,
            Problem
        );
    }

    // update user's department
    [HttpPut("{id}/update-user-department")]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateUserDepartment(string id, UpdateUserDepartmentRequest request)
    {
        var userResult = await _userService.UpdateUserDepartmentAsync(id, request.DepartmentId);

        return userResult.Match(
            Ok,
            Problem
        );
    }

    // update user's roles
    [HttpPut("{id}/update-user-roles")]
    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin")]
    public async Task<IActionResult> UpdateUserRoles(string id, UpdateUserRolesRequest request)
    {
        var updateUserRolesResult = await _userService.UpdateUserRolesAsync(id, request);

        return updateUserRolesResult.Match(
            Ok,
            Problem
        );
    }

    // delete a user
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var deleteResult = await _userService.DeleteUserAsync(id);

        return deleteResult.Match(
            Ok,
            Problem
        );
    }

    [HttpGet("example")]
    public IActionResult Example()
    {
        return Ok("Hello from Users Controller - Staging 🫡");
    }
}
