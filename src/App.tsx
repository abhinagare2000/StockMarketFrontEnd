import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import { Header } from "./Pages/Header";
import Account from "./Pages/Account";
import PortFolio from "./Pages/PortFolio";
import TradeForm from "./Pages/TradeForm";
import WatchList from "./Pages/WatchList";
import CreateAccountPage from "./Pages/CreateAccountPage";
import { useState } from 'react';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const App = () => {
  const [themeMode] = useState<"light" | undefined>("light");

  const theme = createTheme({
    direction: "ltr",
    palette: {
      mode: themeMode
    },
    typography: {
      fontSize: 14
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/Home" element={<Header />} />
            <Route path="/WatchList" element={<WatchList />} />
            <Route path="/PortFolio" element={<PortFolio />} />
            <Route path="/TradeForm" element={<TradeForm />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/createAccount" element={<CreateAccountPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
