import { create } from "zustand";

const useUsersStore = create((set) => ({
    users: null,
    setUsers: (users) => set({ users }),
    updateUser: (userUID, RFIDdata) =>
        set((state) => ({
            users: state.users.map((user) => {
                if (user.id === userUID) {
                    return {
                        ...user,
                        ...RFIDdata,
                    };
                }
                return user;
            }),
        })),
}));

export default useUsersStore;