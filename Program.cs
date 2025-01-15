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

app.Run();
