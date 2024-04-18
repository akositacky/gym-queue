import { Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { RiRfidFill } from "react-icons/ri";
import { GrClear } from "react-icons/gr";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import useUsersStore from "../../store/usersStore";
import { firestore } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useGetRFID from "../../hooks/useGetRFID";
import userRFIDStore from "../../store/rfidStore";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { rtdbRemoveCurrent } from "../../utils/rtdbData";

const UsersRowAction = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const { isLoading, handleUpdateRFID } = useSetRFID();
  const [RFID, setRFID] = useState(user.RFIDcode)
  const { rfids } = useGetRFID();
  const [userID, setUserID] = useState();

  const handleAssignRFID = async () => {
    try {
      const rfidName = rfids && rfids.filter((data) => data.RFIDcode === RFID);
      await handleUpdateRFID('update', userID, rfidName);
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleClearRFID = async (userUID, RFID) => {
    try {
      const rfidName = rfids && rfids.filter((data) => data.RFIDcode === RFID);
      await handleUpdateRFID('clear', userUID, rfidName);
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />

        <ModalContent bg={"white"} border={"1px solid gray"}>
          <ModalHeader>Assign RFID</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {rfids && (rfids.length > 0) && (
              <Select placeholder='Select bracelet' variant='filled' onChange={e => setRFID(e.target.value)}>
                {rfids.filter((data) => !data.isUsing).map((data) => (
                  <option key={data.id} value={data.RFIDcode}>{data.RFIDname}</option>
                ))}
              </Select>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleAssignRFID} isLoading={isLoading}>
              Assign
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <IconButton
          colorScheme='teal'
          fontSize='15px'
          size='xs'
          onClick={() => { onOpen(); setUserID(user.uid) }}
          isLoading={isLoading}
          icon={<RiRfidFill />}
          isDisabled={user.RFIDcode !== "" ? true : false}
        />
        <IconButton
          colorScheme='red'
          fontSize='15px'
          size='xs'
          isLoading={isLoading}
          onClick={() => { handleClearRFID(user.uid, user.RFIDcode); }}
          icon={<GrClear />}
          isDisabled={user.RFIDcode === "" ? true : false}
        />
      </Flex>
    </>

  )
}

function useSetRFID() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = useUsersStore((state) => state.updateUser);
  const updateRFIDS = userRFIDStore((state) => state.updateRFIDS);

  const handleUpdateRFID = async (action, userUID, RFIDdata) => {
    if (isLoading) return;
    setIsLoading(true);

    const userDocRef = doc(firestore, "users", userUID);
    try {
      if (RFIDdata.length > 0) {
        const { RFIDcode, RFIDname, id } = RFIDdata[0];

        const updateData = {
          RFIDcode: action === 'update' ? RFIDcode : '',
          RFIDname: action === 'update' ? RFIDname : '',
        };

        await updateDoc(userDocRef, updateData);

        const falseData = { isUsing: action === 'update' ? true : false };
        const rfidRef = doc(firestore, "rfid", id);
        await updateDoc(rfidRef, falseData);

        updateRFIDS(RFIDcode, falseData)
        updateUser(userUID, updateData);

        console.log('userUID', userUID);

        let realtimeResponse = [];

        const db = getDatabase();
        const starCountRef = ref(db, 'equipments');
        onValue(starCountRef, (snapshot) => {
          const equipments = snapshot.val();
          realtimeResponse = equipments;
        });

        console.log(action, realtimeResponse);

        if (action === 'clear') {
          console.log('clearrr');
          for (let rtdb in realtimeResponse) {
            const equipmentData = realtimeResponse[rtdb];
            const queue = equipmentData.queue;

            // Check if nasa array
            const queueFilter = queue !== "" ? queue.filter((e) => e.User === userUID) : null;

            if (equipmentData.User === userUID) {
              console.log('baka')
              // await set(ref(db, "equipments/" + rtdb), rtdbRemoveCurrent(equipmentData));
            } else if (queueFilter) {
              const filtered = queue.filter((e) => e.User !== userUID);
              const filteredQueue = filtered.length > 0 ? filtered : "";
              // const filtered = realtimeQueue.length > 0 ? realtimeQueue.filter(item => item.User !== authUser.uid) : [];

              // const rtdbUpdateData = {
              //   RFID: equipmentData.RFID,
              //   User: equipmentData.User,
              //   queue: filteredQueue,
              //   queueCount: queue.length - 1,
              //   status: equipmentData.status,
              // };
              // await set(ref(db, "equipments/" + rtdb), rtdbUpdateData);
            }
          }
          const userRef = doc(firestore, "users", userUID);
          await updateDoc(userRef, { inQueue: [] });
        }

        showToast("Success", "RFID updated successfully", "success");
      } else {
        showToast("Error", "No RFID assigned", "error");
      }

    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleUpdateRFID };
}
export default UsersRowAction