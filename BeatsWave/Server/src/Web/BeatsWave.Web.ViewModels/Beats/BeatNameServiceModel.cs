namespace BeatsWave.Web.Models.Beats
{
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;

    public class BeatNameServiceModel : IMapFrom<Beat>
    {
        public string Name { get; set; }
    }
}
