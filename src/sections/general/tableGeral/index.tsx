import { MainData } from "../../../types/MainData";
import * as S from "./styles";

interface GeneralTableProps {
  data: MainData[];
}

export const GeneralTable: React.FC<GeneralTableProps> = ({ data }) => {
  // Calcular somas
  const total = data.reduce(
    (acc, item) => {
      acc.vehiclesCount += Number(item["Vehicles Count"]) || 0;
      acc.miles += Number(item.Miles) || 0;
      acc.accidentCount += Number(item["Accident Count"]) || 0;
      acc.apmm += Number(item.APMM) || 0;
      acc.vehiclesInAccidents += Number(item["% Vehicles in Accidents"]) || 0;
      acc.accidentsWithInjuries +=
        Number(item["# Accidents with Injuries"]) || 0;
      return acc;
    },
    {
      vehiclesCount: 0,
      miles: 0,
      accidentCount: 0,
      apmm: 0,
      vehiclesInAccidents: 0,
      accidentsWithInjuries: 0,
    }
  );

  return (
    <S.Table>
      <thead>
        <tr>
          <th>Operating Group</th>
          <th>Sector</th>
          <th>Vehicles</th>
          <th>Miles</th>
          <th>Accidentst</th>
          <th>Accidents with Injuries</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item["Operating Group"]}</td>
            <td>{item.Sector}</td>
            <td>{item["Vehicles Count"]}</td>
            <td>{item.Miles}</td>
            <td>{item["Accident Count"]}</td>
            <td>{item["# Accidents with Injuries"]}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>
            <strong>Total</strong>
          </td>
          <td>
            <strong>{total.vehiclesCount}</strong>
          </td>
          <td>
            <strong>{total.miles}</strong>
          </td>
          <td>
            <strong>{total.accidentCount}</strong>
          </td>

          <td>
            <strong>{total.accidentsWithInjuries}</strong>
          </td>
        </tr>
      </tbody>
    </S.Table>
  );
};
