import { GlobalOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

export const Perspective = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const { t } = useTranslation();

  const togglePerspective = () => {
    const countriesToselect =
      userState.perspective === "country"
        ? userState.allowedCountries
        : userState.allowedCountries[0];

    const newPerspective =
      userState.perspective === "country" ? "region" : "country";
    dispatch(
      setUser({
        ...userState,
        perspective: newPerspective,
        selectedCountry: countriesToselect,
      })
    );
  };

  const show = userState!.Escope!.length > 1;
  return (
    <>
      {show && (
        <Tooltip
          placement="bottomRight"
          title={
            <>
              {t("CurrentPerspective")}:{" "}
              <span style={{ fontWeight: "bold" }}>
                BY {t(userState.perspective).toUpperCase()}
              </span>
              <br />
              {t("clickToChange")}
            </>
          }
        >
          <S.Holder onClick={togglePerspective}>
            <GlobalOutlined />
          </S.Holder>
        </Tooltip>
      )}
    </>
  );
};
