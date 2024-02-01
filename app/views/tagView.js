import { SetAtt } from '../utils/domUtil.js';

export class TagView {
  constructor() {
    // DOM Elements
    this.tagsFilter = document.querySelector('.filters');
    this.tagsContainer = document.querySelector('.tags');
    this.itemList = null;
  }

  // GET METHODS
  _getSearchTagsBtn(label) {
    const searchTags = document.createElement('div');
    searchTags.classList.add('dropdown__tag__div');
    const labelName = label.toLowerCase();

    // Item input
    const inputItem = document.createElement('input');
    SetAtt(inputItem, 'id', `${labelName}`)
    SetAtt(inputItem, 'type', 'text');
    SetAtt(inputItem, 'tabindex', 0);
    SetAtt(inputItem, 'placeholder', `recherchez un ${labelName}...`);
    inputItem.classList.add('dropdown__tag__div--input');

    // Item btnIcon
    const btnIconItem = document.createElement('button');
    SetAtt(btnIconItem, 'tabindex', 0);
    btnIconItem.classList.add('dropdown__tag__div--research');

    // Item icon
    const iconSearch = document.createElement('i');
    iconSearch.classList.add('fa-solid');
    iconSearch.classList.add('fa-magnifying-glass');

    btnIconItem.appendChild(iconSearch);
    searchTags.append(inputItem, btnIconItem)
    return searchTags;
  }
  _getSearchTagsList(tags) {
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('dropdown__tag--btn__list');

    tags.forEach((tag) => {
      const tagList = document.createElement('li');
      tagList.textContent = tag.charAt(0).toUpperCase() + tag.slice(1); // toUpperCase()
      tagList.classList.add('filter-list--item');
      SetAtt(tagList, 'tabindex', 0);
      unorderedList.appendChild(tagList);
    });
    return unorderedList;
  }
  _getRecipeNumber(count) {
    const recipeNumber = document.createElement('h2')
    recipeNumber.classList.add('filters--number')
    recipeNumber.textContent = `${count} recettes`;
    return recipeNumber
  }

  // SET METHODS
  _toggleDropdown(label) {
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
    const dropdownTag = document.createElement('div');
    dropdownTag.classList.add('dropdown__tag');
    dropdownTag.style.display = 'none';

    // Item btn + icon
    const button = document.createElement('button');
    button.classList.add(`dropdown__tag--btn`);
    button.addEventListener('click', () => this._toggleDropdown(label));

    const span = document.createElement('span');
    span.classList.add('dropdown--btn--item');
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
    dropdown.classList.add('dropdown');

    const button = document.createElement('button');
    button.classList.add('dropdown--btn');
    button.addEventListener('click', () => this._toggleDropdown(label));
    button.style.display = 'block';

    const span = document.createElement('span');
    span.classList.add('dropdown--btn--item');
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
    tagsFilterContainer.classList.add('filter__wrapper');

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
