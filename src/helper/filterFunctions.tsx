import { DataUser, UserState } from "../types/User";

export const applyDataFilter = <T extends DataUser>(
  data: T[],
  user: UserState
) => {
  const allowedGroups = user.allowedGroups || [];
  const allowedCountries = user.selectedCountry || [];
  const allowedSectors = user.allowedSectors || [];

  const filteredData = data.filter((item) => {
    return (
      allowedGroups.includes(item["Operating Group"]) &&
      allowedCountries.includes(item["Country"]) &&
      allowedSectors.includes(item["Sector"])
    );
  });

  return filteredData;
};
