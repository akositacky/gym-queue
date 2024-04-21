import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, firestore } from "../firebase/firebase";
import { onValue, ref, set } from "firebase/database";
import useUserProfileStore from "../store/userProfileStore";

const useEquipmentQueueDebug = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    // const [queue, setQueue] = useState(post.inQueue.length);
    const queue = post.queueCount;
    // const [isInQueue, setIsInQueue] = useState(post.currentUser.includes(authUser?.uid));
    const showToast = useShowToast();

    // const setAuthUser = useAuthStore((state) => state.setUser);
    // const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const handleEquipmentQueueClear = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast("Error", "You must be logged in", "error");
        setIsUpdating(true);

        try {
            if (authUser) {
                const rtfbUpdate = {
                    // currentRFID: "",
                    // currentUser: "",
                    // pendingRFID: "",
                    // pendingUser: "",
                    RFID: "",
                    User: "",
                    status: "FREE",
                    queueCount: 0,
                    queue: ""
                };
                await set(ref(db, "equipments/" + post.equipmentName), rtfbUpdate);
                // console.log('www');
                // i1f (authUser?.assignedRfid) {
                // let realtimeResponse = [];

                // const postRef = doc(firestore, "equipments", post.id);

                // // **********************  RTDB **********************
                // const docSnap = await getDoc(postRef);
                // const dbRef = ref(db, "equipments/" + docSnap.data().equipmentName);
                // onValue(dbRef, (snapshot) => {
                //     realtimeResponse = snapshot.val();
                // });
                // console.log('realtimeResponse', realtimeResponse, realtimeResponse.currentUser);

                // ********************** END RTDB **********************
                // console.log('authUser', authUser);
                // console.log('post', post);
                // console.log('rtfbUpdate', {
                //     ...realtimeResponse,
                //     ...rtfbUpdate,
                // });
                // // Check if equipment has no user queue
                // // Set user to use equipment
                // if (post.queueCount == 0) {
                //     console.log('YOU ARE NEXT!');

                //     const userDocRef = doc(firestore, "users", authUser.uid);
                //     const updatedUser = {
                //         ...authUser,
                //         inEquipment: post.id
                //     };

                //     await updateDoc(userDocRef, updatedUser);
                //     localStorage.setItem("user-info", JSON.stringify(updatedUser));
                //     setAuthUser(updatedUser);
                //     setUserProfile(updatedUser);

                //     // const assignedRfid = authUser?.assignedRfid ? authUser.assignedRfid : '';
                //     // console.log('assignedRfid', assignedRfid);
                // }

                // await updateDoc(postRef, {
                //     inQueue: isInQueue ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
                // });

                // console.log('post', post);
                // const toastMsg = isInQueue ? "Removed from queue" : "Joined Queue";
                // const toastType = isInQueue ? "warning" : "success";
                showToast(post.name, "Equipment Queue Cleared", "success");

                // setIsInQueue(!isInQueue);
                // isInQueue ? setQueue(queue - 1) : setQueue(queue + 1);
            } else {
                showToast("ERROR", "No assigned RFID. Please contact your administrator", "error");
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleEquipmentTime = async (time) => {
        if (isUpdating) return;
        if (!authUser) return showToast("Error", "You must be logged in", "error");
        setIsUpdating(true);

        const userDocRef = doc(firestore, "equipments", post.id);
        try {
            console.log(post);
            console.log(time);
            const updateData = {
                timeUsage: time
            };

            await updateDoc(userDocRef, updateData);
            showToast(post.name, "Equipment Time Usage Set", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }

    };

    return { queue, handleEquipmentQueueClear, handleEquipmentTime, isUpdating };
};

export default useEquipmentQueueDebug;

// try {
//     if (authUser) {
//         // if (authUser?.assignedRfid) {
//         let realtimeResponse = [];

//         const postRef = doc(firestore, "equipments", post.id);

//         // **********************  RTDB **********************
//         const docSnap = await getDoc(postRef);
//         const dbRef = ref(db, "equipments/" + docSnap.data().equipmentName);
//         onValue(dbRef, (snapshot) => {
//             realtimeResponse = snapshot.val();
//         });
//         console.log('realtimeResponse', realtimeResponse, realtimeResponse.currentUser);

//         // ********************** END RTDB **********************

//         // Check if equipment has no user queue
//         // Set user to use equipment
//         if (post.queueCount == 0) {
//             console.log('YOU ARE NEXT!');

//             const userDocRef = doc(firestore, "users", authUser.uid);
//             const updatedUser = {
//                 ...authUser,
//                 inEquipment: post.id
//             };

//             await updateDoc(userDocRef, updatedUser);
//             localStorage.setItem("user-info", JSON.stringify(updatedUser));
//             setAuthUser(updatedUser);
//             setUserProfile(updatedUser);

//             // const assignedRfid = authUser?.assignedRfid ? authUser.assignedRfid : '';
//             // console.log('assignedRfid', assignedRfid);


//             await set(ref(db, "equipments/" + docSnap.data().equipmentName), {
//                 ...realtimeResponse,
//                 pendingUser: authUser.uid,
//                 pendingRfid: authUser.assignedRfid,
//             });


//         }

//         await updateDoc(postRef, {
//             inQueue: isInQueue ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
//         });

//         console.log('post', post);
//         const toastMsg = isInQueue ? "Removed from queue" : "Joined Queue";
//         const toastType = isInQueue ? "warning" : "success";
//         showToast(post.name, toastMsg, toastType);

//         setIsInQueue(!isInQueue);
//         // isInQueue ? setQueue(queue - 1) : setQueue(queue + 1);
//     } else {
//         showToast("ERROR", "No assigned RFID. Please contact your administrator", "error");
//     }
// } catch (error) {
//     showToast("Error", error.message, "error");
// } finally {
//     setIsUpdating(false);
// }