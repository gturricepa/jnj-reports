import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "./styles";
import { Select, SelectProps } from "antd";
import Flag from "react-world-flags";
import { getCountryCode } from "./helper";
import { RootState } from "../../store/store";
import { toggle } from "../../store/dummySlice";
import { setUser } from "../../store/userSlice";

const { Option } = Select;

export const Country: React.FC = () => {
  const dispatch = useDispatch();
  const allowedCountries = useSelector(
    (state: RootState) => state.user.allowedCountries
  );
  const user = useSelector((state: RootState) => state.user);

  const handleChange = (value: string[]) => {
    dispatch(setUser({ ...user, selectedCountry: value }));
    dispatch(toggle());
  };

  const size = user!.selectedCountry!.length > 0 ? "350px" : "150px";
  const sharedProps: SelectProps = {
    mode: "multiple",
    style: { width: size, transition: "width .3s ease" },
    placeholder: "Select...",
    maxTagCount: "responsive",
  };

  const truncateString = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };
  return (
    <S.Holder>
      <Select
        {...sharedProps}
        value={user.selectedCountry}
        onChange={handleChange}
      >
        {allowedCountries.map((country, index) => (
          <Option key={index} value={country}>
            <Flag code={getCountryCode(country)} style={{ width: "20px" }} />{" "}
            {truncateString(country, 25)}{" "}
          </Option>
        ))}
      </Select>
    </S.Holder>
  );
};
