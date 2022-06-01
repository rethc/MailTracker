using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MailTracker.Migrations
{
    public partial class externalmailupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProductType",
                table: "ExternalMails",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductType",
                table: "ExternalMails");
        }
    }
}
