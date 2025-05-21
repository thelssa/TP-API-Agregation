import dotenv from 'dotenv';

dotenv.config();

console.log('RANDOMMER_API_KEY chargée :', process.env.RANDOMMER_API_KEY);

export default function getRandommerHeaders() {
  return {
    'X-Api-Key': process.env.RANDOMMER_API_KEY
  };
}
