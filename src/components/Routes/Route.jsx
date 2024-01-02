import { Routes, Route } from "react-router";
import Setting from "../Settings/Settings";
import SignIn from "../SignIn/SignIn";
import NotFound from "../NotFoundPage/NotFound";
import Dashboard from "../DashBoard/Dashboard";

export default function Path() {
    return (
        <Routes>

            <Route path="/" element={<SignIn/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/settings" element={<Setting/>}/>
            <Route path="*" element={<NotFound/>}/>

        </Routes>
    )
}