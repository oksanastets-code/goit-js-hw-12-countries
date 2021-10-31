// https://restcountries.com/

import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

fetch('https://restcountries.com/v2/name/italy').then(response => {
    return response.json();
  }).then(country => console.log(country));
const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    searchField: document.querySelector('input'),
};

refs.searchField.addEventListener('input', debounce(onSearch, 500));


  
function onSearch(event) {
    console.log(event.target.value);
    const searchKey = event.target.value;
    fetchCountry(searchKey)
    .then(render)
  .catch (error);
}
function fetchCountry(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
    return response.json();
  });
}
function render(value) {
  console.log(value.length);
  if (value.length === 1) { renderCountryCard(value); }
  else if (value.length > 1 && value.length < 11) { renderCountryList(value); }
  else if (!value.length) {
    refs.cardContainer.innerHTML = '';
    console.log(error(`${value.length} matches!`))
  }
  else {
    console.log(error(`${value.length} matches! і це забагато`))
  }
}
 
function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  console.log(markup);
  refs.cardContainer.innerHTML = markup;
}
function renderCountryList(value) {
  const markupList = countryListTpl(value);
  console.log(markupList);
  refs.cardContainer.innerHTML = markupList;
}
   