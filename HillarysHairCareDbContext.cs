using HillarysHairCare.Models;
using Microsoft.EntityFrameworkCore;

public class HillarysHairCareDbContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    public HillarysHairCareDbContext(DbContextOptions<HillarysHairCareDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Seed data for Customers
        modelBuilder
            .Entity<Customer>()
            .HasData(
                new Customer[]
                {
                    new Customer
                    {
                        Id = 1,
                        FirstName = "Jane",
                        LastName = "Doe",
                        PhoneNumber = "555-1234",
                        Email = "jane.doe@example.com",
                    },
                    new Customer
                    {
                        Id = 2,
                        FirstName = "John",
                        LastName = "Smith",
                        PhoneNumber = "555-5678",
                        Email = "john.smith@example.com",
                    },
                    new Customer
                    {
                        Id = 3,
                        FirstName = "Alice",
                        LastName = "Johnson",
                        PhoneNumber = "555-3456",
                        Email = "alice.johnson@example.com",
                    },
                    new Customer
                    {
                        Id = 4,
                        FirstName = "Bob",
                        LastName = "Williams",
                        PhoneNumber = "555-7890",
                        Email = "bob.williams@example.com",
                    },
                }
            );

        // Seed data for Stylists
        modelBuilder
            .Entity<Stylist>()
            .HasData(
                new Stylist[]
                {
                    new Stylist
                    {
                        Id = 1,
                        FirstName = "Emily",
                        LastName = "Stone",
                        PhoneNumber = "555-8765",
                        Email = "emily.stone@example.com",
                        IsActive = true,
                    },
                    new Stylist
                    {
                        Id = 2,
                        FirstName = "James",
                        LastName = "Bond",
                        PhoneNumber = "555-4321",
                        Email = "james.bond@example.com",
                        IsActive = true,
                    },
                    new Stylist
                    {
                        Id = 3,
                        FirstName = "Sarah",
                        LastName = "Connor",
                        PhoneNumber = "555-6543",
                        Email = "sarah.connor@example.com",
                        IsActive = true,
                    },
                }
            );

        // Seed data for Services
        modelBuilder
            .Entity<Service>()
            .HasData(
                new Service[]
                {
                    new Service
                    {
                        Id = 1,
                        Name = "Haircut",
                        Price = 50.00M,
                    },
                    new Service
                    {
                        Id = 2,
                        Name = "Shampoo",
                        Price = 15.00M,
                    },
                    new Service
                    {
                        Id = 3,
                        Name = "Coloring",
                        Price = 75.00M,
                    },
                    new Service
                    {
                        Id = 4,
                        Name = "Blow Dry",
                        Price = 30.00M,
                    },
                }
            );

        // Seed data for Appointments
        modelBuilder
            .Entity<Appointment>()
            .HasData(
                new Appointment[]
                {
                    new Appointment
                    {
                        Id = 1,
                        Title = "Jane Doe--Emily Stone",
                        Start = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 15, 10, 0, 0),
                            DateTimeKind.Utc
                        ),
                        End = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 15, 11, 0, 0),
                            DateTimeKind.Utc
                        ),
                        AllDay = false,
                        CustomerId = 1,
                        StylistId = 1,
                    },
                    new Appointment
                    {
                        Id = 2,
                        Title = "John Smith--James Bond",
                        Start = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 15, 11, 0, 0),
                            DateTimeKind.Utc
                        ),
                        End = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 15, 12, 0, 0),
                            DateTimeKind.Utc
                        ),
                        AllDay = false,
                        CustomerId = 2,
                        StylistId = 2,
                    },
                    new Appointment
                    {
                        Id = 3,
                        Title = "Alice Johnson--Sarah Connor",
                        Start = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 15, 12, 0, 0),
                            DateTimeKind.Utc
                        ),
                        End = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 15, 13, 0, 0),
                            DateTimeKind.Utc
                        ),
                        AllDay = false,
                        CustomerId = 3,
                        StylistId = 3,
                    },
                    new Appointment
                    {
                        Id = 4,
                        Title = "Bob Williams--Emily Stone",
                        Start = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 16, 9, 0, 0),
                            DateTimeKind.Utc
                        ),
                        End = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 16, 10, 0, 0),
                            DateTimeKind.Utc
                        ),
                        AllDay = false,
                        CustomerId = 4,
                        StylistId = 1,
                    },
                    new Appointment
                    {
                        Id = 5,
                        Title = "Alice Johnson--James Bond",
                        Start = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 16, 10, 0, 0),
                            DateTimeKind.Utc
                        ),
                        End = DateTime.SpecifyKind(
                            new DateTime(2025, 1, 16, 11, 0, 0),
                            DateTimeKind.Utc
                        ),
                        AllDay = false,
                        CustomerId = 3,
                        StylistId = 2,
                    },
                }
            );

        // Seed data for AppointmentServices (Join Table)
        modelBuilder
            .Entity<AppointmentService>()
            .HasData(
                new AppointmentService[]
                {
                    new AppointmentService
                    {
                        Id = 1,
                        AppointmentId = 1,
                        ServiceId = 1,
                    },
                    new AppointmentService
                    {
                        Id = 2,
                        AppointmentId = 2,
                        ServiceId = 2,
                    },
                    new AppointmentService
                    {
                        Id = 3,
                        AppointmentId = 3,
                        ServiceId = 3,
                    },
                    new AppointmentService
                    {
                        Id = 4,
                        AppointmentId = 4,
                        ServiceId = 1,
                    },
                    new AppointmentService
                    {
                        Id = 5,
                        AppointmentId = 5,
                        ServiceId = 4,
                    },
                }
            );
    }
}
