var endpoint = 'latest'
const exchangeratekey = require('./exchangeratekey.json').token;
const axios = require('axios');

async function fxconvert(args, message) {
    var input;
	const inputFXValidation = /([\d\.]+) (\w{3}) (\w{3})/g;
	if (args.length != 3) {
		message.reply(`Please enter the command with the proper format. (e.g. !fxconvert 100.50 SGD HKD)`);
		return;
	}
	else {
		input = args[0] + ' ' + args[1].toUpperCase() + ' ' + args[2].toUpperCase(); 
	}
	if (input.match(inputFXValidation)) {
	    const userInput = inputFXValidation.exec(input);
	    var [_, amount, fromCurrency, toCurrency] = userInput;
	axios
		.get(`http://api.exchangeratesapi.io/v1/${endpoint}?access_key=${exchangeratekey}`)
		.then(response => {
			let theRates = response.data.rates;
			let divisible = theRates[fromCurrency];
		    let multiply = theRates[toCurrency];
			let convertedAmount = amount / divisible * multiply;
			if (!Number.isNaN(convertedAmount)) {
				if (toCurrency != 'BTC') {
					convertedAmount = parseFloat(convertedAmount).toFixed(2);
				}
				message.reply(`Conversion: ${fromCurrency}${amount} = ${toCurrency}${convertedAmount}`);
			}
			else {
				message.reply(`Please enter the command with proper currencies (e.g. USD)`);
			}
		}).catch(error => {
			message.reply(`Please enter the command with proper currencies (e.g. USD)`);
		});
	}
	else {
		message.reply(`Please enter the command with the proper format. (e.g. !fxconvert 100.50 SGD HKD)`);
	}
}

module.exports = { fxconvert };