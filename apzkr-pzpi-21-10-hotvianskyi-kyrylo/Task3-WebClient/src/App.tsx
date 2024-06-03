import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import RequireAuth from './components/RequireAuth';
import {Roles} from "./interfaces/enums.ts";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import Profile from "./pages/Profile.tsx";
import PoolRequests from "./pages/PoolRequests.tsx";
import Measurements from "./pages/Measurements.tsx";
import {ExportData} from "./pages/ExportData.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={[Roles.Member]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/measurements" element={<Measurements />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles.Administrator]} />}>
            <Route path="/pool-requests" element={<PoolRequests />} />
            <Route path="/export-data" element={<ExportData />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
