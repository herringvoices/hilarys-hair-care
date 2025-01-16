using System.Text.Json;
using System.Text.Json.Serialization;
using HillarysHairCare.DTOs;
using HillarysHairCare.Models;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHairCareDbContext>(
    builder.Configuration["HillarysHairCareDbConnectionString"]
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Appointments Endpoints

// GET all appointments, optionally filtered by stylistId
app.MapGet(
    "/api/appointments",
    async (HillarysHairCareDbContext db, int? stylistId) =>
    {
        // Query appointments, optionally filtering by stylistId
        var query = db
            .Appointments.Include(a => a.Customer)
            .Include(a => a.Stylist)
            .Include(a => a.AppointmentServices)
            .ThenInclude(aps => aps.Service)
            .AsQueryable();

        if (stylistId.HasValue)
        {
            query = query.Where(a => a.StylistId == stylistId.Value);
        }

        var appointments = await query
            .Select(a => new AppointmentDTO
            {
                Id = a.Id,
                Title = a.Title,
                Start = a.Start,
                End = a.End,
                AllDay = a.AllDay,
                ExtendedProps = new AppointmentDTO.ExtendedPropsDTO
                {
                    CustomerId = a.CustomerId,
                    Customer = new CustomerDTO
                    {
                        Id = a.Customer.Id,
                        FirstName = a.Customer.FirstName,
                        LastName = a.Customer.LastName,
                        PhoneNumber = a.Customer.PhoneNumber,
                        Email = a.Customer.Email,
                    },
                    StylistId = a.StylistId,
                    Stylist = new StylistDTO
                    {
                        Id = a.Stylist.Id,
                        FirstName = a.Stylist.FirstName,
                        LastName = a.Stylist.LastName,
                        Email = a.Stylist.Email,
                        PhoneNumber = a.Stylist.PhoneNumber,
                        IsActive = a.Stylist.IsActive,
                    },
                    Services = a
                        .AppointmentServices.Select(aps => new ServiceDTO
                        {
                            Id = aps.Service.Id,
                            Name = aps.Service.Name,
                            Price = aps.Service.Price,
                        })
                        .ToList(),
                },
            })
            .ToListAsync();

        return Results.Ok(appointments);
    }
);

//POST new appointment
app.MapPost(
    "/api/appointments",
    async (HillarysHairCareDbContext db, Appointment appointment) =>
    {
        try
        {
            db.Appointments.Add(appointment);
            await db.SaveChangesAsync();

            // Return the appointment with the generated Id
            return Results.Created($"/api/appointments/{appointment.Id}", appointment);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return Results.Problem("An error occurred while saving the appointment.");
        }
    }
);



//DELETE Appointment
app.MapDelete(
    "api/appointments/{id}",
    async (HillarysHairCareDbContext db, int id) =>
    {
        var appointment = db.Appointments.Find(id);
        if (appointment == null)
        {
            return Results.NotFound();
        }

        db.Appointments.Remove(appointment);
        await db.SaveChangesAsync();

        return Results.NoContent();
    }
);

//AppointmentService endpoints

//POST new appointment service
app.MapPost(
    "/api/appointment-services",
    async (HillarysHairCareDbContext db, AppointmentService appointmentService) =>
    {
        db.AppointmentServices.Add(appointmentService);
        await db.SaveChangesAsync();

        return Results.Created(
            $"/api/appointment-services/{appointmentService.Id}",
            appointmentService
        );
    }
);
app.MapPost(
    "/api/appointment-services/batch",
    async (HillarysHairCareDbContext db, List<AppointmentService> appointmentServices) =>
    {
        if (appointmentServices == null || !appointmentServices.Any())
        {
            return Results.BadRequest("The appointment services list is empty.");
        }

        var appointmentId = appointmentServices.First().AppointmentId;

        // Delete existing appointment services with the same AppointmentId
        var existingServices = db.AppointmentServices.Where(aps =>
            aps.AppointmentId == appointmentId
        );
        db.AppointmentServices.RemoveRange(existingServices);

        // Add new appointment services
        db.AppointmentServices.AddRange(appointmentServices);
        await db.SaveChangesAsync();

        return Results.Created($"/api/appointment-services/batch", appointmentServices);
    }
);

//Stylist Endpoints
//GET all Stylists
app.MapGet(
    "/api/stylists",
    async (HillarysHairCareDbContext db) =>
    {
        var stylists = await db
            .Stylists.Include(s => s.Appointments)
            .ThenInclude(a => a.Customer)
            .Include(s => s.Appointments)
            .ThenInclude(a => a.AppointmentServices)
            .ThenInclude(aps => aps.Service)
            .Select(s => new StylistDTO
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                PhoneNumber = s.PhoneNumber,
                Email = s.Email,
                IsActive = s.IsActive,
                Appointments = s
                    .Appointments.Select(a => new AppointmentDTO
                    {
                        Id = a.Id,
                        Title = a.Title,
                        Start = a.Start,
                        End = a.End,
                        AllDay = a.AllDay,
                        ExtendedProps = new AppointmentDTO.ExtendedPropsDTO
                        {
                            CustomerId = a.CustomerId,
                            Customer = new CustomerDTO
                            {
                                Id = a.Customer.Id,
                                FirstName = a.Customer.FirstName,
                                LastName = a.Customer.LastName,
                                PhoneNumber = a.Customer.PhoneNumber,
                                Email = a.Customer.Email,
                            },
                            StylistId = a.StylistId,
                            Stylist = new StylistDTO
                            {
                                Id = a.Stylist.Id,
                                FirstName = a.Stylist.FirstName,
                                LastName = a.Stylist.LastName,
                                Email = a.Stylist.Email,
                                PhoneNumber = a.Stylist.PhoneNumber,
                                IsActive = a.Stylist.IsActive,
                            },
                            Services = a
                                .AppointmentServices.Select(aps => new ServiceDTO
                                {
                                    Id = aps.Service.Id,
                                    Name = aps.Service.Name,
                                    Price = aps.Service.Price,
                                })
                                .ToList(),
                        },
                    })
                    .ToList(),
            })
            .ToListAsync();

        return Results.Ok(stylists);
    }
);

//Endpoints for Customers
//GET all Customers
app.MapGet(
    "/api/customers",
    async (HillarysHairCareDbContext db) =>
    {
        var customers = await db
            .Customers.Include(c => c.Appointments)
            .ThenInclude(a => a.Stylist)
            .Include(c => c.Appointments)
            .ThenInclude(a => a.AppointmentServices)
            .ThenInclude(aps => aps.Service)
            .Select(c => new CustomerDTO
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                PhoneNumber = c.PhoneNumber,
                Email = c.Email,
                Appointments = c
                    .Appointments.Select(a => new AppointmentDTO
                    {
                        Id = a.Id,
                        Title = a.Title,
                        Start = a.Start,
                        End = a.End,
                        AllDay = a.AllDay,
                        ExtendedProps = new AppointmentDTO.ExtendedPropsDTO
                        {
                            CustomerId = a.CustomerId,
                            Customer = new CustomerDTO
                            {
                                Id = a.Customer.Id,
                                FirstName = a.Customer.FirstName,
                                LastName = a.Customer.LastName,
                                PhoneNumber = a.Customer.PhoneNumber,
                                Email = a.Customer.Email,
                            },
                            StylistId = a.StylistId,
                            Stylist = new StylistDTO
                            {
                                Id = a.Stylist.Id,
                                FirstName = a.Stylist.FirstName,
                                LastName = a.Stylist.LastName,
                                Email = a.Stylist.Email,
                                PhoneNumber = a.Stylist.PhoneNumber,
                                IsActive = a.Stylist.IsActive,
                            },
                            Services = a
                                .AppointmentServices.Select(aps => new ServiceDTO
                                {
                                    Id = aps.Service.Id,
                                    Name = aps.Service.Name,
                                    Price = aps.Service.Price,
                                })
                                .ToList(),
                        },
                    })
                    .ToList(),
            })
            .ToListAsync();

        return Results.Ok(customers);
    }
);

app.MapGet(
    "/api/customers/phone-number/{phoneNumber}",
    async (HillarysHairCareDbContext db, string phoneNumber) =>
    {
        var customer = await db
            .Customers.Include(c => c.Appointments)
            .ThenInclude(a => a.Stylist)
            .Include(c => c.Appointments)
            .ThenInclude(a => a.AppointmentServices)
            .ThenInclude(aps => aps.Service)
            .Where(c => c.PhoneNumber == phoneNumber)
            .Select(c => new CustomerDTO
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                PhoneNumber = c.PhoneNumber,
                Email = c.Email,
                Appointments = c
                    .Appointments.Select(a => new AppointmentDTO
                    {
                        Id = a.Id,
                        Title = a.Title,
                        Start = a.Start,
                        End = a.End,
                        AllDay = a.AllDay,
                        ExtendedProps = new AppointmentDTO.ExtendedPropsDTO
                        {
                            CustomerId = a.CustomerId,
                            Customer = new CustomerDTO
                            {
                                Id = a.Customer.Id,
                                FirstName = a.Customer.FirstName,
                                LastName = a.Customer.LastName,
                                PhoneNumber = a.Customer.PhoneNumber,
                                Email = a.Customer.Email,
                            },
                            StylistId = a.StylistId,
                            Stylist = new StylistDTO
                            {
                                Id = a.Stylist.Id,
                                FirstName = a.Stylist.FirstName,
                                LastName = a.Stylist.LastName,
                                Email = a.Stylist.Email,
                                PhoneNumber = a.Stylist.PhoneNumber,
                                IsActive = a.Stylist.IsActive,
                            },
                            Services = a
                                .AppointmentServices.Select(aps => new ServiceDTO
                                {
                                    Id = aps.Service.Id,
                                    Name = aps.Service.Name,
                                    Price = aps.Service.Price,
                                })
                                .ToList(),
                        },
                    })
                    .ToList(),
            })
            .FirstOrDefaultAsync();

        if (customer == null)
        {
            return Results.NotFound();
        }

        return Results.Ok(customer);
    }
);

//Services Endpoints
//GET all Services
app.MapGet(
    "/api/services",
    async (HillarysHairCareDbContext db) =>
    {
        var services = await db
            .Services.Select(s => new ServiceDTO
            {
                Id = s.Id,
                Name = s.Name,
                Price = s.Price,
            })
            .ToListAsync();

        return Results.Ok(services);
    }
);

app.Run();
