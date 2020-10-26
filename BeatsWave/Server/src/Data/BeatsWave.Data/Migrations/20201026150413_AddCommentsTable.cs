namespace BeatsWave.Data.Migrations
{
    using System;

    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddCommentsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BeatComments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BeatId = table.Column<int>(nullable: false),
                    ParentId = table.Column<int>(nullable: true),
                    Content = table.Column<string>(maxLength: 240, nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    CreatedOn = table.Column<DateTime>(nullable: false),
                    ModifiedOn = table.Column<DateTime>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeletedOn = table.Column<DateTime>(nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BeatComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BeatComments_Beats_BeatId",
                        column: x => x.BeatId,
                        principalTable: "Beats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BeatComments_BeatComments_ParentId",
                        column: x => x.ParentId,
                        principalTable: "BeatComments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BeatComments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BeatComments_BeatId",
                table: "BeatComments",
                column: "BeatId");

            migrationBuilder.CreateIndex(
                name: "IX_BeatComments_IsDeleted",
                table: "BeatComments",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_BeatComments_ParentId",
                table: "BeatComments",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_BeatComments_UserId",
                table: "BeatComments",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BeatComments");
        }
    }
}
