import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useEquipmentItemStore from "../store/equipmentItemStore";
import { getDatabase, onValue, ref } from "firebase/database";

const useGetEquipmentByName = (equipmentName) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { equipment, setEquipment } = useEquipmentItemStore();

    useEffect(() => {
        const getEquipment = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(firestore, "equipments"), where("equipmentName", "==", equipmentName));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return setEquipment(null);

                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                // console.log('userDoc', userDoc);
                // const combinedResult = [];
                let realtimeResponse = [];

                const db = getDatabase();
                const starCountRef = ref(db, 'equipments/' + userDoc.equipmentName);

                onValue(starCountRef, async (snapshot) => {
                    realtimeResponse = snapshot.val();
                    console.log('realtimeResponse', realtimeResponse)

                    // combinedResult.push({ ...userDoc, ...realtimeResponse });
                });


                setEquipment({ ...userDoc, ...realtimeResponse });
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getEquipment();
    }, [setEquipment, equipmentName, showToast]);

    return { isLoading, equipment };
};

export default useGetEquipmentByName;