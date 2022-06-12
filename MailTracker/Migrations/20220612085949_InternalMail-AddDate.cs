using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MailTracker.Migrations
{
    public partial class InternalMailAddDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateEntered",
                table: "InternalMails",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateEntered",
                table: "InternalMails");
        }
    }
}
