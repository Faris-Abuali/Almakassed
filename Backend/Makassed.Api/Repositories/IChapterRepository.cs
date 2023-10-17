﻿using Makassed.Api.Models;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories
{
    public interface IChapterRepository
    {
        Task<Chapter?> GetChapterByNameAsync(string name);
        Task<List<Chapter>> GetChaptersAsync();
        Task<Chapter?> GetChapterByIdAsync(Guid id);
        Task CreateChapterAsync(Chapter chapter);
        Task<Chapter?> DeleteChapterAsync(Guid id);
        Task<Chapter?> UpdateChapterAsync(Guid id, Chapter chapter);
    }
}
