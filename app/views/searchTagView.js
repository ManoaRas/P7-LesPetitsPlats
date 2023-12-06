import { SetAtt } from '../utils/DOMUtil.js';

export class SearchTagView {
  constructor() {
    // DOM Elements
    this.tagsFilter = document.querySelector('.tags__filter');
    this.tagsContainer = document.querySelector('.tags__container');
  }

  _getButton(label) {
    const button = document.createElement('button');
    button.classList.add('tags__filter__container__dropdown--btn');
    button.textContent = `${label}s`;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-chevron-down');

    button.append(icon);
    return button;
  }

  _getSearchTags(label) {
    const div = document.createElement('div');
    div.classList.add('tags__filter__container__dropdown--tag');
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
    inputItem.classList.add('tags__filter__container__dropdown--tag--input');

    div.append(divItem, inputItem);
    return div;
  }

  _getSearchTagsList(tags) {
    const div = document.createElement('div');
    div.classList.add('tags__filter__container__dropdown--list');
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

  _getDropdown(label, tags) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('tags__filter__container__dropdown');

    const button = this._getButton(label);
    const searchTag = this._getSearchTags(label);
    const searchTagList = this._getSearchTagsList(tags);

    dropdown.append(button, searchTag, searchTagList);
    return dropdown;
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

  _getRecipeNumber(count) {
    const recipeNumber = document.createElement('h2')
    recipeNumber.classList.add('tags__filter--number')
    recipeNumber.textContent = `${count} recettes`;
    return recipeNumber
  }

  displaySearchTag(ingredients, appliance, ustensils, count) {
    const tagsFilter = this.tagsFilter;

    // Container dropdown tags filter
    const tagsFilterContainer = document.createElement('div');
    tagsFilterContainer.classList.add('tags__filter__container');

    // Dropdown tags filter
    const ingredientItems = this._getIngredients(ingredients);
    const applianceItems = this._getAppliance(appliance);
    const ustensilItems = this._getUstensils(ustensils);

    // Recipe Number
    const recipeNumber = this._getRecipeNumber(count);

    // Append methods
    tagsFilterContainer.append(ingredientItems, applianceItems, ustensilItems);
    tagsFilter.append(tagsFilterContainer, recipeNumber);

    return tagsFilter;
  }
}
