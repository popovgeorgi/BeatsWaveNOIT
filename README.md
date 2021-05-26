# BeatsWave

A musical web application designed to grow the music industry.

## Awards
This project has competed in several competitions:<br />
#### :2nd_place_medal: place at the 19th National Olympiad in Information technology (https://edusoft.fmi.uni-sofia.bg)<br />
#### :2nd_place_medal: place at SoftUniada (https://softuniada.softuni.bg/#softuniada2021)<br />
#### :shield: Project defence (https://www.youtube.com/watch?v=Z6vOKyRuKqI&t=1266s) (21:09, Bulgarian)

## Build status

[![Build Status](https://dev.azure.com/popovgeorgi002/BeatsWave/_apis/build/status/BeatsWave-CI?branchName=master)](https://dev.azure.com/popovgeorgi002/BeatsWave/_build/latest?definitionId=1&branchName=master)

## Table of Contents
1. [Technology stack](https://github.com/popovgeorgi/BeatsWaveNOIT#technology-stack)
2. [Screenshots](https://github.com/popovgeorgi/BeatsWaveNOIT#screenshots)
3. [Application Configurations](https://github.com/popovgeorgi/BeatsWaveNOIT#application-configurations)
4. [License](https://github.com/popovgeorgi/BeatsWaveNOIT#license)

## Technology stack

Main languages: C#, TS

### Front End:

- Angular

- Bootstrap 4

- @microsoft/signalr

- SCSS

- Perfect Scrollbar

- Simple Modal

- Chart js



### Back End:

- ASP.NET Core 5.0

- Entity Framework Core 5.0

- SQL Server

- Azure Blob Storage

- SignalR

- ML.NET

- Hangfire

- Swagger

- Sendgrid

- Azure DevOps CI & CD

## Screenshots:

### Index Page

![index1](https://user-images.githubusercontent.com/60527300/108606707-3aaafa00-73c4-11eb-8fb9-e5698c59a019.png)

### Home Page

![home1](https://user-images.githubusercontent.com/60527300/108606739-8e1d4800-73c4-11eb-849a-27e535490723.png)

### Feed

![music-feed](https://user-images.githubusercontent.com/60527300/108606757-b016ca80-73c4-11eb-9ab7-26afdbe0fb33.png)

### Beat Details

![song-details](https://user-images.githubusercontent.com/60527300/108606762-c3c23100-73c4-11eb-9325-a0b7390f6f34.png)

### Profile

![profile](https://user-images.githubusercontent.com/60527300/108606777-d9cff180-73c4-11eb-929b-d81c5c58f2a4.png)

### Analytics

![analytics](https://user-images.githubusercontent.com/60527300/108606791-f2400c00-73c4-11eb-8264-34f6d63e8d30.png)

### Add Beat

![add-music](https://user-images.githubusercontent.com/60527300/108606804-071c9f80-73c5-11eb-84da-e3a4c56a77de.png)

### Artist Details

![artist-details](https://user-images.githubusercontent.com/60527300/108606812-11d73480-73c5-11eb-89ac-e10f6296568b.png)

### Genres

![genres](https://user-images.githubusercontent.com/60527300/108606819-1ef42380-73c5-11eb-8415-d3429ab04034.png)

## Application Configurations

### Front End:

- run "yarn install" or "npm install" to install all dependencies for the project 

### Back End:

- Check connection string in appsettings.json.
   If you don't use SQLEXPRESS you should replace "Server=.\\SQLEXPRESS..." with "Server=.;...".

- App uses Distributed caching so make sure you run the following command: dotnet sql-cache create "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=DistCache;Integrated Security=True;" dbo CacheRecords

- App depends on Azure Blob Storage, make your own and replace the AccessKey with yours.

- App is sending emails with SendGrid. Make a registration and replace the key with yours.

- App is using IpStack and again you must register in order to get an API key.

## License

This project is licensed with the [GNU license](COPYING.txt).
