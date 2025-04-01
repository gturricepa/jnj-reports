import { MainData } from "../../../types/MainData";
import * as S from "./styles";

interface GeneralTableProps {
  data: MainData[];
}

export const GeneralTable: React.FC<GeneralTableProps> = ({ data }) => {
  return (
    <S.Table>
      <thead>
        <tr>
          <th>Region</th>
          <th>Country</th>
          <th>Operating Group</th>
          <th>Sector</th>
          <th>Vehicles Count</th>
          <th>Miles</th>
          <th>Accident Count</th>
          <th>APMM</th>
          <th>Vehicles in Accidents</th>
          <th>Accidents with Injuries</th>
          <th>IPMM</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Region}</td>
            <td>{item.Country}</td>
            <td>{item["Operating Group"]}</td>
            <td>{item.Sector}</td>
            <td>{item["Vehicles Count"]}</td>
            <td>{item.Miles}</td>
            <td>{item["Accident Count"]}</td>
            <td>{item.APMM}</td>
            <td>{item["% Vehicles in Accidents"]}</td>
            <td>{item["# Accidents with Injuries"]}</td>
            <td>{item.IPMM}</td>
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};
