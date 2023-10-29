using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;

namespace Makassed.Api.Services.MonitoringTools.Fields;

public class FieldService : IFieldService
{
    private readonly IFieldRepository _fieldRepository;

    public FieldService(IFieldRepository fieldRepository)
    {
        _fieldRepository = fieldRepository;
    }

    public async Task<List<Field>> GetFieldsAsync()
    {
        return await _fieldRepository.GetFieldsAsync();
    }

    public async Task<ErrorOr<Field>> GetFieldAsync(Guid id)
    {
        var field = await _fieldRepository.GetFieldAsync(id);

        if (field == null)
            return Errors.MonitoringTool.Field.NotFound;

        return field;
    }

    public async Task<ErrorOr<Field>> CreateFieldAsync(Field field)
    {
        var updatedField = await _fieldRepository.CreateFieldAsync(field);
        return field;
    }

    public async Task<ErrorOr<Field>> UpdateFieldAsync(Guid id, Field field)
    {
        var updatedField = await _fieldRepository.UpdateFieldAsync(id, field);
        return field;
    }

    public async Task<ErrorOr<Field>> DeleteFieldAsync(Guid id)
    {
        var field = await _fieldRepository.DeleteFieldAsync(id);
        return field;
    }
}