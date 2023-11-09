﻿using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.MonitoringTools;

public interface IMonitoringToolService
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync();
    
    Task<ErrorOr<List<MonitoringTool>>> GetFocalPointMonitoringToolsAsync(string focalPointId);
    
    Task<ErrorOr<MonitoringTool>> GetFocalPointByIdAsync(Guid id);
    
    Task<ErrorOr<MonitoringTool>> CreateMonitoringToolAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes, List<Guid> fieldsIdes);
}