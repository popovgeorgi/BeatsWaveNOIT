using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeatsWave.Data.Migrations
{
    public partial class AddBeatsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Beats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    BeatUrl = table.Column<string>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    Genre = table.Column<int>(nullable: false),
                    Bpm = table.Column<int>(nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: true),
                    ProducerId = table.Column<string>(nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Beats_AspNetUsers_ProducerId",
                        column: x => x.ProducerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Beats_IsDeleted",
                table: "Beats",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Beats_ProducerId",
                table: "Beats",
                column: "ProducerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Beats");
        }
    }
}
