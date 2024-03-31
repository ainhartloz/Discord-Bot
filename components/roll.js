function roll(args, message) {
    const inputValidation = /(\d+)(d)(\d+)/g;
    if (args[0].substring(0, 1) == '-') {
        message.reply(`Please enter a positive integer.`);
    } else if (isNaN(args[0].substring(0, 1))) {
        message.reply(`Please enter a proper format to roll: (e.g. !roll 1d6)`);
    } else if (args[0].match(inputValidation)) {
        const userInput = inputValidation.exec(args[0]);
        var letterD = userInput[2];
        if (letterD != 'd') {
            message.reply(`Please enter a proper format to roll: (e.g. !roll 1d6)`);
        } else {
            var rollCount = userInput[1];
            var rollNumber = userInput[3];
            if (rollCount > 9) {
                message.reply(`Please roll less than 10 dices to avoid flooding the channel.`);
            } else if (rollCount < 1) {
                message.reply(`You cannot roll 0 dices.`);
            } else {
                let results = [];
                for (let i = 0; i < rollCount; i++) {
                    var result = Math.floor(Math.random() * rollNumber) + 1;
                    results.push(result);
                }
                let replyMessage = results.map(result => `Rolled: ${result}`).join('\n');
                message.reply(replyMessage);
            }
        }
    } else {
        message.reply(`Please enter a proper format to roll: (e.g. !roll 1d20)`);
    }
};

module.exports = { roll };