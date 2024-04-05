import { Route, Routes } from "react-router-dom"
import HomePage from "../HomePage/HomePage"
import useAuthStore from "../../store/authStore";
import EquipmentPage from "../EquipmentPage/EquipmentPage";
import UserPage from "../UserPage/UserPage";
import RFIDPage from "../RFIDPage/RFIDPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import Logout from "./Logout";

const RoutePage = () => {
    const authStore = useAuthStore((state) => state.user);

    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/logout' element={<Logout />} />
                {(authStore.userRole === "admin") && (
                    <Route path="/">
                        <Route exact path='/equipment' element={<EquipmentPage />} />
                        <Route path='/users' element={<UserPage />} />
                        <Route path='/bracelet' element={<RFIDPage />} />
                        <Route path='/:username' element={<ProfilePage />} />
                    </Route>
                )}
                <Route path='/*' element={<HomePage />} />
            </Routes>
        </>
    )
}

export default RoutePage