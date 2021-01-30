namespace BeatsWave.Services
{
    using Newtonsoft.Json;

    public class IpInfo
    {
        [JsonProperty("country_name")]
        public string CountryName { get; set; }
    }
}
