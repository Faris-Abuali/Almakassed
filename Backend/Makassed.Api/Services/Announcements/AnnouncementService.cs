﻿using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Users;
using Makassed.Contracts.Announcement;
using Sieve.Models;

namespace Makassed.Api.Services.Announcements;

public class AnnouncementService : IAnnouncementService
{
    private readonly IAnnouncementRepository _repository;
    private readonly IUserService _userService;

    public AnnouncementService(IAnnouncementRepository repository, IUserService userService)
    {
        _repository = repository;
        _userService = userService;
    }

    public GetAnnouncementResponse MapToResponse(Announcement announcement)
    {
        var response = new GetAnnouncementResponse
        {
            Id = announcement.Id,
            CreatorId = announcement.CreatorId,
            CreatorName = announcement.Creator.UserName!,
            CreatorFullName = announcement.Creator.FullName,
            CreatorAvatarUrl = announcement.Creator.AvatarUrl,
            Body = announcement.Body,
            CreatedAt = announcement.CreatedAt,
            IsPinned = announcement.IsPinned
        };

        return response;
    }

    public async Task<ErrorOr<GetAnnouncementResponse>> GetAnnouncementByIdAsync(Guid id)
    {
        var announcement = await _repository.GetAnnouncementByIdAsync(id);

        if (announcement is null)
            return Errors.Announcement.NotFound;

        return MapToResponse(announcement);
    }

    public async Task<ErrorOr<GetAnnouncementResponse>> CreateAnnouncementAsync(Announcement request)
    {
        var userId = _userService.GetUserId();

        if (userId == null)
            return Errors.User.Unauthorized;

        request.Body = request.Body;
        request.CreatorId = userId;
        request.CreatedAt = DateTime.UtcNow;

        var announcement = await _repository.CreateAnnouncementAsync(request);

        return MapToResponse(announcement);
    }

    public async Task<List<GetAnnouncementResponse>> GetAnnouncementsAsync(SieveModel sieveModel)
    {
        var announcements = await _repository.GetAnnouncementsAsync(sieveModel);

        return announcements.Select(MapToResponse).ToList();
    }
}
