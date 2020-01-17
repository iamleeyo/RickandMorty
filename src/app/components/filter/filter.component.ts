import { Component, OnInit } from "@angular/core";
import { Filter, FilterType } from "../../models/Character";
import { CharactersService } from "../../services/characters.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  public species: string[] = ["Human", "Alien"];
  public origin: string[] = [
    "Abadango",
    "Earth (Replacement Dimension)",
    "Earth (C-137)",
    "unknown"
  ];
  public gender: string[] = ["Male", "Female"];

  public selectedFilters: Filter[] = [];

  constructor(public chrScv: CharactersService) {
    this.chrScv.filters.subscribe(filter => (this.selectedFilters = filter));
  }

  ngOnInit() {}

  /* Called when selecting the filters */
  onSelect(event, gender: string, type: FilterType) {
    if (event.target.checked) {
      const genderFilter: Filter = {
        value: gender,
        type: type
      };
      this.selectedFilters.push(genderFilter);
    } else {
      this.onDeselect(gender);
    }
    this.chrScv.filters.next(this.selectedFilters);
  }

  /* Called when clearing/Deselecting the filters */
  onDeselect(element: string) {
    for (let i = 0; i < this.selectedFilters.length; i++) {
      if (this.selectedFilters[i]["value"] === element) {
        this.selectedFilters.splice(i, 1);
      }
    }
  }
}
