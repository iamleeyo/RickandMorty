import { Character, Filter, FilterType } from "./models/Character";

export class SearchFilter {
  /* Reduce the character array to selected filters */
  public transform(items: any, searchText: Filter[]): any[] {
    if (!items) return [];
    if (!searchText) return items;
    if (searchText.length === 0) return items;
    return this.getCharctersBasedOnFilterLength(items, searchText);
  }

  /* Handles filters length by calling appropriate functions*/
  public getCharctersBasedOnFilterLength(
    arr: any,
    filter: Filter[]
  ): Character[] {
    if (filter.length === 1) {
      return this.getMatchedCharacters(arr, filter[0]);
    }

    return this.getCharctersBasedOnMorethanOneFilters(arr, filter);
  }

  /* Loops through the characters and returns matched characters based on single filters*/
  public getMatchedCharacters(arr: any, filter: Filter): Character[] {
    const output = [];
    arr.forEach(char => {
      if (filter.type === FilterType.name) {
        if (
          char[filter.type].toLowerCase().includes(filter.value.toLowerCase())
        ) {
          output.push(char);
        }
      } else if (filter.type === FilterType.origin) {
        if (
          char[filter.type].name.toLowerCase() === filter.value.toLowerCase()
        ) {
          output.push(char);
        }
      } else {
        if (char[filter.type].toLowerCase() === filter.value.toLowerCase()) {
          output.push(char);
        }
      }
    });
    return output;
  }

  /* Loops through the characters and returns matched characters based on multiple filters*/
  public getCharctersBasedOnMorethanOneFilters(
    arr: Character[],
    filters: Filter[]
  ): Character[] {
    let gender = [];
    let origin = [];
    let species = [];
    let name = [];

    let genType = [];
    let oriType = [];
    let speType = [];
    let nameType = [];

    genType = this.parseSameFilterType(filters, FilterType.gender);
    oriType = this.parseSameFilterType(filters, FilterType.origin);
    speType = this.parseSameFilterType(filters, FilterType.species);
    nameType = this.parseSameFilterType(filters, FilterType.name);

    gender = this.parseCharactersBasedOnFilterTypes(arr, genType);
    origin = this.parseCharactersBasedOnFilterTypes(gender, oriType);
    species = this.parseCharactersBasedOnFilterTypes(origin, speType);
    name = this.parseCharactersBasedOnFilterTypes(species, nameType);

    return name;
  }

  /* Takes array of filters, segregates/groups the filter types*/
  public parseSameFilterType(filters: Filter[], type: FilterType) {
    let output = [];
    filters.forEach(filter => {
      if (filter.type === type) {
        output.push(filter);
      }
    });
    return output;
  }

  /* filters characters based on same filter types*/
  public parseCharactersBasedOnFilterTypes(
    arr: Character[],
    filters: Filter[]
  ) {
    if (filters.length === 0) {
      return arr;
    }

    let output = [];

    filters.forEach(filter => {
      output = this.getMatchedCharacters(arr, filter).concat(output);
    });

    return output;
  }
}
