export interface User {
  Name: string;
  Password: number;
  Country: string;
  "Operating Group": string;
  Sector: string;
  Nick: string | null;
  Escope: string;
}

export interface DataUser {
  "Operating Group": string;
  Country: string;
  Sector: string;
}

export interface UserState {
  name: string | null;
  allowedGroups: string[];
  allowedCountries: string[];
  allowedSectors: string[];
  Nick: string | null;
  selectedCountry: string | string[] | null;
  Escope: string[] | null;
  perspective: "country" | "region";
}
