const countryCodes: { [key: string]: string } = {
  Brazil: "BR",
  Argentina: "AR",
  Chile: "CL",
  "Costa Rica": "CR",
  "Dominican Republic": "DO",
  Panama: "PA",
  Guatemala: "GT",
  Mexico: "MX",
  "United States of America": "US",
  Canada: "CA",
  "Puerto Rico": "PR",
  "Puerto Rico NA": "PR",
  Colombia: "CO",
  Peru: "PE",
  Ecuador: "EC",
  Uruguay: "UY",
  Venezuela: "VE",
};

export const getCountryCode = (countryName: string): string => {
  const code = countryCodes[countryName];
  if (code) {
    return code;
  } else {
    throw new Error(`Country "${countryName}" not found.`);
  }
};
