namespace BeatsWave.Web.Models.Artists
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class ArtistByBeatIdServiceModel : IMapFrom<Beat>
    {
        public string ProducerId { get; set; }
    }
}
