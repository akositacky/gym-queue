import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { db, firestore } from "../firebase/firebase";
import { onValue, ref, set } from "firebase/database";

const useEquipmentQueue = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    // const [queue, setQueue] = useState(post.inQueue.length);
    const queue = post.queueCount;
    // const [isInQueue, setIsInQueue] = useState(false);
    // const [mode, setMode] = useState();
    const showToast = useShowToast();

    // const setAuthUser = useAuthStore((state) => state.setUser);
    // const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const handleEquipmentQueue = async (buttonMode) => {
        if (isUpdating) return;
        if (!authUser) return showToast("Error", "You must be logged in", "error");
        setIsUpdating(true);

        try {
            if (authUser) {
                // if (authUser?.assignedRfid) {
                // console.log('isInQueue', isInQueue);

                let realtimeResponse = [];

                const postRef = doc(firestore, "equipments", post.id);

                // **********************  RTDB **********************
                const docSnap = await getDoc(postRef);
                const dbRef = ref(db, "equipments/" + docSnap.data().equipmentName);
                onValue(dbRef, (snapshot) => {
                    realtimeResponse = snapshot.val();
                });
                console.log('realtimeResponse', realtimeResponse, realtimeResponse.currentUser);

                // ********************** END RTDB **********************
                let rtdbUpdateData;
                const realtimeQueue = realtimeResponse.queue;
                console.log('buttonMode', buttonMode)
                if (buttonMode) {
                    // Remove queue
                    if (buttonMode == "INQUEUE") {
                        const filtered = realtimeQueue.length > 0 ? realtimeQueue.filter(item => item.User !== authUser.uid) : [];
                        const filteredQueue = filtered.length > 0 ? filtered : "";
                        rtdbUpdateData = {
                            ...realtimeResponse,
                            queueCount: realtimeResponse.queueCount - 1,
                            queue: filteredQueue,
                        };
                        // } else if (buttonMode == "LEAVE") {
                    } else {
                        if (realtimeQueue.length > 0) {
                            const filtered = realtimeQueue.length > 0 ? realtimeQueue.filter(item => item.User !== realtimeQueue[0].User) : [];
                            const filteredQueue = filtered.length > 0 ? filtered : "";

                            rtdbUpdateData = {
                                RFID: realtimeQueue[0].RFID,
                                User: realtimeQueue[0].User,
                                queueCount: realtimeResponse.queueCount - 1,
                                status: "PENDING",
                                queue: filteredQueue,
                            }
                        } else {
                            // Reset equipment queue to 0
                            rtdbUpdateData = {
                                RFID: "",
                                User: "",
                                status: "FREE",
                                queue: "",
                                queueCount: 0,
                            };
                        }
                    }
                    // else {
                    //     // Reset equipment queue to 0
                    //     rtdbUpdateData = {
                    //         ...realtimeResponse,
                    //         RFID: "",
                    //         User: "",
                    //         status: "FREE",
                    //         queueCount: 0,
                    //     };
                    // }
                } else {
                    if (realtimeResponse.status === "FREE") {
                        rtdbUpdateData = {
                            ...realtimeResponse,
                            RFID: authUser.RFIDcode,
                            User: authUser.uid,
                            status: "PENDING",
                            queueCount: 0,
                        };
                    } else {
                        rtdbUpdateData = {
                            ...realtimeResponse,
                            queueCount: realtimeResponse.queueCount + 1,
                            queue: [
                                ...realtimeResponse.queue,
                                {
                                    RFID: authUser.RFIDcode,
                                    User: authUser.uid,
                                }
                            ]
                        };
                    }
                }

                await set(ref(db, "equipments/" + post.equipmentName), rtdbUpdateData);
                // const currentQueue = rtdbUpdateData.queue;

                // setIsInQueue(currentQueue && currentQueue.some(item => item.User === authUser.uid) || (rtdbUpdateData.status == "PENDING" && rtdbUpdateData.User == authUser.uid));

                // if (currentQueue && currentQueue.some(item => item.User === authUser.uid)) {
                //     setMode("INQUEUE");
                //     setIsInQueue(true);
                // } else if (rtdbUpdateData.status == "PENDING" && rtdbUpdateData.User == authUser.uid) {
                //     setMode("INPENDING");
                //     setIsInQueue(true);
                // } else {
                //     setIsInQueue(false);
                // }

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
                // showToast(post.name, toastMsg, toastType);

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

    return { queue, handleEquipmentQueue, isUpdating };
};

export default useEquipmentQueue;

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