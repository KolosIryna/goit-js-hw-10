import {fetchBreeds, fetchCatByBreed} from './js/cat-api';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.style.display = 'none';
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
    Notiflix.Report.failure('Oops', 'Something went wrong! Try reloading the page!', 'OK');
    showError();
    hideLoader();
});
 
select.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
    
    showLoader();
    hideError();

    fetchCatByBreed(selectedBreedId)
    .then(cat => {
        catInfo.innerHTML = `
        <img class="cat-img" src="${cat[0].url}" alt="${selectedBreedId}" width="300" />
        <p><strong>Name:</strong> ${cat[0].breeds[0].name}</p>
        <p><strong>Description:</strong> ${cat[0].breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat[0].breeds[0].temperament}</p>
        `;
        catInfo.style.display = 'block';
        
    })
    .catch(error => {
        Notiflix.Report.failure('Oops', 'Something went wrong! Try reloading the page!', 'OK');
    })
    .finally(() => {
        hideLoader();
    });
});