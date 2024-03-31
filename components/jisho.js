const Discord = require('discord.js');

const jishoEmbed = (
	author,
	profile,
	query,
	isCommonWord,
	reading,
	jlpt,
	englishDefinitions,
	tags
) => new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setAuthor(`Hello, ${author}`, profile)
		.setTitle(`Searched query:「${query}」`)
		.addField(`Readings:`, `${reading}`, true)
		.addField(`Is a common word:`, `${isCommonWord}`, true)
		.addField(`JLPT:`, `${jlpt}`, true)
		.addField(`English Definitions:`, `${englishDefinitions}`, true)
		.addField(`Other tags`, `${tags}`, true)
		.setFooter(`Data from Jisho.org, function implemented by ainhart`)

async function searchJisho(query) {
    try {
        const url = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1'
            }
        });   
        if (!response.ok) {
            throw new Error(`Failed to fetch Jisho data. Status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Jisho data:', error);
        return null; // or throw error depending on how you want to handle it
    }
}

async function searchJishoWord(args, message) {

    const jishoData = await searchJisho(args);
    if (!jishoData || !jishoData.data || jishoData.data.length === 0) {
        message.reply('No results found.');
    }

    else {
        const author = message.author.username
        const profile = message.author.displayAvatarURL
        const isCommon = jishoData.data[0].is_common;
        const reading = jishoData.data[0].japanese[0].reading;
        const jlpt = jishoData.data[0].jlpt[0]
        const englishDefinitions = jishoData.data[0].senses[0].english_definitions;
        const givenTags = jishoData.data[0].tags
        const tags = givenTags.length > 0 ? givenTags.join(', ') : 'None'
        message.channel.send(jishoEmbed(author, profile, args, isCommon ? 'Yes' : 'No', reading, jlpt ? jlpt : 'Not Applicable', englishDefinitions ? englishDefinitions : 'N/A', tags));
    }
}

module.exports = { searchJishoWord };