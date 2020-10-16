﻿namespace BeatsWave.Data.Models
{
    public class Validation
    {
        public class User
        {
            public const int MaxLocationLength = 30;
            public const int MaxDisplayNameLength = 15;
            public const int MaxNameLength = 40;
            public const int MaxBiographyLength = 200;
        }

        public class Beat
        {
            public const int MaxNameLength = 50;
            public const int MaxDescriptionLength = 200;
        }
    }
}
