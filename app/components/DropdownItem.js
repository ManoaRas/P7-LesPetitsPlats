import { SetAtt, normalizeString } from "../utils/domUtil.js";
// import { Tag } from './Tag.js';
// import { filterRecipesByTags } from '../utils/filterRecipesByTag.js';
// import { selectedTags } from '../pages/home.js';

export class DropdownItem {
  constructor(name, tags, recipes) {
    this.name = name;
    this.tags = tags;
    this.currentRecipes = recipes;
    this.selectedTags = tags;
    console.log(name, tags, recipes)
    this.filteredtags = [];
    this.tagList = null;
  }

  // General methods
  _filterNumber(count) {
    const reciperNbr = document.createElement('p');
    reciperNbr.classList.add('recipe-number');
    return reciperNbr.textContent = `${count} recettes`;
  }
  _search(inputValue) {
    const searchTags = !this.filteredtags.length ? this.tags : this.filteredtags;
    const match = searchTags.filter((tag) => normalizeString(tag).includes(inputValue));
    this._updateItems(this.filteredtags, inputValue, match);
  } // Search tags
  _toggleDeleteBtn(inputItem) {
    const deleteBtn = inputItem.nextElementSibling;
    const inputValue = inputItem.value;

    inputValue.length > 0 ? deleteBtn.style.display = 'block' : deleteBtn.style.display = 'none';
    deleteBtn.addEventListener('click', () => {
      inputItem.value = '';
      deleteBtn.style.display = 'none';

      const resetTags = !this.filteredtags.length ? this.tags : this.filteredtags;
      this._updateItems(resetTags, inputValue, null);
    });
  } // Delete tags
  // _addTag(tagText) {
  //   if (!this.selectedTags.includes(tagText)) {
  //     new Tag(tagText).createTag();
  //     this.selectedTags.push(tagText);
  //   };
  //   // filterRecipesByTags(this.currentRecipes, this.selectedTags);
  // } // Add tag
  _tagHandler(inputItem) {
    this.tagList.forEach((tag) => {
      tag.addEventListener('click', () => {
        this._addTag(tag.textContent);
        inputItem.value = '';
      });
      tag.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this._addTag(tag.textContent);
        inputItem.value = '';
      });
    });
  } // AddEventlistener 'click' and 'Enter' actions
  resetItemList() {
    this.tagList.forEach((tag) => tag.style.display = 'block');
  } // Reset item in list

  // Update Dropdown methods
  _updateItems(filteredItems, _inputValue, match) {
    this.filteredtags = filteredItems;
    this.tagList.forEach((tag) => tag.style.display = 'none');

    let tags = match ? match : this.filteredtags;
    tags.forEach((tag) => {
      const tagElement = [...this.tagList].find((item) => normalizeString(item.textContent) === normalizeString(tag));
      if (tagElement) tagElement.style.display = 'block';
    });
  }

  // Set Dropdown methods
  _setDropdownBtn() {
    // Dropdown btn
    const dropdownBtn = document.createElement('button');
    dropdownBtn.classList.add('filter__dropdown--btn');
    SetAtt(dropdownBtn, 'type', 'button');
    dropdownBtn.addEventListener('click', () => null);

    // Dropdown text
    const dropdownBtnText = document.createElement('span');
    dropdownBtnText.textContent = `${this.name}`;

    // Dropdown icon
    const dropdownBtnIcon = document.createElement('i');
    dropdownBtnIcon.classList.add('fa-solid', 'fa-chevron-down');

    dropdownBtnText.appendChild(dropdownBtnIcon);
    return dropdownBtn.appendChild(dropdownBtnText);
  } // Buttons method
  _setDropdownSearch() {
    const dropdownSearch = document.createElement('div');
    dropdownSearch.classList.add('filter__dropdown__content__search');

    // Item input
    const inputItem = document.createElement('input');
    SetAtt(inputItem, 'tabindex', '-1');
    SetAtt(inputItem, 'id', `search-${this.name}`);
    SetAtt(inputItem, 'type', 'text');
    SetAtt(inputItem, 'placeholder', `Recherchez un ${this.name}...`);
    SetAtt(inputItem, 'maxlength', '12');
    inputItem.addEventListener('input', () => {
      this._search(normalizeString(inputItem.value));
      this._toggleDeleteBtn(inputItem);
    });

    // this._tagHandler(inputItem);

    // Item btn
    const btnItem = document.createElement('button');
    SetAtt(btnItem, 'tabindex', '-1');

    // Item label
    const labelItem = document.createElement('label');
    SetAtt(labelItem, 'for', `search-${this.name}`);
    SetAtt(labelItem, 'arial-label', `Search by ${this.name}`);

    console.log(dropdownSearch)

    return dropdownSearch.append(inputItem, btnItem, labelItem);
  } // Search method
  _setDropdownList() {
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('filter__dropdown__content__list');

    this.tags.map((tag) => {
      const list = document.createElement('li');
      list.textContent = tag;
      unorderedList.appendChild(list);
    }).join('');
    return unorderedList;
  } // List method
  setDropdown(count) {
    // Dropdown wrapper
    const filter = document.createElement('div');
    filter.classList.add('filter');
    this.tagList = filter.querySelectorAll('.filter__dropdown__content__list li');

    // Dropdown button
    const filterDropdown = document.createElement('div');
    filterDropdown.classList.add('filter__dropdown');

    // Assemble content
    const assembleContent = document.createElement('div');
    assembleContent.classList.add('filter__dropdown__content');

    // Call methods
    const dropdownBtn = this._setDropdownBtn();
    const dropdownSearch = this._setDropdownSearch();
    const dropdownList = this._setDropdownList();
    const filterNumber = this._filterNumber(count);

    assembleContent.append(dropdownSearch, dropdownList);
    filterDropdown.append(dropdownBtn, assembleContent);
    return filter.appendChild(filterDropdown, filterNumber);
  } // Dropdown method
}
