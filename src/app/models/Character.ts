export enum FilterType {
  gender = "gender",
  species = "species",
  origin = "origin",
  name = "name"
}

export interface Filter {
  type: FilterType;
  value: string;
}

export interface Origin {
  name: string;
  url: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female"
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: Gender;
  image: string;
  created: string;
  origin: Origin;
  location: Origin;
}
