import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

import getRefs from './get-refs';
const refs = getRefs();

export function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  console.log(markup);
  refs.cardContainer.innerHTML = markup;
}

export function renderCountryList(value) {
  const markupList = countryListTpl(value);
  console.log(markupList);
  refs.cardContainer.innerHTML = markupList;
}
export function render(value) {
  console.log(value.length);
  if (value.length === 1) {
    renderCountryCard(value);
  } else if (value.length > 1 && value.length < 11) {
    renderCountryList(value);
  } else if (!value.length) {
    refs.cardContainer.innerHTML = '';
    console.log(error(`${value.length} matches!`));
  } else {
    console.log(error(`${value.length} matches! і це забагато`));
  }
}