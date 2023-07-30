using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MailTracker.Migrations
{
    /// <inheritdoc />
    public partial class NewColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "ExternalMails",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ScannedBy",
                table: "ExternalMails",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "ExternalMails");

            migrationBuilder.DropColumn(
                name: "ScannedBy",
                table: "ExternalMails");
        }
    }
}
