import { SetAtt } from '../utils/DOMUtil.js';

export class SearchBarView {
  constructor() {
    this.error = 'Aucune recette ne correspond à votre critère... vous pouvez cherchez " tarte aux pommes", "poisson", etc...'

    // DOM elements
    this.searchBar = document.querySelector('.search--bar');
  }

  _getInput() {
    const input = document.createElement('input');
    SetAtt(input, 'type', 'text');
    SetAtt(input, 'id', 'search--bar--input');
    SetAtt(input, 'placeholder', 'Rechercher une recette, un ingrédient, ...');
    return input;
  }

  _getBtnSearch() {
    const btnSearch = document.createElement('button');
    btnSearch.classList.add('search--bar--btn__research');
    SetAtt(btnSearch, 'type', 'submit');

    const iconSearch = document.createElement('i');
    iconSearch.classList.add('fa-solid');
    iconSearch.classList.add('fa-magnifying-glass');

    btnSearch.appendChild(iconSearch);
    return btnSearch;
  }

  displaySearchBar() {
    const searchBar = this.searchBar;
    const input = this._getInput();
    const btnSearch = this._getBtnSearch();

    searchBar.append(input, btnSearch);
    return searchBar;
  }
}
