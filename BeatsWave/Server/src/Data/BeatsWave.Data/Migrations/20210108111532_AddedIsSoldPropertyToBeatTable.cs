namespace BeatsWave.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddedIsSoldPropertyToBeatTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSold",
                table: "Beats",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSold",
                table: "Beats");
        }
    }
}
