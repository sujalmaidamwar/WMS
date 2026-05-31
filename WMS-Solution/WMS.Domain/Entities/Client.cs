namespace WMS.Domain.Entities
{
    public class Client
    {
        public int  ClientId { get; set;}

        public string  ClientName {  get;  set;}

        public string  Email { get;  set; }

        public string PhoneNumber { get; set;}

        public string  CompanyName { get;  set;}

        public string Address  { get; set;}

        public bool IsActive { get; set; } = true;

        public ICollection<Project> Projects {  get;  set; } = new List<Project>();
    }
}