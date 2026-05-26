using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Domain.Entities;

namespace WMS.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(
    ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Employee)
                .WithMany()
                .HasForeignKey(a => a.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LeaveRequest>()
                .HasOne(l => l.Employee)
                .WithMany()
                .HasForeignKey(l => l.EmployeeId)
                .OnDelete(DeleteBehavior.Restrict);


        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }

        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<Attendance> Attendances { get; set; }

        public DbSet<LeaveRequest>
    LeaveRequests
        { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Department>
    Departments
        { get; set; }

        public DbSet<Project>
    Projects
        { get; set; }
    }
}
