const countryCodes: { [key: string]: string } = {
  Brazil: "BR",
  Argentina: "AR",
  Chile: "CL",
  "Costa Rica": "CR",
  "Republica Dominicana": "DO",
  Panama: "PA",
  Guatemala: "GT",
  Mexico: "MX",
  "United States of America": "US",
  Canada: "CA",
  "Puerto Rico": "PR",
  "Puerto Rico NA": "PR",
  Colombia: "CO",
  Peru: "PE",
};
export const getCountryCode = (countryName: string): string => {
  return countryCodes[countryName];
};
