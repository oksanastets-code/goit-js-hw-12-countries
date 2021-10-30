// https://restcountries.com/
// fetch('https://restcountries.com/v2/name/{name}');
// console.log(r);
import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTpl from '../templates/country-card.hbs';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchField: document.querySelector('input'),
};

refs.searchField.addEventListener('input', debounce(onSearch, 500));


  
function onSearch(event) {
    console.log(event.target.value);
    const searchKey = event.target.value;
    fetchCountry(searchKey)
  .then(renderCountryCard)
  .catch(onError);
}
function fetchCountry(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  console.log(markup);
  refs.cardContainer.innerHTML = markup;
}
function onError(error) {
    PNotify.error({
  title: 'Oh No!',
  text: 'Something terrible happened.'
});
}