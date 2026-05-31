namespace WMS.Domain.Entities;

public class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public int? EmployeeId { get; set; }

    public Employee? Employee { get; set; }
}