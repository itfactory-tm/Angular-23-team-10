using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TripPlannerAPI.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAutoMapper(typeof(Program));

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<TripContext>(options =>
options.UseSqlServer(connectionString));

//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddSqlServer<TripContext>(connectionString, options => options.EnableRetryOnFailure());

builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddSwaggerService();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
            .WithOrigins("http://localhost:4200", "https://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()); //Temporary (security risk)

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var myContext = scope.ServiceProvider.GetRequiredService<TripContext>();
    DBInitializer.Initialize(myContext);
}

app.Run();
