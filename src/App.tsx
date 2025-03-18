import "./App.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/protected/ProtectedRoute";

function App() {
  // const loggedUser = "renato.gominho";
  // const [data, setData] = useState<any[]>([]);
  // const [users, setUsers] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch("/assets/users.xlsx");
  //       const arrayBuffer = await response.arrayBuffer();
  //       const workbook = XLSX.read(arrayBuffer, { type: "array" });
  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //       setUsers(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/assets/acidentes 2024.xlsx");
  //       const arrayBuffer = await response.arrayBuffer();
  //       const workbook = XLSX.read(arrayBuffer, { type: "array" });
  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  //   fetchUser();
  // }, []);

  // const currentUser = users.find((user) => user.Name === loggedUser);

  // console.log(currentUser);
  // const filteredData = data.filter((item) => {
  //   const allowedGroups = currentUser?.["Grupo Operacional"]?.split(",") || [];
  //   const allowedCountries = currentUser?.["País"]?.split(",") || [];
  //   const allowedSectors = currentUser?.["Setor"]?.split(",") || [];

  //   return (
  //     allowedGroups.includes(item["Grupo Operacional"]) &&
  //     allowedCountries.includes(item["País"]) &&
  //     allowedSectors.includes(item["Setor"])
  //   );
  // });

  // console.log("--------------");
  // console.log(filteredData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
