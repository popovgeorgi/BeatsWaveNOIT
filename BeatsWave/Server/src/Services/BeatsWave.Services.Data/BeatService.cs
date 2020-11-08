﻿namespace BeatsWave.Services.Data
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

        public BeatService(IDeletableEntityRepository<Beat> beatsRepository)
        {
            this.beatsRepository = beatsRepository;
        }

        public async Task<IEnumerable<T>> AllAsync<T>(int? take = null, int skip = 0)
            => await this.beatsRepository
                .All()
                .OrderByDescending(b => b.CreatedOn)
                .Skip(skip)
                .Take((int)take)
                .To<T>()
                .ToListAsync();

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
