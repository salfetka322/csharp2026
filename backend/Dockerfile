FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY Loomi.Backend.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish Loomi.Backend.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
RUN mkdir -p /app/uploads
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Loomi.Backend.dll"]
