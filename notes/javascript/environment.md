# Environment Variables
In Node.js, environment variables that existed at the time the program started exist on `process.env`. This is an object with all the environment variables as keys. Ex
```JavaScript
console.log(process.env.AWS_KEY_DO_NOT_DO_THIS)
```
This would print that environment variable to the console.

## .env
We can create environment variables that will only exist for the program by writing `.env` files and installing the `dotenv` module.
`npm install --save dotenv`

You should add `.env` to your `.gitignore` and perhaps have a sample `.env.example` file as a template for your environment variables.

To add your `.env` variables you need to run
```JavaScript
import * as dotenv from 'dotenv';

dotenv.config()
```