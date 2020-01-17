import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Character, Filter } from "../models/Character";

@Injectable({
  providedIn: "root"
})
export class CharactersService {
  public filters: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);
  private url: string = "http://rickandmortyapi.com/api/character/";

  constructor(private http: HttpClient) {}

  /* Fetches characters info using Rest Api */
  public getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.url).pipe(
      map(response => {
        return response["results"];
      }),
      catchError(error => {
        console.log("Error on fetching characters");
        return [];
      })
    );
  }
}
