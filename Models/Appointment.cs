namespace HillarysHairCare.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool AllDay { get; set; } = false;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int StylistId { get; set; }
        public Stylist Stylist { get; set; }
        public List<AppointmentService> AppointmentServices { get; set; } =
            new List<AppointmentService>();
    }
}
