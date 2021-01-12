namespace BeatsWave.Web.Models.Search
{
    using System.Collections.Generic;

    public class SearchResponseModel
    {
        public IEnumerable<BeatsSearchServiceModel> Beats { get; set; }

        public IEnumerable<ArtistsSearchServiceModel> Artists { get; set; }
    }
}
