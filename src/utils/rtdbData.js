import { serverTimestamp } from "firebase/database";

export const rtdbHasQueue = (realtimeResponse) => {
    const realtimeQueue = realtimeResponse.queue;

    const filtered = realtimeQueue.length > 0 ? realtimeQueue.filter(item => item.User !== realtimeQueue[0].User) : [];
    const filteredQueue = filtered.length > 0 ? filtered : "";

    return {
        RFID: realtimeQueue[0].RFID,
        User: realtimeQueue[0].User,
        queueCount: realtimeResponse.queueCount - 1,
        status: "PENDING",
        queue: filteredQueue,
        timestamp: serverTimestamp()
    }
}

export const rtdbRemoveCurrent = (realtimeResponse) => {
    const realtimeQueue = realtimeResponse.queue;

    if (realtimeQueue.length > 0) {
        const filtered = realtimeQueue.length > 0 ? realtimeQueue.filter(item => item.User !== realtimeQueue[0].User) : [];
        const filteredQueue = filtered.length > 0 ? filtered : "";

        return {
            RFID: realtimeQueue[0].RFID,
            User: realtimeQueue[0].User,
            queueCount: realtimeResponse.queueCount - 1,
            status: "PENDING",
            queue: filteredQueue,
            timestamp: serverTimestamp()
        }
    } else {
        // Reset equipment queue to 0
        return {
            RFID: "",
            User: "",
            status: "FREE",
            queue: "",
            queueCount: 0,
            timestamp: serverTimestamp()
        };
    }
}