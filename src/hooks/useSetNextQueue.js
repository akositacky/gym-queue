// import { useSignOut } from "react-firebase-hooks/auth";
// import { auth } from "../firebase/firebase";
import { getDatabase, onValue, ref, serverTimestamp, set } from "firebase/database";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
// import useAuthStore from "../store/authStore";

const useSetNextQueue = () => {
    // const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    // const logoutUser = useAuthStore((state) => state.logout);
    const authUser = useAuthStore((state) => state.user);

    const setNext = async (equipmentName) => {
        try {
            console.log('hala')
            const db = getDatabase();
            const starCountRef = ref(db, 'equipments/' + equipmentName);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();

                if (data.status === "NEXT" && data.queueCount > 0) {
                    const RFID = data.queue[0]['RFID'];
                    const User = data.queue[0]['User'];
                    const timeUsage = data.queue[0]['timeUsage'];
                    const newQueue = data.queue.filter(e => e.RFID !== RFID);
                    const filteredQueue = newQueue.length > 0 ? newQueue : "";

                    const rtdbUpdateData = {
                        RFID,
                        User,
                        queue: filteredQueue,
                        queueCount: newQueue.length,
                        status: 'PENDING',
                        timestamp: serverTimestamp(),
                        timeUsage
                    }
                    set(ref(db, "equipments/" + equipmentName), rtdbUpdateData);
                }

                if (data.status === "NEXT" && data.User === authUser.uid && data.queueCount == 0 && data.queue == "") {
                    console.log('clear')

                    const rtdbUpdateData = {
                        RFID: "",
                        User: "",
                        status: "FREE",
                        queue: "",
                        queueCount: 0,
                        timestamp: serverTimestamp()
                    };
                    set(ref(db, "equipments/" + equipmentName), rtdbUpdateData);
                }

            });
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { setNext };
};

export default useSetNextQueue;