import { BrowserRouter, Route, Routes } from "react-router-dom";
import VictimSignIn from "../VictimComponents/SignIn/Login/VictimSignIn";
import OrganizationLogin from "../OrganizationComponents/Auth/Login";
import OrganizationDashboard from "../OrganizationComponents/Dashboard/OrganizationDashboard";
import CounsolerLogin from "../CounsolersComponents/Auth/CounsolerLogin";
import CounsolerSignup from "../CounsolersComponents/Auth/CounsolerSignup";
import CounsolerDashboard from "../CounsolersComponents/Dashboard/CounsolerDashboard";
import VictimSignUp from "../VictimComponents/SignIn/Login/VictimSignUp";
import VictimPanel from "../VictimComponents/VictimPanel/VictimPanel";
import CounsolerSelectionPanel from "../VictimComponents/CounsolerSelectionPanel/CounsolerSelectionPanel";
import VictimChat from "../VictimComponents/ChatPanel/VictimChat";
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VictimSignIn />} />
        <Route path="/signup" element={<VictimSignUp />} />
        <Route path="/victim" element={<VictimPanel />} />
        <Route
          path="/counsolerselectionpanel/:id"
          element={<CounsolerSelectionPanel />}
        />
        <Route path="/victimchat/:id" element={<VictimChat />} />

        <Route path="/organization/" element={<OrganizationLogin />} />
        <Route
          path="/organizationDashboard/*"
          element={<OrganizationDashboard />}
        />
        <Route path="/counsoler/" element={<CounsolerLogin />} />
        <Route path="/counsoler/Signup" element={<CounsolerSignup />} />
        <Route path="/counsolerdashboard/*" element={<CounsolerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
