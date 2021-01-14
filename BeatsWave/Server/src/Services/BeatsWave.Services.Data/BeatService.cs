namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

    public class BeatService : IBeatService
    {
        private readonly IDeletableEntityRepository<Beat> beatsRepository;

        public BeatService(IDeletableEntityRepository<Beat> beatsRepository)
        {
            this.beatsRepository = beatsRepository;
        }

        public async Task<Result> AddPlay(int id, string userId)
        {
            var beat = await this.beatsRepository
                .All()
                .FirstOrDefaultAsync(b => b.Id == id);

            if (beat.ProducerId == userId)
            {
                return "Your beat clicks do not count!";
            }

            beat.Plays++;
            await this.beatsRepository.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<T>> AllAsync<T>(int? take = null, int skip = 0)
        {
            var query = this.beatsRepository
                .All()
                .OrderByDescending(b => b.CreatedOn)
                .Skip(skip);

            if (take != 0)
            {
                query = query.Take(take.Value);
            }

            return await query.To<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> ByGenre<T>(string genre, int? take = null, int skip = 0)
        {
            var genreAsEnum = (Genre)Enum.Parse(typeof(Genre), genre);

            var query = this.beatsRepository
                .All()
                .OrderByDescending(b => b.CreatedOn)
                .Where(b => b.Genre == genreAsEnum)
                .Skip(skip);

            if (take != 0)
            {
                query = query.Take(take.Value);
            }

            return await query.To<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> ByIds<T>(int[] ids)
        {
            return await this.beatsRepository
                .All()
                .Where(b => ids.Contains(b.Id) == true)
                .To<T>()
                .ToListAsync();
        }

        public async Task<IEnumerable<T>> ByLikes<T>()
        {
            return await this.beatsRepository
                .All()
                .OrderByDescending(x => x.Likes.Count)
                .Take(50)
                .To<T>()
                .ToListAsync();
        }

        public async Task<IEnumerable<T>> ByUser<T>(string userId)
            => await this.beatsRepository
                .All()
                .Where(x => x.ProducerId == userId)
                .To<T>()
                .ToListAsync();

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

        public async Task<T> DetailsAsync<T>(int id)
            => await this.beatsRepository
                .All()
                .Where(x => x.Id == id)
                .To<T>()
                .FirstOrDefaultAsync();
    }
}
