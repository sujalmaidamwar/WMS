namespace WMS.Application.DTOs.Project;

public class ProjectDto
{
    public int ProjectId
    { get; set; }

    public string ProjectName
    { get; set; }
        = string.Empty;

    public string? Description
    { get; set; }

    public DateTime StartDate
    { get; set; }

    public DateTime EndDate
    { get; set; }

    public List<int>
        EmployeeIds
    { get; set; }
        = new();

    public List<string>
    EmployeeNames
    { get; set; }
    = new();

    public int?
    ClientId
    {
        get;
        set;
    }

    public string?
        ClientName
    {
        get;
        set;
    }
}