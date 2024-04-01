import { create } from "zustand";

const userRFIDStore = create((set) => ({
    rfids: null,
    setRFIDS: (rfids) => set({ rfids }),
    createRFIDS: (post) => set((state) => ({ rfids: [post, ...state.rfids] })),
    updateRFIDS: (RFIDcode, RFIDdata) =>
        set((state) => ({
            rfids: state.rfids.map((rfid) => {
                if (rfid.RFIDcode === RFIDcode) {
                    return {
                        ...rfid,
                        ...RFIDdata,
                    };
                }
                return rfid;
            }),
        })),
}));

export default userRFIDStore;