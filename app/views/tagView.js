import { RecipeModel } from '../models/recipeModel.js';
import { NormalizeString, LowerCase, SetAtt, UpperFirstCase } from '../utils/domUtil.js';

export class TagView {
  constructor(recipes) {
    // DOM Elements
    this.tagsFilter = document.querySelector('.filters');
    this.tagsContainer = document.querySelector('.tags');
    this.currentInput = null;
    this.selectedTags = [];
    this.recipes = recipes;
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

  // CREATE METHODS
  _createList(tags, unorderedList) {
    tags.forEach((tag) => {
      const list = document.createElement('li');
      list.classList.add('list--item');
      SetAtt(list, 'tabindex', '0');
      list.textContent = UpperFirstCase(tag);
      list.addEventListener('click', (event) => {
        event.preventDefault();
        event.target.style.display = 'none';
        this.selectedTags.push(event.target.textContent)
        this._createTagContainer();
        this._updateRecipes();
      });
      unorderedList.appendChild(list);
    });
  }
  _createTagContainer() {
    // Vide le container avant de le recréer
    this.tagsContainer.innerHTML = '';
    this.selectedTags.forEach((tag) => {
      const tagBtn = document.createElement('button');
      const tagIcon = document.createElement('i');

      tagBtn.classList.add('tags--button');
      tagIcon.classList.add('fa-solid', 'fa-xmark');

      tagBtn.textContent = UpperFirstCase(tag);

      tagBtn.addEventListener('click', () => {
        const selectedTags = tag;
        this.selectedTags = this.selectedTags.filter((el) => el !== selectedTags);
        this._updateRecipes();
        this._removeTag(tag);
      });

      tagBtn.append(tagIcon);
      this.tagsContainer.appendChild(tagBtn);
    });
  }
  _updateRecipes() {
    // récupérer les tags sélectionnés
    const selectedTags = this.selectedTags;

    // filtrer les recettes en fonction des tags sélectionnés
    const filteredRecipes = this.recipes.filter((recipe) => {
      const recipeTags = [recipe.appliance, ...recipe.ingredients.map(ingredient => ingredient.ingredient), ...recipe.ustensils];
      return selectedTags.every(tag => recipeTags.includes(tag));
    });

    // effacer les recettes affichées actuellement
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';

    // afficher les recettes filtrées
    filteredRecipes.forEach(recipe => {
      const card = new RecipeModel(recipe);
      card.render();
    });
  }
  _removeTag(tagNameToRemove) {
    this.selectedTags = this.selectedTags.filter((tag) => tag !== tagNameToRemove);
    this._createTagContainer();
    document.querySelectorAll('.list--item').forEach((list) => {
      if (list.textContent === UpperFirstCase(tagNameToRemove)) list.style.display = 'block';
    });
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
      const unorderedList = document.querySelector(`.${NormalizeString(this.currentInput)}-list`);
      unorderedList.innerHTML = '';
      this._createList(filteredTags, unorderedList);
    });

    btnDelItem.appendChild(iconDel);
    btnSearchItem.appendChild(iconSearch);
    searchTags.append(inputItem, btnDelItem, btnSearchItem);
    return searchTags;
  }
  _defineTagsList(label, tags) {
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('list', `${NormalizeString(label)}-list`);
    this._createList(tags, unorderedList);
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
    return this.tagsFilter, this._createTagContainer();
  }
}
