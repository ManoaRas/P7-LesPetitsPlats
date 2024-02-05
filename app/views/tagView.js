import { RecipeModel } from '../models/recipeModel.js';
import { NormalizeString, LowerCase, SetAtt, UpperFirstCase } from '../utils/DOMUtil.js';


export class TagView {
  constructor(recipes) {
    // DOM Elements
    this.cards = document.querySelector('.cards');
    this.tagsFilter = document.querySelector('.filters');
    this.tagsContainer = document.querySelector('.tags');
    this.currentInput = null;
    this.selectedTags = [];
    this.recipeTags = [];
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
  _filterListItems() {
    const listItems = document.querySelectorAll('.list--item');
    let uniqueIngredients = Array.from(new Set(this.recipeTags));

    listItems.forEach((listItem) => {
      if (uniqueIngredients.includes(listItem.textContent)) {
        listItem.style.display = 'block'; // Show matching items
      } else {
        listItem.style.display = 'none'; // Hide items that don't match
      }
    });
  }

  // CREATE METHODS
  _createList(tags, unorderedList) {
    const handleSelection = (list) => {
      list.style.display = 'none';
      this.selectedTags.push(list.textContent)
      this._createTagContainer();
      this._updateRecipes();
    };

    tags.forEach((tag) => {
      const list = document.createElement('li');
      list.classList.add('list--item');
      SetAtt(list, 'tabindex', '0');
      list.textContent = UpperFirstCase(tag);

      list.addEventListener('click', (event) => {
        event.preventDefault();
        handleSelection(list);
      });
      list.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSelection(list);
        }
      });

      unorderedList.appendChild(list);
    });
  }
  _createTagContainer() {
    // Vide le container avant de le recréer
    this.tagsContainer.innerHTML = '';
    const uniqueSelectedTags = Array.from(new Set(this.selectedTags));
    uniqueSelectedTags.forEach((tag) => {
      const tagBtn = document.createElement('button');
      const tagIcon = document.createElement('i');

      tagBtn.classList.add('tags--button');
      tagIcon.classList.add('fa-solid', 'fa-xmark');

      tagBtn.textContent = UpperFirstCase(tag);

      tagBtn.addEventListener('click', () => {
        this.selectedTags = this.selectedTags.filter((el) => el !== tag);
        this._updateRecipes();
        this._removeTag(tag);
      });

      tagBtn.append(tagIcon);
      this.tagsContainer.appendChild(tagBtn);
    });
  }

  // UPDATE METHODS
  _updateRecipes() {
    // Initialiser recipeTags à une liste vide
    this.recipeTags = [];

    // récupérer les tags sélectionnés
    const selectedTags = this.selectedTags;

    // filtrer les recettes en fonction des tags sélectionnés
    const filteredRecipes = this.recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
      const recipeTags = [...ingredients, recipe.appliance, ...recipe.ustensils];
      return selectedTags.every((tag) => recipeTags.includes(tag));
    });

    // effacer les recettes affichées actuellement
    const cards = document.querySelector('.cards');
    cards.innerHTML = '';

    const numberText = document.querySelector('.filters--number')
    // afficher les recettes filtrées
    if (!filteredRecipes.length) {
      this.cards.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
    } else {
      filteredRecipes.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
        this.recipeTags.push(...recipe.ingredients.map((ingredient) => ingredient.ingredient));
        this.recipeTags.push(recipe.appliance);
        this.recipeTags.push(...recipe.ustensils);
      });
    }
    numberText.textContent = `${filteredRecipes.length} recettes`;
    this._filterListItems();
  }

  // DELETE METHODS
  _removeTag(tagNameToRemove) {
    this.selectedTags = this.selectedTags.filter((tag) => tag !== tagNameToRemove);
    this._createTagContainer();
    this._filterListItems();
  }

  // DEFINE METHODS
  _defineBtnDelete(inputElement, tags) {
    const btnDelete = document.createElement('button');
    const btnDeleteIcon = document.createElement('i');

    btnDelete.classList.add('search-tag--delete')
    btnDeleteIcon.classList.add('fa-solid', 'fa-xmark');

    SetAtt(btnDelete, 'type', 'reset');
    SetAtt(btnDelete, 'aria-label', 'Tag delete button');

    btnDelete.style.visibility = inputElement.value.length > 0 ? 'visible' : 'hidden';
    inputElement.addEventListener('input', () => {
      btnDelete.style.visibility = inputElement.value.length > 0 ? 'visible' : 'hidden';
    });
    btnDelete.addEventListener('click', () => {
      inputElement.value = '';
      btnDelete.style.visibility = 'hidden';
      const labelName = LowerCase(inputElement.getAttribute('id'));
      const filteredTags = tags.filter((tag) => LowerCase(tag).includes(LowerCase(inputElement.value)));
      const unorderedList = document.querySelector(`.${NormalizeString(labelName)}-list`);
      unorderedList.innerHTML = '';
      this._createList(filteredTags, unorderedList);
      this._filterListItems();
    });

    btnDelete.append(btnDeleteIcon);
    return btnDelete;
  }
  _defineBtnSearch() {
    const btnSearch = document.createElement('button');
    const iconSearch = document.createElement('i');

    btnSearch.classList.add('search-tag--research');
    iconSearch.classList.add('fa-solid', 'fa-magnifying-glass');

    SetAtt(btnSearch, 'type', 'submit');
    SetAtt(btnSearch, 'aria-label', 'Tag research button');

    btnSearch.appendChild(iconSearch);
    return btnSearch;
  }
  _defineSearchTag(label, tags) {
    // Constante
    const searchTags = document.createElement('div');
    const inputItem = document.createElement('input');
    const labelName = LowerCase(label);

    // ClassList
    searchTags.classList.add('search-tag');
    inputItem.classList.add('search-tag--input');

    // Set attribute
    SetAtt(inputItem, 'id', `${NormalizeString(labelName)}`)
    SetAtt(inputItem, 'type', 'text');
    SetAtt(inputItem, 'tabindex', '0');

    // Add event listener
    inputItem.addEventListener('input', () => {
      this.currentInput = labelName;
      const filteredTags = tags.filter((tag) => LowerCase(tag).includes(LowerCase(inputItem.value)));
      const unorderedList = document.querySelector(`.${NormalizeString(this.currentInput)}-list`);
      unorderedList.innerHTML = '';
      this._createList(filteredTags, unorderedList);
      this._filterListItems();
    });

    const deleteBtn = this._defineBtnDelete(inputItem, tags);
    const searchBtn = this._defineBtnSearch();
    searchTags.append(inputItem, deleteBtn, searchBtn);
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
