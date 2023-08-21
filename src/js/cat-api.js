import axios from "axios";

const URL = "https://api.thecatapi.com/v1/breeds";
const URlImag = "https://api.thecatapi.com/v1/images";
const API_KEY = "live_NlTtt00uiO3ee8t7Ulisf3cbWF1GKwoNhoKyt7w2rcJ8sCipRjCVYPP8S9DTPnKN";

axios.defaults.headers.common["x-api-key"] = API_KEY;

function fetchBreeds() {
    return axios.get(URL)
    .then (response => {
        if (response.status !== 200) {
            throw new Error(response.status);
        }
          return response.data;
    });
 };

 function fetchCatByBreed(breedId) {
    return axios.get(`${URlImag}/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
        console.log(error.message);
        throw error;
    });
};

export {fetchBreeds, fetchCatByBreed};