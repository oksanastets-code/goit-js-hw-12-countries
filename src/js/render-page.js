import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

import debounce from 'lodash.debounce';

import { error, defaultModules } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';
import '@pnotify/core/dist/BrightTheme.css';

import getRefs from './get-refs.js';
import API from '../js/fetchCountries.js';

const refs = getRefs();

refs.searchField.addEventListener('input', debounce(onSearch, 1500));

function onSearch(event) {
  console.log(event.target.value);
  const searchKey = event.target.value;
  API.fetchCountry(searchKey).then(render);
  };

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

function render(value) {
  console.log(value.length);
  if (value.length === 1) {
    renderCountryCard(value);
  } else if (value.length > 1 && value.length < 11) {
    renderCountryList(value);
  } else if (!value.length) {
    refs.cardContainer.innerHTML = '';
    onError('Please try again.')
  } else {
    onError(`Too many (${value.length}) countries found. Please enter more specific query.`)
  }
}

export function onError(message) {
  return error({
    text: message,
    delay: 2000,
    closer: false,
    title: '',
    icon: false,
    width: '300px',
    sticker: false,
     })
}