using Loomi.Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loomi.Backend.Data;

public sealed class LoomiDbContext(DbContextOptions<LoomiDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Profile> Profiles => Set<Profile>();
    public DbSet<ProfileInterest> ProfileInterests => Set<ProfileInterest>();
    public DbSet<ProfileGenderInterest> ProfileGenderInterests => Set<ProfileGenderInterest>();
    public DbSet<ProfilePhoto> ProfilePhotos => Set<ProfilePhoto>();
    public DbSet<Like> Likes => Set<Like>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).HasColumnName("id").UseIdentityByDefaultColumn();
            entity.Property(x => x.Email).HasColumnName("email").IsRequired();
            entity.Property(x => x.Password).HasColumnName("password");
            entity.HasIndex(x => x.Email).IsUnique();
            entity.HasOne(x => x.Profile).WithOne(x => x.User).HasForeignKey<Profile>(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.ToTable("profiles");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).HasColumnName("id").UseIdentityByDefaultColumn();
            entity.Property(x => x.Name).HasColumnName("name").IsRequired();
            entity.Property(x => x.Age).HasColumnName("age").IsRequired();
            entity.Property(x => x.Bio).HasColumnName("bio");
            entity.Property(x => x.ImageUrl).HasColumnName("image_url");
            entity.Property(x => x.Telegram).HasColumnName("telegram");
            entity.Property(x => x.Location).HasColumnName("location");
            entity.Property(x => x.Education).HasColumnName("education");
            entity.Property(x => x.Relationships).HasColumnName("relationships");
            entity.Property(x => x.UserId).HasColumnName("user_id");
            entity.HasIndex(x => x.UserId).IsUnique();
        });

        modelBuilder.Entity<ProfileInterest>(entity =>
        {
            entity.ToTable("profile_interests");
            entity.HasKey(x => new { x.ProfileId, x.Interest });
            entity.Property(x => x.ProfileId).HasColumnName("profile_id");
            entity.Property(x => x.Interest).HasColumnName("interest");
            entity.HasOne(x => x.Profile).WithMany(x => x.Interests).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProfileGenderInterest>(entity =>
        {
            entity.ToTable("profile_gender_interests");
            entity.HasKey(x => new { x.ProfileId, x.GenderInterest });
            entity.Property(x => x.ProfileId).HasColumnName("profile_id");
            entity.Property(x => x.GenderInterest).HasColumnName("gender_interest");
            entity.HasOne(x => x.Profile).WithMany(x => x.GenderInterests).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProfilePhoto>(entity =>
        {
            entity.ToTable("profile_photos");
            entity.HasKey(x => new { x.ProfileId, x.PhotoUrl });
            entity.Property(x => x.ProfileId).HasColumnName("profile_id");
            entity.Property(x => x.PhotoUrl).HasColumnName("photo_url");
            entity.HasOne(x => x.Profile).WithMany(x => x.Photos).HasForeignKey(x => x.ProfileId).OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Like>(entity =>
        {
            entity.ToTable("likes");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Id).HasColumnName("id").UseIdentityByDefaultColumn();
            entity.Property(x => x.FromProfileId).HasColumnName("from_profile_id");
            entity.Property(x => x.ToProfileId).HasColumnName("to_profile_id");
            entity.HasIndex(x => new { x.FromProfileId, x.ToProfileId }).IsUnique();
            entity.HasOne(x => x.FromProfile).WithMany().HasForeignKey(x => x.FromProfileId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(x => x.ToProfile).WithMany().HasForeignKey(x => x.ToProfileId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}
