import { Client, Account, Databases } from 'appwrite';

// Initialize the client
const client = new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Set your Appwrite endpoint
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Set your project ID

// Export the account and databases services
export const account = new Account(client);
export const databases = new Databases(client);
export default client;
