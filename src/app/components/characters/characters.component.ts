import { Component } from "@angular/core";
import { CharactersService } from "../../services/characters.service";
import { Character, Filter, FilterType } from "../../models/Character";
import { SearchFilter } from "../../filter";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.css"]
})
export class CharactersComponent {
  public characters: Character[];
  public filteredCharacters: Character[] = [];
  public searchString = "";
  public filter: SearchFilter = new SearchFilter();
  public selectedFilter: Filter[] = [];

  constructor(private charSrv: CharactersService) {
    this.charSrv.getCharacters().subscribe(result => {
      this.characters = result;
      this.filteredCharacters = result;
    });
    this.charSrv.filters.subscribe(filters => {
      this.selectedFilter = filters;
      this.filteredCharacters = this.filter.transform(
        this.characters,
        this.selectedFilter
      );
    });
  }

  /* sort characters ascending*/
  onAscending() {
    this.filteredCharacters.sort(function(a, b) {
      return a.id - b.id;
    });
  }

  /* sort characters descending*/
  onDescending() {
    this.filteredCharacters.sort(function(a, b) {
      return b.id - a.id;
    });
  }

  /* search character based on user input*/
  onSearch() {
    if (this.searchString !== "") {
      const filterStr: Filter = {
        type: FilterType.name,
        value: this.searchString
      };
      this.selectedFilter.push(filterStr);
      this.filteredCharacters = this.filter.transform(
        this.characters,
        this.selectedFilter
      );
      this.searchString = "";
    }
  }

  /* Resets the filters and search input*/
  onReset() {
    this.charSrv.filters.next([]);
    this.searchString = "";
  }
}
