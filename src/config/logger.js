import winston from "winston";

const logger = winston.createLogger({
  exitOnError: true,
  level: "info",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.prettyPrint(),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console()],
});

export { logger };
