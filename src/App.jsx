import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Simple from "./Layouts/PageLayout/PageLayout2";
import EquipmentQueuingPage from "./pages/EquipmentPage/Queuing/EquipmentQueuingPage";
import useAuthStore from "./store/authStore";
import RoutePage from "./pages/RoutePage/RoutePage";
import useGetUserData from "./hooks/useGetUserData";
import NextQueuePage from "./pages/NextQueue/NextQueuePage";

function App() {
  const [authUser] = useAuthState(auth);
  const authStore = useAuthStore((state) => state.user);
  useGetUserData();

  return (
    <Simple>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
        <Route path='/equipment/:equipmentName' element={authUser ? <EquipmentQueuingPage /> : <Navigate to='/' />} />

        {/* <Route path='/updateNextQueue/:equipment' element={<NextQueuePage />} /> */}

        {authUser && authStore ? (
          // Authenticated 
          <Route path="/*" element={<RoutePage />} />
        ) : (
          // Not Authenticated
          <>
            <Route path='/' element={<Navigate to='/auth' />} />
            <Route path='/:any' element={<Navigate to='/' />} />
          </>
        )
        }
      </Routes>
    </Simple>
  );
}

export default App;