import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const profilesFile = path.join(__dirname, '../../data/profiles.json');

const getRandommerHeaders = () => ({
  'X-Api-Key': process.env.RANDOMMER_API_KEY
});

async function fetchRandomUser() {
  try {
    const { data } = await axios.get('https://randomuser.me/api/');
    const u = data.results[0];
    return {
      name: `${u.name.first} ${u.name.last}`,
      email: u.email,
      gender: u.gender,
      location: `${u.location.city}, ${u.location.country}`,
      picture: u.picture.large
    };
  } catch (err) {
    console.error('Erreur Randomuser:', err.message);
    throw err;
  }
}

async function fetchRandommerData() {
  const headers = getRandommerHeaders();
  const result = {};

  try {
    const { data: phone } = await axios.get('https://randommer.io/api/Phone/Generate?CountryCode=FR', { headers });
    result.phone_number = phone;
  } catch (err) {
    console.error('Erreur téléphone:', err.response?.data || err.message);
  }

  try {
    const { data: iban } = await axios.get('https://randommer.io/api/Bank/Iban?Country=FR', { headers });
    result.iban = iban;
  } catch (err) {
    console.error('Erreur IBAN:', err.response?.data || err.message);
  }

  try {
    const { data: [creditCard] } = await axios.get('https://randommer.io/api/Card?type=Visa&quantity=1', { headers });
    result.credit_card = {
      card_number: creditCard.cardNumber || creditCard.number,
      card_type: creditCard.type,
      expiration_date: creditCard.expiration || creditCard.expirationDate,
      cvv: creditCard.cvv || '***'
    };
  } catch (err) {
    console.error('Erreur carte:', err.response?.data || err.message);
  }

  try {
    const { data: [randomName] } = await axios.get('https://randommer.io/api/Name?nameType=firstname&quantity=1', { headers });
    result.random_name = randomName;
  } catch (err) {
    console.error('Erreur nom:', err.response?.data || err.message);
  }

  try {
    const { data: [pet] } = await axios.get('https://randommer.io/api/Animal?quantity=1', { headers });
    result.pet = pet;
  } catch (err) {
    console.error('Erreur animal:', err.response?.data || err.message);
  }

  return result;
}

async function fetchExternalExtras() {
  try {
    const [quoteRes, jokeRes] = await Promise.all([
      axios.get('https://api.quotable.io/random'),
      axios.get('https://v2.jokeapi.dev/joke/Any?type=single')
    ]);

    return {
      quote: {
        content: quoteRes.data.content,
        author: quoteRes.data.author
      },
      joke: {
        type: jokeRes.data.category,
        content: jokeRes.data.joke
      }
    };
  } catch (err) {
    console.error('Erreur extras:', err.message);
    return {
      quote: { content: '', author: '' },
      joke: { type: '', content: '' }
    };
  }
}

async function getProfile(req, res) {
  try {
    const [user, randommer, extras] = await Promise.all([
      fetchRandomUser(),
      fetchRandommerData(),
      fetchExternalExtras()
    ]);

    const profile = {
      user,
      phone_number: randommer.phone_number,
      iban: randommer.iban,
      credit_card: randommer.credit_card,
      random_name: randommer.random_name,
      pet: randommer.pet,
      quote: extras.quote,
      joke: extras.joke
    };

    await fs.ensureFile(profilesFile);
    let profiles = [];

    try {
      const content = await fs.readJson(profilesFile);
      profiles = Array.isArray(content) ? content : [];
    } catch {
      profiles = [];
    }

    profiles.push(profile);
    await fs.writeJson(profilesFile, profiles, { spaces: 2 });

    res.status(200).json(profile);
  } catch (err) {
    console.error('Erreur dans getProfile:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

export default getProfile;
