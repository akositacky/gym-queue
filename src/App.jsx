import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Simple from "./Layouts/PageLayout/PageLayout2";
import EquipmentPage from "./pages/EquipmentPage/EquipmentPage";
import EquipmentQueuingPage from "./pages/EquipmentPage/Queuing/EquipmentQueuingPage";
import UserPage from "./pages/UserPage/UserPage";
import RFIDPage from "./pages/RFIDPage/RFIDPage";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <Simple>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/equipment/:equipmentName' element={authUser ? <EquipmentQueuingPage /> : <Navigate to='/' />} />
        <Route path='/equipment' element={authUser ? <EquipmentPage /> : <Navigate to='/' />} />
        <Route path='/users' element={authUser ? <UserPage /> : <Navigate to='/' />} />
        <Route path='/bracelet' element={authUser ? <RFIDPage /> : <Navigate to='/' />} />
        <Route path='/:username' element={authUser ? <ProfilePage /> : <Navigate to='/' />} />
      </Routes>
    </Simple>
  );
}

export default App;