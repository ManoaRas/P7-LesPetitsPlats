import { SetAtt } from '../utils/domUtil.js';

export class SearchTagView {
  constructor() {
    // DOM Elements
    this.tagsFilter = document.querySelector('.tags__filter');
    this.tagsContainer = document.querySelector('.tags__container');
  }

  // GET METHODS
  _getSearchTagsBtn(label) {
    const searchTags = document.createElement('div');
    searchTags.classList.add('tags__filter__container__dropdown__tag__div');
    const labelName = label.toLowerCase();

    // Item label
    const labelItem = document.createElement('label');
    SetAtt(labelItem, 'for', `${labelName}`);
    labelItem.classList.add('tags__filter__container__dropdown__tag__div--label');
    labelItem.textContent = `recherchez un ${labelName}...`;

    // Item input
    const inputItem = document.createElement('input');
    SetAtt(inputItem, 'id', `${labelName}`);
    SetAtt(inputItem, 'type', 'text');
    SetAtt(inputItem, 'placeholder', `recherchez un ${labelName}...`);
    inputItem.classList.add('tags__filter__container__dropdown__tag__div--input');

    // Item btnIcon
    const btnIconItem = document.createElement('button');
    SetAtt(btnIconItem, 'type', 'submit');
    btnIconItem.classList.add('tags__filter__container__dropdown__tag__div--research');
    const iconSearch = document.createElement('i');
    iconSearch.classList.add('fa-solid');
    iconSearch.classList.add('fa-magnifying-glass');

    btnIconItem.appendChild(iconSearch);
    searchTags.append(labelItem, inputItem, btnIconItem)
    return searchTags;
  }
  _getSearchTagsList(tags) {
    const searchTagsList = document.createElement('div');
    searchTagsList.classList.add('tags__filter__container__dropdown__tag--btn__list');

    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('tags__filter__container__dropdown__tag--btn__list--item');
    tags.forEach((tag) => {
      const tagList = document.createElement('li');
      tagList.textContent = tag.charAt(0).toUpperCase() + tag.slice(1); // toUpperCase()
      tagList.classList.add('filter-list--item');
      SetAtt(tagList, 'id', `${tag}`);
      unorderedList.appendChild(tagList);
    });
    searchTagsList.appendChild(unorderedList);
    return searchTagsList;
  }
  _getRecipeNumber(count) {
    const recipeNumber = document.createElement('h2')
    recipeNumber.classList.add('tags__filter--number')
    recipeNumber.textContent = `${count} recettes`;
    return recipeNumber
  }

  // SET METHODS
  _setToggleDropdown(label) {
    let btnId = '';
    let listId = '';

    if (label === 'Ingrédient') {
      btnId = document.getElementById('ingredient-btn');
      listId = document.getElementById('ingredient-list');
    } else if (label === 'Appareil') {
      btnId = document.getElementById('appliance-btn');
      listId = document.getElementById('appliance-list');
    } else if (label === 'Ustensile') {
      btnId = document.getElementById('ustensil-btn');
      listId = document.getElementById('ustensil-list');
    }

    if (btnId.style.display === 'block') {
      btnId.style.display = 'none';
      listId.style.display = 'block';
    } else if (listId.style.display === 'block') {
      btnId.style.display = 'block';
      listId.style.display = 'none';
    }
  }
  _setListTags(label, tags) {
    let listId = '';
    let btnId = '';
    if (label === 'Ingrédient') {
      listId = 'ingredient-list';
      btnId = 'ingredient-list-btn';
    } else if (label === 'Appareil') {
      listId = 'appliance-list';
      btnId = 'appliance-list-btn';
    } else if (label === 'Ustensile') {
      listId = 'ustensil-list';
      btnId = 'ustensil-list-btn';
    }

    const dropdownTag = document.createElement('div');
    SetAtt(dropdownTag, 'id', listId);
    dropdownTag.classList.add('tags__filter__container__dropdown__tag');
    dropdownTag.style.display = 'none';

    // Item label + icon
    const button = document.createElement('button');
    SetAtt(button, 'id', btnId);
    button.classList.add(`tags__filter__container__dropdown__tag--btn`);
    button.addEventListener('click', () => this._setToggleDropdown(label));

    const span = document.createElement('span');
    span.classList.add('tags__filter__container__dropdown__tag--btn--item');
    span.textContent = `${label}s`;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-chevron-up');

    span.appendChild(icon);
    button.appendChild(span);

    const searchTagsBtn = this._getSearchTagsBtn(label); // Item label + input + btnIcon
    const searchTagsList = this._getSearchTagsList(tags); // Item tags list

    dropdownTag.append(button, searchTagsBtn, searchTagsList);
    return dropdownTag;
  }
  _setDropdown(label, tags) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('tags__filter__container__dropdown');

    let btnId = '';
    if (label === 'Ingrédient') {
    btnId = 'ingredient-btn';
    } else if (label === 'Appareil') {
      btnId = 'appliance-btn';
    } else if (label === 'Ustensile') {
      btnId = 'ustensil-btn';
    }

    const button = document.createElement('button');
    SetAtt(button, 'id', btnId);
    button.classList.add('tags__filter__container__dropdown--btn');
    button.addEventListener('click', () => this._setToggleDropdown(label));
    button.style.display = 'block';

    const span = document.createElement('span');
    span.classList.add('tags__filter__container__dropdown__tag--btn--item');
    span.textContent = `${label}s`;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-chevron-down');

    span.appendChild(icon);
    button.appendChild(span);

    const searchTag = this._setListTags(label, tags);

    dropdown.append(button, searchTag);
    return dropdown;
  }

  displaySearchTag(ingredients, appliance, ustensils, count) {
    // Container dropdown tags filter
    const tagsFilterContainer = document.createElement('div');
    tagsFilterContainer.classList.add('tags__filter__container');

    // Dropdown tags filter
    const ingredientItems = this._setDropdown('Ingrédient', ingredients);
    const applianceItems = this._setDropdown('Appareil', appliance);
    const ustensilItems = this._setDropdown('Ustensile', ustensils);

    // Recipe Number
    const recipeNumber = this._getRecipeNumber(count);

    // Append methods
    tagsFilterContainer.append(ingredientItems, applianceItems, ustensilItems);
    this.tagsFilter.append(tagsFilterContainer, recipeNumber);
    return this.tagsFilter;
  }
}
