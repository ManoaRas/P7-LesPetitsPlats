import { RecipeModel } from '../models/recipeModel.js';
import { TagModel } from '../models/tagModel.js';
import { LowerCase, SetAtt } from '../utils/DOMUtil.js';

export class SearchBarView {
  constructor(recipes) {
    this.recipes = recipes;

    // DOM elements
    this.searchBar = document.querySelector('.headers__containers__item__bar');
    this.cards = document.querySelector('.cards');
    this.filters = document.querySelector('.filters');
  }

  // UPDATE METHODS
  _updateWithFilteredRecipes(filteredRecipes, inputValue) {
    const recipesNbr = document.querySelector('.filters--number');

    if (!filteredRecipes.length) {
      this.cards.innerHTML = `Aucune recette ne contient '${inputValue}', vous pouvez cherchez « tarte aux pommes », « poisson », etc.`;
      recipesNbr.textContent = '';
    } else if (inputValue.length > 2) {
      this.filters.innerHTML = '';
      this.cards.innerHTML = '';
      recipesNbr.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes' }`;
      const tag = new TagModel(filteredRecipes);
      tag.render();
      filteredRecipes.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
      });
    } else if (inputValue.length < 3) {
      this.cards.innerHTML = '';
      this.filters.innerHTML = '';
      const tag = new TagModel(this.recipes);
      tag.render();
      this.recipes.forEach((recipe) => {
        const card = new RecipeModel(recipe);
        card.render();
      });
    };
  }

  // FILTERS METHODS
  _filterRecipesBySearch(inputValue) {
    const filteredRecipes = [];
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      const { description, ingredients, name } = recipe;

      if (LowerCase(description).indexOf(inputValue) !== -1) {
        filteredRecipes.push(recipe);
      } else {
        let found = false;
        for (let j = 0; j < ingredients.length; j++) {
          if (LowerCase(ingredients[j].ingredient).indexOf(inputValue) !== -1) {
            filteredRecipes.push(recipe);
            found = true;
            break;
          }
        }
        if (found) continue;
        if (LowerCase(name).indexOf(inputValue) !== -1) filteredRecipes.push(recipe);
      }
    }
    this._updateWithFilteredRecipes(filteredRecipes, inputValue);
  }

  // SET METHODS
  _setInput() {
    const input = document.createElement('input');
    input.classList.add('headers__containers__item__bar--input')
    SetAtt(input, 'id', 'search-bar');
    SetAtt(input, 'type', 'text');
    SetAtt(input, 'maxlength', '80');
    SetAtt(input, 'placeholder', 'Rechercher une recette, un ingrédient, ...');

    input.addEventListener('input', () => this._filterRecipesBySearch(LowerCase(input.value)));
    return input;
  }
  _setBtnDelete(inputElement) {
    const btnDelete = document.createElement('button');
    const btnDeleteIcon = document.createElement('i');

    btnDelete.classList.add('headers__containers__item__bar--delete')
    btnDeleteIcon.classList.add('fa-solid', 'fa-xmark');

    SetAtt(btnDelete, 'type', 'reset');
    SetAtt(btnDelete, 'aria-label', 'Searchbar delete button');

    btnDelete.style.visibility = inputElement.value.length > 0 ? 'visible' : 'hidden';
    inputElement.addEventListener('input', () => {
      btnDelete.style.visibility = inputElement.value.length > 0 ? 'visible' : 'hidden';
    });
    btnDelete.addEventListener('click', () => {
      inputElement.value = '';
      btnDelete.style.visibility = 'hidden';
      this._filterRecipesBySearch((inputElement.value));
    });

    btnDelete.append(btnDeleteIcon);
    return btnDelete;
  }
  _setBtnSearch() {
    const btnSearch = document.createElement('button');
    const iconSearch = document.createElement('i');

    btnSearch.classList.add('headers__containers__item__bar--research');
    iconSearch.classList.add('fa-solid', 'fa-magnifying-glass');

    SetAtt(btnSearch, 'type', 'submit');
    SetAtt(btnSearch, 'aria-label', 'Searchbar research button');

    btnSearch.appendChild(iconSearch);
    return btnSearch;
  }

  // GENERALS METHODS
  displaySearchBar() {
    const input = this._setInput();
    const btnDelete = this._setBtnDelete(input);
    const btnSearch = this._setBtnSearch();

    this.searchBar.append(input, btnDelete, btnSearch);
    return this.searchBar;
  }
}
