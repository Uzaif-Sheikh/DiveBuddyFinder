using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiveBuddyFinder.Migrations
{
    /// <inheritdoc />
    public partial class DbInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CertificateDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Agency = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Url = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CertificateDetails", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    PostCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Suburb = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    State = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CountryCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.PostCode);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Divers",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    FirstName = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(16)", maxLength: 16, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumberOfDives = table.Column<int>(type: "int", nullable: false),
                    Bio = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Image = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Age = table.Column<int>(type: "int", nullable: false),
                    PostCode = table.Column<int>(type: "int", nullable: false),
                    LocationPostCode = table.Column<int>(type: "int", nullable: false),
                    LastActive = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Divers", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Divers_Locations_LocationPostCode",
                        column: x => x.LocationPostCode,
                        principalTable: "Locations",
                        principalColumn: "PostCode",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Divers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Token = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ExpiresOnUtc = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Certificates",
                columns: table => new
                {
                    CertificateDetailsId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    DiverId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Certificates", x => new { x.CertificateDetailsId, x.DiverId });
                    table.ForeignKey(
                        name: "FK_Certificates_CertificateDetails_CertificateDetailsId",
                        column: x => x.CertificateDetailsId,
                        principalTable: "CertificateDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Certificates_Divers_DiverId",
                        column: x => x.DiverId,
                        principalTable: "Divers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Certificates_DiverId",
                table: "Certificates",
                column: "DiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Divers_LocationPostCode",
                table: "Divers",
                column: "LocationPostCode");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");
            
            migrationBuilder.InsertData(
                table: "CertificateDetails", 
                columns: new [] { "Id", "Name", "Agency", "Url"},
                values: new object[,] {
                    {Guid.NewGuid(), "Open Water Diver Or An Equivalent Certification", "PADI", "https://www.padi.com/courses/open-water-diver"},
                    {Guid.NewGuid(), "Advanced Open Water Diver Or An Equivalent Certification", "PADI", "https://www.padi.com/courses/advanced-open-water-diver"},
                    {Guid.NewGuid(), "Rescue Diver Or An Equivalent Certification", "PADI", "https://www.padi.com/courses/rescue-diver"},
                    {Guid.NewGuid(), "Master Scuba Diver Or An Equivalent Certification", "PADI", "https://store.padi.com/en-au/education/become-a-padi-master-scuba-diver/"},
                    {Guid.NewGuid(), "Enriched Air (Nitrox) Diver Or An Equivalent Certification", "PADI", "https://www.padi.com/courses/enriched-air-diver"},
                    {Guid.NewGuid(), "Freediver Or An Equivalent Certification", "PADI", "https://store.padi.com/en-au/ns/courses/freediver/p/freediver/"},
                    {Guid.NewGuid(), "Tec 40 Or An Equivalent Certification", "PADI", "https://store.padi.com/en-au/ns/courses/tec-40-and-tec-40-trimix/p/tec-40-and-tec-40-trimix/"},
                    {Guid.NewGuid(), "Divemaster Or An Equivalent Certification", "PADI", "https://store.padi.com/en-us/courses/divemaster/p/60550-1B2C/"},
                    {Guid.NewGuid(), "Open Water Scuba Diving Instructor Or An Equivalent Certification", "PADI", "https://store.padi.com/en-au/ns/courses/open-water-scuba-instructor/p/open-water-scuba-instructor/"},
                    {Guid.NewGuid(), "Master Scuba Diver Trainer Or An Equivalent Certification", "PADI", "https://store.padi.com/en-au/ns/courses/master-scuba-diver-trainer/p/master-scuba-diver-trainer/"},
                    {Guid.NewGuid(), "Not Yet Certified Or Planning to get Certified", "NONE", "https://www.padi.com/courses"},
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Certificates");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "CertificateDetails");

            migrationBuilder.DropTable(
                name: "Divers");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
