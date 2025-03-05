import { createApp } from './app';
import sequelize from './infrastructure/index';
import logger from './infrastructure/logger';
import './domain/entities/association';
async function startServer() {
  try {
    try {
      await sequelize.authenticate();
      logger.info('Database connection successful');
    } catch (error) {
      logger.error('Database connection unsuccessful');
      process.exit(1);
    }

    const app = createApp();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server:', ${error}`);
    process.exit(1);
  }
}

startServer();