import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FilterComponent } from "./components/filter/filter.component";
import { CharactersComponent } from "./components/characters/characters.component";
import { CharacterComponent } from "./components/character/character.component";

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    CharactersComponent,
    CharacterComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
