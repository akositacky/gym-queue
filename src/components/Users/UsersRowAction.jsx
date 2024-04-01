import { Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, useDisclosure } from "@chakra-ui/react";
import { RiRfidFill } from "react-icons/ri";
import { GrClear } from "react-icons/gr";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import useUsersStore from "../../store/usersStore";
import { firestore } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useGetRFID from "../../hooks/useGetRFID";
import userRFIDStore from "../../store/rfidStore";

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