namespace BeatsWave.Services.Data
{
    using System;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;

    public class BeatService : IBeatService
    {
        private readonly IDeletableEntityRepository<Beat> beatsRepository;

        public BeatService(IDeletableEntityRepository<Beat> beatsRepository)
        {
            this.beatsRepository = beatsRepository;
        }

        public async Task<int> CreateAsync(string name, string beatUrl, string imageUrl, int price, string genre, int? bpm, string description, string producerId)
        {
            var beat = new Beat
            {
                Name = name,
                BeatUrl = beatUrl,
                ImageUrl = imageUrl,
                Price = price,
                Genre = (Genre)Enum.Parse(typeof(Genre), genre),
                Bpm = bpm,
                Description = description,
                ProducerId = producerId,
            };

            await this.beatsRepository.AddAsync(beat);

            await this.beatsRepository.SaveChangesAsync();

            return beat.Id;
        }
    }
}
