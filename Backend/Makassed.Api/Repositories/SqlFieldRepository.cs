using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories;

public class SqlFieldRepository : IFieldRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlFieldRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<List<Field>> GetFieldsAsync()
    {
        return await _dbContext.Fields.ToListAsync();
    }

    public async Task<Field?> GetFieldAsync(Guid id)
    {
        return await _dbContext.Fields.FirstOrDefaultAsync(f => f.Id == id);
    }

    public Task<Field> CreateFieldAsync(Field field)
    {
        throw new NotImplementedException();
    }

    public Task<Field> UpdateFieldAsync(Guid id, Field field)
    {
        throw new NotImplementedException();
    }

    public Task<Field> DeleteFieldAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}