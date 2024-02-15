import { RecipeModel } from '../models/recipeModel.js';
import { NormalizeString, LowerCase, SetAtt, UpperFirstCase } from '../utils/DOMUtil.js';


export class TagView {
  constructor(recipes) {
    // DOM Elements
    this.cards = document.querySelector('.cards');
    this.tagsFilter = document.querySelector('.filters');
    this.tagsContainer = document.querySelector('.tags');

    // Array Elements
    this.selectedTags = [];
    this.recipeTags = [];
    this.visibleItems = [];

    // Recipes data
    this.recipes = recipes;
  }

  // OPEN / CLOSE METHODS
  _toggleDropdown(btn, isOpen) {
    const rotateClass = isOpen ? 'rotate' : '';
    btn.querySelector('.fa-chevron-down').classList.toggle('rotate', rotateClass);
    btn.classList.toggle('active-btn', isOpen);
    btn.nextElementSibling.classList.toggle('active-tag', isOpen);
  }
  _closeDropdown() {
    const dropdownBtn = document.querySelector('.dropdown--btn');
    this._toggleDropdown(dropdownBtn, false);
    this._resetSearchInput();
  }
  _closeAllDropdowns(dropdownBtns) {
    dropdownBtns.forEach((btn) => this._toggleDropdown(btn, false));
    this._resetSearchInput();
  }

  // FILTERS METHODS
  _filterListDisplay() {
    const newRecipes = [];
    const listItems = document.querySelectorAll('.list--item');

    const { appliances, ingredients, ustensils } = this.recipeTags.reduce((acc, tags) => {
      acc.appliances.push(...tags.appliances);
      acc.ingredients.push(...tags.ingredients);
      acc.ustensils.push(...tags.ustensils);
      return acc;
    }, { appliances: [], ingredients: [], ustensils: [] });

    const uniqueAppliances = Array.from(new Set(appliances)).sort();
    const uniqueIngredients = Array.from(new Set(ingredients)).sort();
    const uniqueUstensils = Array.from(new Set(ustensils)).sort();

    newRecipes.push({
      appliances: uniqueAppliances,
      ingredients: uniqueIngredients,
      ustensils: uniqueUstensils,
    });
    const newRecipesTags = newRecipes[0];

    listItems.forEach((listItem) => {
      const listItemText = listItem.textContent;
      const includeAppliance = newRecipesTags.appliances.includes(listItemText);
      const includeIngredient = newRecipesTags.ingredients.includes(listItemText);
      const includeUstensil = newRecipesTags.ustensils.includes(listItemText);
      if (includeAppliance || includeIngredient || includeUstensil) {
        listItem.classList.remove('disabled');
        this.visibleItems.push(listItem);
      } else {
        listItem.classList.add('disabled');
      }
    });
  }

  // CREATE METHODS
  _createTagContainer() {
    // Empty the container before recreating it
    this.tagsContainer.innerHTML = '';
    Array.from(new Set(this.selectedTags)).forEach((tag) => {
      const tagBtn = document.createElement('button');
      tagBtn.classList.add('tags--button');
      tagBtn.textContent = UpperFirstCase(tag);
      tagBtn.addEventListener('click', () => {
        this.selectedTags = this.selectedTags.filter((selectTag) => selectTag !== tag);
        this._updateRecipes();
        this._filterListDisplay();
        this._createTagContainer();
      });

      const tagIcon = document.createElement('i');
      tagIcon.classList.add('fa-solid', 'fa-xmark');

      tagBtn.append(tagIcon);
      this.tagsContainer.appendChild(tagBtn);
    });
  }

  // UPDATE METHODS
  _updateRecipes() {
    // Set recipeTags to an empty list
    this.recipeTags = [];

    // Filter recipes by selected tags
    const filteredRecipes = this.recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient);
      const recipeTags = [...ingredients, ...recipe.appliances, ...recipe.ustensils];
      return this.selectedTags.every((tag) => recipeTags.includes(tag));
    });

    this.cards.innerHTML = '';
    // Display filtered recipes
    if (!filteredRecipes.length) {
      this.cards.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
    } else {
      filteredRecipes.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
        this.recipeTags.push({
          ingredients: recipe.ingredients.map((ingredient) => ingredient.ingredient),
          appliances: recipe.appliances,
          ustensils: recipe.ustensils
        });
      });
    }

    // Update the number of recipes displayed
    const numberText = document.querySelector('.filters--number')
    numberText.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;
  }

  // RESET METHODS
  _resetSearchInput() {
    const inputItem = document.querySelector('.search-tag--input');
    const deleteBtn = document.querySelector('.search-tag--delete');
    inputItem.value = '';
    deleteBtn.style.visibility = 'hidden';
  }

  // SET METHODS
  _setDeleteBtn(inputElement) {
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
      let allTags = [];
      const isOpen = document.querySelector(`.${labelName}-list`);
      let categoryList;
      if (isOpen.classList.contains('appliance-list')) {
        categoryList = 'appliances';
      } else if (isOpen.classList.contains('ingredient-list')) {
        categoryList = 'ingredients';
      } else if (isOpen.classList.contains('ustensil-list')) {
        categoryList = 'ustensils';
      }
      this.recipeTags.filter((tags) => tags[categoryList].filter((tag) => allTags.push(tag)));
      const items = Array.from(new Set(allTags)).sort();
      items.filter(() => {
        if (this.visibleItems.length > 0) {
          this.visibleItems.filter((list) => {
            list.classList.remove('disabled');
          })
        } else {
          const listItems = document.querySelectorAll(`.${labelName}-list .list--item`);
          listItems.forEach((list) => {
            list.classList.remove('disabled');
          });
        }
      });
    });

    btnDelete.append(btnDeleteIcon);
    return btnDelete;
  }
  _setSearchBtn() {
    const btnSearch = document.createElement('button');
    const iconSearch = document.createElement('i');

    btnSearch.classList.add('search-tag--research');
    iconSearch.classList.add('fa-solid', 'fa-magnifying-glass');

    SetAtt(btnSearch, 'type', 'submit');
    SetAtt(btnSearch, 'aria-label', 'Tag research button');

    btnSearch.appendChild(iconSearch);
    return btnSearch;
  }
  _setInputTagsSearch(label) {
    // Constante
    const searchTags = document.createElement('div');
    const inputItem = document.createElement('input');
    const labelName = NormalizeString(label);

    // ClassList
    searchTags.classList.add('search-tag');
    inputItem.classList.add('search-tag--input');

    // Set attribute
    SetAtt(inputItem, 'id', `${labelName}`)
    SetAtt(inputItem, 'type', 'text');
    SetAtt(inputItem, 'tabindex', '0');

    // Adds a listener to the input to filter elements
    inputItem.addEventListener('input', () => {
      this._updateRecipes()

      const searchValue = LowerCase(inputItem.value);
      let allTags = [];
      const isOpen = document.querySelector(`.${labelName}-list`);
      let categoryList;
      if (isOpen.classList.contains('appliance-list')) {
        categoryList = 'appliances';
      } else if (isOpen.classList.contains('ingredient-list')) {
        categoryList = 'ingredients';
      } else if (isOpen.classList.contains('ustensil-list')) {
        categoryList = 'ustensils';
      }
      this.recipeTags.filter((tags) => tags[categoryList].filter((tag) => allTags.push(tag)));
      const items = Array.from(new Set(allTags)).sort();
      items.filter((item) => {
        function filterList(list) {
          if (item === list.textContent) {
            if (LowerCase(item).includes(searchValue)) {
              list.classList.remove('disabled');
            } else {
              list.classList.add('disabled');
            }
          }
        }
        if (this.visibleItems.length > 0) {
          this.visibleItems.filter((list) => {
            filterList(list);
          })
        } else {
          const listItems = document.querySelectorAll(`.${labelName}-list .list--item`);
          listItems.forEach((list) => {
            filterList(list);
          });
        }
      });
    });

    const deleteBtn = this._setDeleteBtn(inputItem);
    const searchBtn = this._setSearchBtn();
    searchTags.append(inputItem, deleteBtn, searchBtn);
    return searchTags;
  }
  _setTagsList(label, tags) {
    const unorderedList = document.createElement('ul');
    unorderedList.classList.add('list', `${NormalizeString(label)}-list`);

    const handleSelection = (list) => {
      this.selectedTags.push(list.textContent)
      this._createTagContainer();
      this._updateRecipes();
      this._filterListDisplay();
      this._closeDropdown();
    };

    tags.forEach((tag) => {
      const list = document.createElement('li');
      list.classList.add('list--item');
      SetAtt(list, 'tabindex', '0');
      list.textContent = tag;

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
    return unorderedList;
  }
  _setTagsSearch(label, tags) {
    const dropdownTag = document.createElement('div');
    const searchTags = this._setInputTagsSearch(label); // Item input + btnIcon
    const tagsList = this._setTagsList(label, tags); // Tags lists

    dropdownTag.classList.add('dropdown--items');
    dropdownTag.append(searchTags, tagsList);
    return dropdownTag;
  }
  _setTagBtn(label) {
    // Create element
    const dropdownBtn = document.createElement('button');
    const dropdownSpan = document.createElement('span');
    const dropdownIcon = document.createElement('i');

    // Add classList
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
    if (label === 'Appliance') {
      label = 'Appareils';
    } else if (label === 'Ingredient') {
      label = 'Ingrédients';
    } else {
      label = 'Ustensiles';
    }
    dropdownSpan.textContent = label;

    dropdownBtn.append(dropdownSpan, dropdownIcon);
    return dropdownBtn;
  }

  // GENERAL METHODS
  _dropdownTags(label, tags) {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    dropdown.append(this._setTagBtn(label), this._setTagsSearch(label, tags));
    return dropdown;
  }
  displaySearchTag(tags, count) {
    // Recipe Number methods
    const recipeNumber = document.createElement('h2')
    recipeNumber.classList.add('filters--number')
    recipeNumber.textContent = `${count} recettes`;

    // Container dropdown tags filter
    const tagsFilterContainer = document.createElement('div');
    tagsFilterContainer.classList.add('filters__wrapper');

    // Call methods
    const applianceItems = this._dropdownTags('Appliance', tags.appliances);
    const ingredientItems = this._dropdownTags('Ingredient', tags.ingredients);
    const ustensilItems = this._dropdownTags('Ustensil', tags.ustensils);

    tagsFilterContainer.append(ingredientItems, applianceItems, ustensilItems);
    this.tagsFilter.append(tagsFilterContainer, recipeNumber);
    return this.tagsFilter, this.tagsContainer;
  }
}
