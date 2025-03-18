import * as S from "./styles";

interface CenterTitleProps {
  value: string;
  space?: boolean;
}

export const CenterTitle: React.FC<CenterTitleProps> = ({ value, space }) => {
  return (
    <S.Title>
      {space && <div style={{ marginTop: "2rem" }}></div>}
      {value}
    </S.Title>
  );
};
