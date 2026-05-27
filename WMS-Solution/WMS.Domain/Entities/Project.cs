namespace WMS.Domain.Entities;

public class Project
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

    public int?
    ClientId
    {
        get;
        set;
    }

    public Client?
        Client
    {
        get;
        set;
    }

    public ICollection<Employee>
        Employees
    { get; set; }
        = new List<Employee>();
}