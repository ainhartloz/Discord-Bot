const logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    format: logger.format.combine(
		logger.format.colorize(),
		logger.format.simple()
	)
});
logger.level = 'debug';

module.exports = logger;