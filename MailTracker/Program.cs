using MailTrackerAPI.Models;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
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
