// ReSharper disable VirtualMemberCallInConstructor
namespace BeatsWave.Data.Models
{
    using System;
    using System.Collections.Generic;

    using BeatsWave.Data.Common.Models;

    using Microsoft.AspNetCore.Identity;

    public class ApplicationUser : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Roles = new HashSet<IdentityUserRole<string>>();
            this.Claims = new HashSet<IdentityUserClaim<string>>();
            this.Logins = new HashSet<IdentityUserLogin<string>>();
            this.Subscription = Subscription.Basic;
            this.Followers = new HashSet<Follow>();
            this.Beats = new HashSet<Beat>();
            this.Likes = new HashSet<Like>();
            this.Comments = new HashSet<ArtistComment>();
        }

        public Profile Profile { get; set; }

        public Subscription Subscription { get; set; }

        public string Country { get; set; }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public virtual ICollection<Follow> Followers { get; }

        public virtual ICollection<Beat> Beats { get; }

        public virtual ICollection<Like> Likes { get; }

        // Comments from other users to this user
        public virtual ICollection<ArtistComment> Comments { get; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }
    }
}
