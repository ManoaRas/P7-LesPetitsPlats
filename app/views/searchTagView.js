import { SetAtt } from '../utils/DOMUtil.js';

export class SearchTagView {
  constructor() {
    // DOM Elements
    this.searchTagFilter = document.querySelector('.search--filter');
    this.searchTagContainer = document.querySelector('.search--container');
  }

  _getDropdown(label, tags) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('search--filter__dropdown');

    const button = this._getButton(label);
    const searchTag = this._getSearchTags(label);
    const searchTagList = this._getSearchTagsList(tags);

    dropdown.append(button, searchTag, searchTagList);
    return dropdown;
  }

  _getButton(label) {
    const button = document.createElement('button');
    button.classList.add('search--filter__dropdown--btn');
    button.textContent = `${label}s`;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-chevron-down');

    button.append(icon);
    return button;
  }

  _getSearchTags(label) {
    const div = document.createElement('div');
    div.classList.add('search--filter__dropdown--tag');
    SetAtt(div, 'style', 'display: none');

    // Item label + icon
    const divItem = document.createElement('div');
    divItem.textContent = `${label}s`;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-chevron-up');

    divItem.appendChild(icon);

    // Item input
    const inputItem = document.createElement('input');
    SetAtt(inputItem, 'id', `${label.toLowerCase()}`);
    SetAtt(inputItem, 'placeholder', `recherchez un ${label.toLowerCase()}...`);
    inputItem.classList.add('search--filter__dropdown--tag--input');

    div.append(divItem, inputItem);
    return div;
  }

  _getSearchTagsList(tags) {
    const div = document.createElement('div');
    div.classList.add('search--filter__dropdown--list');
    const unorderedList = document.createElement('ul');
    SetAtt(unorderedList, 'style', 'display: none');

    tags.forEach((tag) => {
      const tagList = document.createElement('li');
      tagList.textContent = tag;
      tagList.classList.add('filter-list--item');
      SetAtt(tagList, 'id', `${tag}`);

      unorderedList.appendChild(tagList);
    });

    div.appendChild(unorderedList);
    return div;
  }

  _getIngredients(ingredients) {
    return this._getDropdown('Ingrédient', ingredients);
  }

  _getAppliance(appliance) {
    return this._getDropdown('Appareil', appliance);
  }

  _getUstensils(ustensils) {
    return this._getDropdown('Ustensile', ustensils);
  }

  displaySearchTag(ingredients, appliance, ustensils) {
    const searchTagFilter = this.searchTagFilter;
    const ingredientItems = this._getIngredients(ingredients);
    const applianceItems = this._getAppliance(appliance);
    const ustensilItems = this._getUstensils(ustensils);

    searchTagFilter.append(ingredientItems, applianceItems, ustensilItems);
    return searchTagFilter;
  }
}
