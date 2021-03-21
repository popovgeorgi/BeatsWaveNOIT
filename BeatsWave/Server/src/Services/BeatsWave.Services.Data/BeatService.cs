namespace BeatsWave.Services.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using BeatsWave.Data.Common.Repositories;
    using BeatsWave.Data.Models;
    using BeatsWave.Services.Mapping;
    using Microsoft.EntityFrameworkCore;

    public class BeatService : IBeatService
    {
        private readonly IDeletableEntityRepository<Beat> beatsRepository;
        private readonly IRepository<Play> playsRepository;
        private readonly IDeletableEntityRepository<Like> likesRepository;

        public BeatService(
            IDeletableEntityRepository<Beat> beatsRepository,
            IRepository<Play> playsRepository,
            IDeletableEntityRepository<Like> likesRepository)
        {
            this.beatsRepository = beatsRepository;
            this.playsRepository = playsRepository;
            this.likesRepository = likesRepository;
        }

        public async Task<Result> AddPlay(int beatId, string playerId)
        {
            var beat = await this.beatsRepository
                .All()
                .FirstOrDefaultAsync(b => b.Id == beatId);

            if (beat.ProducerId == playerId)
            {
                return "Your own clicks do not count!";
            }

            var play = new Play
            {
                BeatId = beatId,
                PlayerId = playerId,
            };

            await this.playsRepository.AddAsync(play);
            await this.playsRepository.SaveChangesAsync();

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

        public async Task<Result> UpdateAsync(string producerId, int beatId, string name, int? price, string genre, int? bpm, string description)
        {
            var beat = await this.beatsRepository
                .All()
                .FirstOrDefaultAsync(b => b.Id == beatId);

            if (beat == null)
            {
                return "Beat does not exist";
            }

            if (beat.ProducerId != producerId)
            {
                return "You cannot edit a beat that is not yours!";
            }

            this.ChangeBeat(beat, name, price, genre, bpm, description);

            await this.beatsRepository.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteAsync(string producerId, int beatId)
        {
            var beat = await this.beatsRepository
                .All()
                .FirstOrDefaultAsync(b => b.Id == beatId);

            if (beat == null)
            {
                return "Beat does not exist";
            }

            if (beat.ProducerId != producerId)
            {
                return "You cannot delete a beat that is not yours!";
            }

            this.beatsRepository.Delete(beat);
            await this.beatsRepository.SaveChangesAsync();

            return true;
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

        public async Task<IEnumerable<T>> FeaturedAsync<T>()
            => await this.beatsRepository
                .All()
                .Where(b => b.Producer.Subscription == Subscription.Premium)
                .To<T>()
                .Take(20)
                .ToListAsync();

        public async Task<IEnumerable<T>> MostTrending<T>()
            => await this.beatsRepository
                .All()
                .To<T>()
                .Take(20)
                .ToListAsync();

        public async Task<int> GetTotalCount()
            => await this.beatsRepository
                .All()
                .CountAsync();

        public async Task<IEnumerable<T>> AllNotLikedAndNotProducedByUserAsync<T>(string userId)
        {
            var likedBeatsByUser = await this.likesRepository
                .All()
                .Where(l => l.UserId == userId)
                .Select(b => b.BeatId)
                .ToListAsync();

            var notLikedBeats = await this.beatsRepository
                .All()
                .Where(b => !likedBeatsByUser.Contains(b.Id) && b.ProducerId != userId)
                .To<T>()
                .ToListAsync();

            return notLikedBeats;
        }

        private void ChangeBeat(Beat beat, string name, int? price, string genre, int? bpm, string description)
        {
            if (beat.Name != name && name != null)
            {
                beat.Name = name;
            }

            if (beat.Price != price && price != null)
            {
                beat.Price = (int)price;
            }

            if (genre != null && Enum.TryParse(genre, out Genre genreEnum))
            {
                var modelGenre = (Genre)Enum.Parse(typeof(Genre), genre);
                if (beat.Genre != modelGenre)
                {
                    beat.Genre = modelGenre;
                }
            }

            if (beat.Bpm != bpm && bpm != null)
            {
                beat.Bpm = bpm;
            }

            if (beat.Description != description && description != null)
            {
                beat.Description = description;
            }
        }
    }
}
