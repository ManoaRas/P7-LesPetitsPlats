import { SetAtt } from '../utils/DOMUtil.js';

export class SearchBarView {
  constructor() {
    this.error = 'Aucune recette ne correspond à votre critère... vous pouvez cherchez " tarte aux pommes", "poisson", etc...'

    // DOM elements
    this.searchBar = document.querySelector('.search__header__bar');
  }

  _getLabel() {
    const label = document.createElement('label');
    label.classList.add('search__header__bar--label');
    SetAtt(label, 'for', 'search-bar');
    label.textContent = 'Rechercher une recette, un ingrédient, ...'
    return label
  }

  _getInput() {
    const input = document.createElement('input');
    input.classList.add('search__header__bar--input')
    SetAtt(input, 'type', 'text');
    SetAtt(input, 'id', 'search-bar');
    SetAtt(input, 'placeholder', 'Rechercher une recette, un ingrédient, ...');
    return input;
  }

  _getBtnSearch() {
    const btnSearch = document.createElement('button');
    btnSearch.classList.add('search__header__bar--research');
    SetAtt(btnSearch, 'type', 'submit');

    const iconSearch = document.createElement('i');
    iconSearch.classList.add('fa-solid');
    iconSearch.classList.add('fa-magnifying-glass');

    btnSearch.appendChild(iconSearch);
    return btnSearch;
  }

  displaySearchBar() {
    const searchBar = this.searchBar;
    const label = this._getLabel();
    const input = this._getInput();
    const btnSearch = this._getBtnSearch();

    searchBar.append(label, input, btnSearch);
    return searchBar;
  }
}
