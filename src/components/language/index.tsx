import { Select } from "antd";
import Flag from "react-world-flags";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import { setLanguage } from "../../store/languageSlice";
import { RootState } from "../../store/store";
import { LastUpdate } from "../lastupdate";

const { Option } = Select;

export const Language = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const handleChange = (value: string) => {
    dispatch(setLanguage(value));
    i18n.changeLanguage(value);
  };

  return (
    <S.Holder>
      <Select
        value={currentLanguage}
        style={{ width: 150 }}
        onChange={handleChange}
      >
        <Option value="en">
          <Flag
            code="US"
            style={{ width: "20px", height: "auto", marginRight: "8px" }}
          />
          English
        </Option>
        <Option value="pt">
          <Flag
            code="BR"
            style={{ width: "20px", height: "auto", marginRight: "8px" }}
          />
          Português
        </Option>
        <Option value="es">
          <Flag
            code="ES"
            style={{ width: "20px", height: "auto", marginRight: "8px" }}
          />
          Español
        </Option>
      </Select>
      <LastUpdate />
    </S.Holder>
  );
};
