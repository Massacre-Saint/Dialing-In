import axios from 'axios';
import { clientCredentials } from '../../client';

const dbUrl = clientCredentials.databaseURL;

const getDefaultRecipesByMethod = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/defaultRecipes.json?orderBy="methodId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getDefaultRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/defaultRecipes/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
export { getDefaultRecipesByMethod, getDefaultRecipe };
