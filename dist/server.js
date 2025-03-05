"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const index_1 = __importDefault(require("./infrastructure/index"));
const logger_1 = __importDefault(require("./infrastructure/logger"));
require("./domain/entities/association");
async function startServer() {
    try {
        try {
            await index_1.default.authenticate();
            logger_1.default.info('Database connection successful');
        }
        catch (error) {
            logger_1.default.error('Database connection unsuccessful');
            process.exit(1);
        }
        const app = (0, app_1.createApp)();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            logger_1.default.info(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error(`Failed to start server:', ${error}`);
        process.exit(1);
    }
}
startServer();
