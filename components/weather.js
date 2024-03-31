const Discord = require('discord.js');
const axios = require('axios');

const weatherEmbed = (
	temp,
	maxTemp,
	minTemp,
	pressure,
	humidity,
	wind,
	cloudness,
	icon,
	author,
	profile,
	cityName,
	country
) =>
	new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setAuthor(`Hello, ${author}`, profile)
		.setTitle(`It is ${temp}\u00B0 C in ${cityName}, ${country}`)
		.addField(`Maximum Temperature:`, `${maxTemp}\u00B0 C`, true)
		.addField(`Minimum Temperature:`, `${minTemp}\u00B0 C`, true)
		.addField(`Humidity:`, `${humidity} %`, true)
		.addField(`Wind Speed:`, `${wind} m/s`, true)
		.addField(`Pressure:`, `${pressure} hpa`, true)
		.addField(`Cloudiness:`, `${cloudness}`, true)
		.setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
		.setFooter('Made by ainhart');


async function getWeatherData(args, message) {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=576781fa6074cc2d2339c3e9dfac1750`
    )
    .then(response => {
        let apiData = response;
        let currentTemp = Math.ceil(apiData.data.main.temp)
        let maxTemp = apiData.data.main.temp_max;
        let minTemp = apiData.data.main.temp_min;
        let humidity = apiData.data.main.humidity;
        let wind = apiData.data.wind.speed;
        let author = message.author.username
        let profile = message.author.displayAvatarURL
        let icon = apiData.data.weather[0].icon
        let cityName = args
        let country = apiData.data.sys.country
        let pressure = apiData.data.main.pressure;
        let cloudness = apiData.data.weather[0].description;
        message.channel.send(weatherEmbed(currentTemp, maxTemp, minTemp, pressure, humidity, wind, cloudness, icon, author, profile, cityName, country));
    }).catch(err => {
        message.reply(`Enter a valid city name`)
    })
}  

module.exports = { getWeatherData };