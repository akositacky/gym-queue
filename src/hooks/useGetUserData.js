import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, onSnapshot } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";

const useGetUserData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();
    const { setUser, user } = useAuthStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                const username = user.uid;
                const unsub = onSnapshot(doc(firestore, "users", username), (doc) => {
                    console.log('run');
                    if (doc.data()) {
                        if (user.RFIDcode !== doc.data().RFIDcode) {
                            localStorage.setItem("user-info", JSON.stringify(doc.data()));
                            setUser(doc.data());
                            setUserProfile(doc.data());
                        }
                    }
                });

                return unsub;

            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile();
    }, [user, setUser, setUserProfile, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserData;