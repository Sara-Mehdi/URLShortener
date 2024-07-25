import { DataSource } from 'typeorm'
import { ShortenedUrls } from './Url' // Import your entities

// Initialize the DataSource
const DB = new DataSource({
    type: 'postgres', // or 'mysql', 'sqlite', etc.
    host: 'localhost',
    port: 6969,
    username: 'username',
    password: 'pass',
    database: 'db',
    entities: [ShortenedUrls], // Add your entities here
    synchronize: true, // Set to false in production
});

// Initialize the DataSource
DB.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((error) => {
        console.error('Error during Data Source initialization', error);
    });

export default DB
