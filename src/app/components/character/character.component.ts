import { Component, OnInit, Input } from "@angular/core";
import { Character } from "../../models/Character";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.css"]
})
export class CharacterComponent implements OnInit {
  @Input() character: Character;

  constructor() {}

  /* Calculates characters's created time and returns in years */
  public get showCreatedTime(): string {
    const D = new Date();
    const lastSeen = new Date(this.character.created);

    return `created ${D.getFullYear() - lastSeen.getFullYear()} years ago`;
  }

  ngOnInit() {}
}
