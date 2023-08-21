import {fetchBreeds, fetchCatByBreed} from './js/cat-api';
import {Report} from 'notiflix/build/notiflix-report-aio';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.style.display = 'none';
// loader.style.display = 'none';
error.style.display = 'none';
catInfo.style.display = 'none';

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showError() {
    error.style.display = 'block';
}

function hideError() {
    error.style.display = 'none';
}

showLoader();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      select.appendChild(option);
    });
    select.style.display = 'block';
    hideLoader();
  })
.catch(error => {
    Report.failure('Oops', 'Something went wrong! Try reloading the page!', 'OK');
    showError();
    hideLoader();
});
 
select.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
    
    showLoader();
    hideError();

    fetchCatByBreed(breedId)
    .then(cat => {
        catInfo.innerHTML = `
        <img src="${cat.url}" alt="${selectedBreedId}" />
        <p><strong>Name:</strong> ${cat.breeds[0].name}</p>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        `;
        catInfo.style.display = 'block';
    })
    .catch(error => {
        Report.failure('Oops', 'Something went wrong! Try reloading the page!', 'OK');
    })
    .finally(() => {
        hideLoader();
    });
});