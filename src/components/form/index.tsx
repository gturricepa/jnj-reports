import React, { useState } from "react";
import * as S from "./styles";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, UserState } from "../../types/User";
import { setUser } from "../../store/userSlice";
import { ErrorMsg } from "../errormsg";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const usersResponse = await fetch("/assets/users.xlsx");
      const usersArrayBuffer = await usersResponse.arrayBuffer();
      const usersWorkbook = XLSX.read(usersArrayBuffer, { type: "array" });
      const usersWorksheet = usersWorkbook.Sheets[usersWorkbook.SheetNames[0]];
      const usersData: User[] = XLSX.utils.sheet_to_json(usersWorksheet);

      const currentUser = usersData.find(
        (user) => user.Name === email && user.Password === password
      );

      if (currentUser) {
        const userPayload: UserState = {
          name: currentUser.Name,
          allowedGroups: currentUser["Operating Group"]?.split(",") || [],
          allowedCountries: currentUser["Country"]?.split(",") || [],
          allowedSectors: currentUser["Sector"]?.split(",") || [],
          Nick: currentUser.Nick,
          selectedCountry: currentUser["Country"].split(",")[0] || [],
          Escope: currentUser["Escope"].split(",") || [],
          perspective: "country",
        };

        dispatch(setUser(userPayload));

        navigate("/home");
      } else {
        setError("invalidPassword");
      }
    } catch (error) {
      console.error("Erro ao processar login:", error);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <input
        placeholder="User"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <ErrorMsg text={error} />}
    </S.Form>
  );
};
