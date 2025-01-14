using HillarysHairCare.Models;

namespace HillarysHairCare.DTOs
{
    public class AppointmentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool AllDay { get; set; }

        public ExtendedPropsDTO ExtendedProps { get; set; } = new ExtendedPropsDTO();

        public class ExtendedPropsDTO
        {
            public int CustomerId { get; set; }
            public CustomerDTO Customer { get; set; }
            public int StylistId { get; set; }
            public StylistDTO Stylist { get; set; }
            public List<ServiceDTO> Services { get; set; } = new List<ServiceDTO>();
            public decimal TotalPrice => Services.Sum(service => service.Price);
        }
    }
}
