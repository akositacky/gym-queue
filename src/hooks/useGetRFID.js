import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import userRFIDStore from "../store/rfidStore";

const useGetRFID = () => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { rfids, setRFIDS } = userRFIDStore();

    useEffect(() => {
        const getRFID = async () => {
            setIsLoading(true);
            try {
                // const q = query(collection(firestore, "rfid"));
                const q = query(collection(firestore, "rfid"), where("active", "==", true));
                const querySnapshot = await getDocs(q);
                const usersData = [];

                if (querySnapshot.empty) return setRFIDS(null);

                querySnapshot.forEach((doc) => {
                    usersData.push({ id: doc.id, ...doc.data() });
                });

                setRFIDS(usersData);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getRFID();
    }, [setRFIDS, showToast]);

    return { isLoading, rfids };
};

export default useGetRFID;