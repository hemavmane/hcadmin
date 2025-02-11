import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Services from "./scenes/Appservice.js/index.js";
import Banner from "./scenes/Banner/index.js";

import Login from "./scenes/Login";
import SignUp from "./scenes/SignUp.jsx";
import ProviderTrust from "./scenes/ProviderTrust/index.js";
import BlogPage from "./scenes/Blogs/index.jsx";
import About from "./scenes/About/index.jsx";
import OverView from "./scenes/OverView/index.js";
import Contacts from "./scenes/contacts/index.jsx";
import CompanyValue from "./scenes/CompanyValue/index.js";
import MissionPage from "./scenes/Mission/index.jsx";
import CookieConsent from "./scenes/Cookies/index.jsx";


function App() {
  const [theme, colorMode] = useMode();
  const admin = localStorage.getItem("healthcadmin");
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const hideSidebarAndTopbar = location.pathname
    .toLowerCase()
    .startsWith("/quoteview");

  console.log("hideSidebarAndTopbar", hideSidebarAndTopbar);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

        </Routes>

        {/* {admin && (
          <div className="app">
            {!hideSidebarAndTopbar && location.pathname !== "/" && (
              <Sidebar isSidebar={isSidebar} />
            )}
            <main className="content">
              {!hideSidebarAndTopbar && admin && location.pathname !== "/" && (
                <Topbar setIsSidebar={setIsSidebar} />
              )}
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/service" element={<Services />} />



                <Route path="/banner" element={<Banner />} />

                <Route path="/order" element={<Order />} />

                <Route path="/vieworder/:data" element={<ViewOrder />} />
                <Route path="/modifyorder/:data" element={<ModifyOrder />} />

              </Routes>
            </main>
          </div>
        )} */}

        <div className="app">
          {!hideSidebarAndTopbar && location.pathname !== "/" && (
            <Sidebar isSidebar={isSidebar} />
          )}
          <main className="content">
            {!hideSidebarAndTopbar && admin && location.pathname !== "/" && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/service" element={<Services />} />
              <Route path="/providertrust" element={<ProviderTrust />} />
              <Route path="/banner" element={<Banner />} />
              <Route path="/blogpage" element={<BlogPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/overview" element={<OverView />} />
              <Route path="/contact" element={<Contacts />} />
              <Route path="/cmvalue" element={<CompanyValue />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/cookies" element={<CookieConsent />} />
            </Routes>
          </main>
        </div>
        
      </ThemeProvider>
      
    </ColorModeContext.Provider>
  );
}

export default App;
