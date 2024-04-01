import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUsersStore from "../store/usersStore";

const useGetUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { users, setUsers } = useUsersStore();

    useEffect(() => {
        const getEquipment = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(firestore, "users"), where("userRole", "==", "user"));
                const querySnapshot = await getDocs(q);
                const usersData = [];

                if (querySnapshot.empty) return setUsers(null);

                querySnapshot.forEach((doc) => {
                    usersData.push({ id: doc.id, ...doc.data() });
                });

                setUsers(usersData);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getEquipment();
    }, [setUsers, showToast]);

    return { isLoading, users };
};

export default useGetUsers;