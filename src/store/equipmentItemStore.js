import { create } from "zustand";

const useEquipmentItemStore = create((set) => ({
    equipment: null,
    setEquipment: (equipment) => set({ equipment }),
    // this is used to update the number of posts in the profile page
    // addPost: (post) =>
    //     set((state) => ({
    //         userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
    //     })),
    // deletePost: (postId) =>
    //     set((state) => ({
    //         userProfile: {
    //             ...state.userProfile,
    //             posts: state.userProfile.posts.filter((id) => id !== postId),
    //         },
    //     })),
}));

export default useEquipmentItemStore;