import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
export default function AppRoutes(){
    return(
        <Routes>
        <Route path="/dashboard" elemnt={<Dashboard/>}></Route>
        </Routes>

  )
}
