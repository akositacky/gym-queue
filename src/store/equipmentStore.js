import { create } from "zustand";

const useEquipmentsStore = create((set) => ({
    equipments: null,
    createEquipment: (post) => set((state) => ({ equipments: [post, ...state.equipments] })),
    deleteEquipment: (id) => set((state) => ({ equipments: state.equipments.filter((post) => post.id !== id) })),
    setEquipment: (equipments) => set({ equipments }),
    // addComment: (postId, comment) =>
    //     set((state) => ({
    //         equipments: state.equipments.map((post) => {
    //             if (post.id === postId) {
    //                 return {
    //                     ...post,
    //                     comments: [...post.comments, comment],
    //                 };
    //             }
    //             return post;
    //         }),
    //     })),
}));

export default useEquipmentsStore;