FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["Deposit_2/Deposit_2.csproj", "Deposit_2/"]
RUN dotnet restore "Deposit_2/Deposit_2.csproj"
COPY . .
WORKDIR "/src/Deposit_2"
RUN dotnet build "Deposit_2.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Deposit_2.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Deposit_2.dll"]