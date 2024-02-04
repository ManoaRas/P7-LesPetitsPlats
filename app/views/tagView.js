import { NormalizeString, LowerCase, SetAtt, UpperFirstCase } from '../utils/domUtil.js';

export class TagView {
  constructor() {
    // DOM Elements
    this.tagsFilter = document.querySelector('.filters');
    this.tagsContainer = document.querySelector('.tags');
    this.currentInput = null;
  }

  // GENERAL METHODS
  _toggleDropdown(btn, isOpen) {
    const rotateClass = isOpen ? 'rotate' : '';
    btn.querySelector('.fa-chevron-down').classList.toggle('rotate', rotateClass);
    btn.classList.toggle('active-btn', isOpen);
    btn.nextElementSibling.classList.toggle('active-tag', isOpen);
  }
  _closeAllDropdowns(dropdownBtns) {
    dropdownBtns.forEach((btn) => this._toggleDropdown(btn, false));
  }

  // DEFINE METHODS
  _defineSearchTag(label, tags) {
    // Constante
    const searchTags = document.createElement('div');
    const inputItem = document.createElement('input');
    const btnDelItem = document.createElement('button');
    const btnSearchItem = document.createElement('button');
    const iconDel = document.createElement('i');
    const iconSearch = document.createElement('i');
    const labelName = LowerCase(label);

    // ClassList
    searchTags.classList.add('search-tag');
    inputItem.classList.add('search-tag--input');
    btnDelItem.classList.add('search-tag--delete');
    btnSearchItem.classList.add('search-tag--research');
    iconDel.classList.add('fa-solid', 'fa-xmark');
    iconSearch.classList.add('fa-solid', 'fa-magnifying-glass');

    // Set attribute
    SetAtt(inputItem, 'id', `${NormalizeString(labelName)}`)
    SetAtt(inputItem, 'type', 'text');
    SetAtt(inputItem, 'tabindex', '0');
    SetAtt(btnDelItem, 'tabindex', '0');
    SetAtt(btnSearchItem, 'tabindex', '0');

    // Add event listener
    inputItem.addEventListener('input', () => {
      this.currentInput = LowerCase(label);
      const filteredTags = tags.filter((tag) => LowerCase(tag).includes(LowerCase(inputItem.value)));
      const tagList = document.querySelector(`.${NormalizeString(this.currentInput)}-list`);
      tagList.innerHTML = '';

      filteredTags.forEach((tag) => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('list--item');
        tagItem.textContent = UpperFirstCase(tag);
        SetAtt(tagItem, 'tabindex', '0');
        tagItem.addEventListener('click', (event) => {
          event.preventDefault();
          event.target.style.display = 'none';
        });
        tagList.appendChild(tagItem);
      });
    });

    btnDelItem.appendChild(iconDel);
    btnSearchItem.appendChild(iconSearch);
    searchTags.append(inputItem, btnDelItem, btnSearchItem);
    return searchTags;
  }
  _defineTagsList(label, tags) {
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('list', `${NormalizeString(label)}-list`);

    tags.forEach((tag) => {
      const tagList = document.createElement('li');
      tagList.classList.add('list--item');
      tagList.textContent = UpperFirstCase(tag);
      SetAtt(tagList, 'tabindex', '0');
      tagList.addEventListener('click', (event) => {
        event.preventDefault();
        event.target.style.display = 'none';
      });
      unorderedList.appendChild(tagList);
    });
    return unorderedList;
  }
  _defineRecipeNumber(count) {
    const recipeNumber = document.createElement('h2')
    recipeNumber.classList.add('filters--number')
    recipeNumber.textContent = `${count} recettes`;
    return recipeNumber;
  }

  // SET METHODS
  _setSearchTag(label, tags) {
    const dropdownTag = document.createElement('div');
    const searchTags = this._defineSearchTag(label, tags); // Item input + btnIcon
    const tagsList = this._defineTagsList(label, tags); // Tags lists

    dropdownTag.classList.add('dropdown--items');
    dropdownTag.append(searchTags, tagsList);
    return dropdownTag;
  }
  _setDropdown(label, tags) {
    // Create element
    const dropdown = document.createElement('div');
    const dropdownBtn = document.createElement('button');
    const dropdownSpan = document.createElement('span');
    const dropdownIcon = document.createElement('i');

    // Add classList
    dropdown.classList.add('dropdown');
    dropdownBtn.classList.add('dropdown--btn');
    dropdownIcon.classList.add('fa-solid', 'fa-chevron-down');

    // Add event listener
    dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const isDropdownOpen = dropdownBtn.classList.contains('active-btn');
      this._closeAllDropdowns(document.querySelectorAll('.dropdown--btn'));
      this._toggleDropdown(dropdownBtn, !isDropdownOpen);
    });

    // Add text content
    dropdownSpan.textContent = `${label}s`;

    dropdownBtn.append(dropdownSpan, dropdownIcon);
    dropdown.append(dropdownBtn, this._setSearchTag(label, tags));
    return dropdown;
  }

  displaySearchTag(tags, count) {
    // Container dropdown tags filter
    const tagsFilterContainer = document.createElement('div');
    tagsFilterContainer.classList.add('filters__wrapper');

    // Call methods
    const ingredientItems = this._setDropdown('Ingrédient', tags.ingredients);
    const applianceItems = this._setDropdown('Appareil', tags.appliances);
    const ustensilItems = this._setDropdown('Ustensile', tags.ustensils);
    const recipeNumber = this._defineRecipeNumber(count);

    tagsFilterContainer.append(ingredientItems, applianceItems, ustensilItems);
    this.tagsFilter.append(tagsFilterContainer, recipeNumber);
    return this.tagsFilter;
  }
}
