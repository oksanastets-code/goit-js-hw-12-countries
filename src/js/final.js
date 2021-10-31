// https://restcountries.com/

import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import API from '../js/fetchCountries.js';
import getRefs from './get-refs.js';
import { render } from './renderMarkup.js';
// import { renderCountryList } from './render-card.js';

const refs = getRefs();

refs.searchField.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  console.log(event.target.value);
  const searchKey = event.target.value;
  API.fetchCountry(searchKey).then(render).catch(onFetchError);
}



function onFetchError() {}
