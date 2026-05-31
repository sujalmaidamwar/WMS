namespace WMS.Domain.Entities
{
    public class AuditLog
    {
        public int  AuditLogId { get; set; }

        public string  Action {  get;  set; }

        public string  EntityName { get; set; }

        public string Description { get; set; }

        public string PerformedBy {  get;  set;}

        public DateTime PerformedOn {  get;  set; }  = DateTime.Now;
    }
}