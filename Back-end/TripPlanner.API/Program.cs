using Microsoft.EntityFrameworkCore;
using TripPlannerAPI.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAutoMapper(typeof(Program));

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");


if (builder.Environment.IsProduction())
{
    // Use production connection string
    connectionString = builder.Configuration.GetConnectionString("ProductionConnection");

}

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

    using (var scope = app.Services.CreateScope())
    {
        var myContext = scope.ServiceProvider.GetRequiredService<TripContext>();
        DBInitializer.Initialize(myContext);
    }
}

app.UseCors(x => x
            .AllowAnyOrigin() // temporary
            .AllowAnyMethod()
            .AllowAnyHeader()); //Temporary (security risk)

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
