import { Badge, Box, Button, Container, Flex, Heading, Input, Spacer, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { useState } from 'react';
import useGetRFID from '../../hooks/useGetRFID';
import { GrAdd } from 'react-icons/gr';
import useShowToast from '../../hooks/useShowToast';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, firestore } from '../../firebase/firebase';
import userRFIDStore from '../../store/rfidStore';

const RFIDPage = () => {
    const { rfids, isLoading } = useGetRFID();
    const [userQuery, setUserQuery] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleUpdateRFID } = useAddRFID();
    const showToast = useShowToast();

    const [inputs, setInputs] = useState({
        RFIDname: "",
        RFIDcode: "",
    });

    const handleAssignRFID = async () => {
        try {
            await handleUpdateRFID(inputs);
            onClose();
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    const rfidsData = rfids && rfids.filter((eventData) => {
        if (userQuery === "") return eventData
        else if (eventData.RFIDname.toLowerCase().includes(userQuery.toLowerCase())) { return eventData }
    });

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />

                <ModalContent bg={"white"} border={"1px solid gray"}>
                    <ModalHeader>Add RFID</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex >
                            <Stack gap={5} w={"full"}>
                                <FormControl>
                                    <FormLabel fontSize={"sm"}>RFID Name</FormLabel>
                                    <Input
                                        placeholder={"RFID Name"}
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.RFIDname}
                                        onChange={(e) => setInputs({ ...inputs, RFIDname: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={"sm"}>RFID Code</FormLabel>
                                    <Input
                                        placeholder={"RFID Code"}
                                        size={"sm"}
                                        type={"text"}
                                        value={inputs.RFIDcode}
                                        onChange={(e) => setInputs({ ...inputs, RFIDcode: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={handleAssignRFID} isLoading={isLoading}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Container maxW={"container.xl"} py={10}>
                <Box p={4}>
                    <Heading as='h4' size='md' pb={4}>
                        RFID
                    </Heading>
                    <Flex gap={2}>
                        <Text>
                            RFID Name:
                        </Text>
                        <Spacer />
                        <Input onChange={e => setUserQuery(e.target.value)} placeholder='' size='sm' />
                        <Button size='sm' leftIcon={<GrAdd />} colorScheme=' blue' variant='solid' onClick={onOpen}>
                            Add RFID
                        </Button>
                    </Flex>
                    <TableContainer>
                        <Table size='sm' __css={{ 'table-layout': 'fixed', width: 'full' }} variant='striped' >
                            <Thead>
                                <Tr>
                                    <Th>RFID Name</Th>
                                    <Th>RFID Code</Th>
                                    <Th>Active</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {rfidsData && rfidsData.map((data) => (
                                    <Tr key={data.id}>
                                        <Td>{data.RFIDname}</Td>
                                        <Td>{data.RFIDcode}</Td>
                                        <Td>{data.active ? (
                                            <>
                                                <Badge colorScheme='green'>ACTIVE</Badge>
                                            </>
                                        ) : (
                                            <>
                                                <Badge colorScheme='red'>INACTIVE</Badge>
                                            </>
                                        )}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </>

    )
}

function useAddRFID() {
    const showToast = useShowToast();
    const [isLoadingAdd, setIsLoading] = useState(false);
    // const createRFIDS = userRFIDStore((state) => state.createRFIDS);
    const { rfids, setRFIDS, createRFIDS } = userRFIDStore();

    const handleUpdateRFID = async (RFIDdata) => {
        if (isLoadingAdd) return;
        setIsLoading(true);

        try {
            const newData = {
                ...RFIDdata,
                active: true,
            }
            await addDoc(collection(firestore, "rfid"), newData);
            rfids === null ? setRFIDS([newData]) : createRFIDS(newData);
            showToast("Success", "RFID updated successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoadingAdd, handleUpdateRFID };
}


// function useCreateRFID() {
//     const showToast = useShowToast();
//     const [isLoading, setIsLoading] = useState(false);
//     // const authUser = useAuthStore((state) => state.user);
//     // const createPost = useEquipmentsStore((state) => state.createEquipment);
//     // const addPost = useUserProfileStore((state) => state.addPost);
//     // const userProfile = useUserProfileStore((state) => state.userProfile);
//     // const { pathname } = useLocation();

//     const handleCreateEquipment = async (RFIDname) => {
//         if (isLoading) return;
//         // if (!selectedFile) throw new Error("Please select an image");
//         setIsLoading(true);
//         const newEquipmentCollection = {
//             RFIDname,
//             isActive: true,
//         };

//         try {

//             // Add to Firestore Database
//             const postDocRef = await addDoc(collection(firestore, "rfid"), newEquipmentCollection);
//             // const imageRef = ref(storage, `equipments/${postDocRef.id}`);

//             // await uploadString(imageRef, selectedFile, "data_url");
//             // const downloadURL = await getDownloadURL(imageRef);
//             // await updateDoc(postDocRef, { imageURL: downloadURL });

//             // const q = query(collection(firestore, "equipments"));
//             // const querySnapshot = await getCountFromServer(q);
//             // const equipmentCount = querySnapshot.data().count;

//             // // Add to Realtime Database
//             // const newRT = {
//             //     value: 0,
//             // }

//             // const equipmentName = 'gymEq' + equipmentCount;

//             // await set(firebaseRef(db, 'equipments/' + equipmentName), newRT);
//             // await updateDoc(postDocRef, { equipmentName: equipmentName });

//             // newEquipmentCollection.imageURL = downloadURL;
//             // if (userProfile.uid === authUser.uid) createPost({ ...newEquipmentCollection, id: postDocRef.id });
//             // if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newEquipmentCollection, id: postDocRef.id });

//             showToast("Success", "Post created successfully", "success");
//         } catch (error) {
//             showToast("Error", error.message, "error");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return { isLoading, handleCreateEquipment };
// }

export default RFIDPage