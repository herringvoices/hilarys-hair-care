namespace HillarysHairCare.DTOs
{
    public class StylistDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public List<AppointmentDTO> Appointments { get; set; } = new();
    }
}
