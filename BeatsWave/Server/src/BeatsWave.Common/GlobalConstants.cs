namespace BeatsWave.Common
{
    public static class GlobalConstants
    {
        public const string SystemName = "BeatsWave";

        public const string AdministratorRoleName = "Administrator";
        public const string BeatmakerRoleName = "Beatmaker";
        public const string ArtistRoleName = "Artist";
        public const string ManagerRoleName = "Manager";

        public const string DefaultMainPhotoUrl = "https://beatswave.blob.core.windows.net/photos/default.jpg";

        public const string BlobImageContainer = "photos";
        public const string BlobBeatContainer = "beats";

        public const string Id = "{id}";
        public const string Term = "{term}";
        public const string BeatId = "{beatId}";

        public const int TakeArtistsBySearch = 6;
        public const int TakeBeatsBySearch = 3;

        public const string ByGenreRoute = "ByGenre/{genre}";
        public const string AddPlayRoute = "AddPlay";

        public const string BeatCommentsRoute = "Beats/{id}";
        public const string ArtistCommentsRoute = "Artists/{id}";
    }
}
