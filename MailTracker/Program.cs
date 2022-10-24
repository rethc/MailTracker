using MailTrackerAPI.Models;
using Microsoft.AspNetCore.Server.Kestrel.Core; 
using Microsoft.EntityFrameworkCore;
using System.Net;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MailTrackerDbContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddControllersWithViews();

var app = builder.Build();

//HSTS test
app.Use((context, next) =>
{
    context.Request.Scheme = "https";
    return next();
});
app.UseHsts();

//HTTP3 TEST
app.Use((context, next) =>
{
    context.Response.Headers.AltSvc = "h3=\":443\"";
    return next(context);
});


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{

}

app.UseStaticFiles();
app.UseRouting();
app.UseCors(options =>
options.WithOrigins("http://localhost:44480")
.AllowAnyMethod()
.AllowAnyHeader());

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
