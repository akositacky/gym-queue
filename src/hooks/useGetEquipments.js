import { useEffect, useState } from "react";
import useEquipmentsStore from "../store/equipmentStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { getDatabase, onValue, ref } from "firebase/database";
// import { onValue, ref } from "firebase/database";

const useGetEquipment = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { equipments, setEquipment } = useEquipmentsStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getEquipmentList = async () => {
            setIsLoading(true);
            setEquipment([]);

            const q = query(collection(firestore, "equipments"), where("isActive", "==", true));
            try {

                // **********************  RTDB **********************
                const db = getDatabase();
                const starCountRef = ref(db, 'equipments');
                onValue(starCountRef, async (snapshot) => {
                    const data = snapshot.val();
                    const realtimeResponse = data;

                    const querySnapshot = await getDocs(q);
                    const combinedResult = [];

                    querySnapshot.forEach((doc) => {
                        combinedResult.push({ id: doc.id, ...doc.data(), ...realtimeResponse[doc.data().equipmentName] });
                    });
                    console.log('combinedResult',combinedResult)
                    
                    // const combinedEquipment = []; 

                   const useEquipment =  combinedResult.filter((e) => e.User === authUser.uid && e.status === "USE");
                   const pendingEquipment =  combinedResult.filter((e) => e.User === authUser.uid && e.status === "PENDING");
                   const otherEquipment =  combinedResult.filter((e) => e.User !== authUser.uid && (e.status !== "PENDING" || e.status !== "USE"));
                    // combinedResult
                    //     // .filter((e) => e.User === authUser.uid && e.status === "PENDING")
                    //     .map((e)=> {

                    //         if (e.User === authUser.uid && e.status === "USE") {
                    //             combinedEquipment.push(e);
                    //         }
                    //     });


                    // combinedResult
                    //     .filter((e) => e.User === authUser.uid && (e.status !== "PENDING" || e.status !== "USE"))
                    //     .map((e)=> combinedEquipment.push(e));

                    // combinedEquipment.push(useEquipment);
                    // combinedEquipment.push(pendingEquipment);
                    // combinedEquipment.push(pendingEquipment);

                    setEquipment([...useEquipment, ...pendingEquipment, ...otherEquipment]);
                    
                    // console.log([...useEquipment, ...pendingEquipment, ...otherEquipment])
                // **********************  END RTDB **********************
                // console.log('realtimeResponse1',realtimeResponse,realtimeResponse.gymEq1);

                });
                
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getEquipmentList();
    }, [authUser, setEquipment, showToast])

    return { isLoading, equipments };
}

export default useGetEquipment

// try {
//     // const querySnapshot = await getDocs(q);
//     let rtdbEquipments = [];

//     // querySnapshot.forEach((doc) => {
//     //     feedPosts.push({ id: doc.id, ...doc.data() });
//     // });

//     // feedPosts.sort((a, b) => a.createdAt - b.createdAt);
//     // setEquipment(feedPosts);

//     const dbRef = ref(db, "equipments");
//     onValue(dbRef, (snapshot) => {

//         // snapshot.forEach(childSnapshot => {
//         //     console.log('childSnapshot', childSnapshot.val());
//         // })
//         if (snapshot && snapshot.val()) {
//             rtdbEquipments = snapshot.val();
//         }
//     });

//     console.log('rtdbEquipments', rtdbEquipments);
    
//     // Realtime Database
//     const unsubscribe = onSnapshot(q,
//         { includeMetadataChanges: true },
//         (snapshot) => {
//             // const feedEq = [];

//             // Process the data from the Firestore snapshot
//             const newData = snapshot.docs.map((doc) => {
//                 return { id: doc.id, ...doc.data() }
//             });

//             // Update the component state with the new data

//             // newData.forEach((doc) => {
//             //     feedEq.push({ id: doc.id, ...doc.data() });
//             // });
//             console.log('newData', newData)
//             // console.log('feedEq', feedEq)
//             // setEquipment((prevData) => [...prevData, ...newData]);
//             setEquipment(newData)
//         });
//     return unsubscribe;
// } catch (error) {
//     showToast("Error", error.message, "error");
// } finally {
//     setIsLoading(false);
// }