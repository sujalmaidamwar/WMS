namespace WMS.Application.DTOs.Client
{
    public class ClientDto
    {
        public int ClientId { get; set;}

        public string ClientName { get; set;}

        public string Email {  get;  set; }

        public string  PhoneNumber { get; set; }

        public string  CompanyName { get; set;}

        public string  Address { get; set; }

        public bool  IsActive { get; set;  }
    }
}