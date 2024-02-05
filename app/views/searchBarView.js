import { SetAtt } from '../utils/DOMUtil.js';

export class SearchBarView {
  constructor() {
    this.error = 'Aucune recette ne correspond à votre critère... vous pouvez cherchez " tarte aux pommes", "poisson", etc...'

    // DOM elements
    this.searchBar = document.querySelector('.headers__container__bar');
  }

  _setLabel() {
    const label = document.createElement('label');
    label.classList.add('headers__container__bar--label');
    SetAtt(label, 'for', 'search-bar');
    label.textContent = 'Rechercher une recette, un ingrédient, ...'
    return label
  }

  _setInput() {
    const input = document.createElement('input');
    input.classList.add('headers__container__bar--input')
    SetAtt(input, 'id', 'search-bar');
    SetAtt(input, 'type', 'text');
    SetAtt(input, 'maxlength', '80');
    SetAtt(input, 'placeholder', 'Rechercher une recette, un ingrédient, ...');
    return input;
  }

  _setBtnDelete() {
    const btnDelete = document.createElement('button');
    const btnDeleteIcon = document.createElement('i');

    btnDelete.classList.add('headers__container__bar--delete')
    btnDeleteIcon.classList.add('fa-solid', 'fa-xmark');

    SetAtt(btnDelete, 'type', 'reset');
    SetAtt(btnDelete, 'aria-label', 'Searchbar button delete');

    btnDelete.append(btnDeleteIcon);
    return btnDelete;
  }

  _setBtnSearch() {
    const btnSearch = document.createElement('button');
    const iconSearch = document.createElement('i');

    btnSearch.classList.add('headers__container__bar--research');
    iconSearch.classList.add('fa-solid');
    iconSearch.classList.add('fa-magnifying-glass');

    SetAtt(btnSearch, 'type', 'submit');
    SetAtt(btnSearch, 'aria-label', 'Searchbar button research');

    btnSearch.appendChild(iconSearch);
    return btnSearch;
  }

  displaySearchBar() {
    const searchBar = this.searchBar;
    const label = this._setLabel();
    const input = this._setInput();
    const btnDelete = this._setBtnDelete();
    const btnSearch = this._setBtnSearch();

    searchBar.append(label, input, btnDelete, btnSearch);
    return searchBar;
  }
}
