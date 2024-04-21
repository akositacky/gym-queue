import {
    Box,
    Button,
    CloseButton,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    // Textarea,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
// import usePostStore from "../../store/postStore";
// import useUserProfileStore from "../../store/userProfileStore";
// import { useLocation } from "react-router-dom";
import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { firestore, storage, db } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { ref as firebaseRef, onValue, set } from "firebase/database";
// import useEquipmentsStore from "../../store/equipmentStore";

const CreateEquipment = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const showToast = useShowToast();
    const { isLoading, handleCreateEquipment } = useCreateEquipment();

    const handlePostCreation = async () => {
        try {
            await handleCreateEquipment(selectedFile, caption);
            onClose();
            setCaption("");
            setSelectedFile(null);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"Create"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                {/* <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Create Equipment</Box>
                </Flex> */}

                <Button
                    mt={5}
                    flex={1}
                    onClick={onOpen}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                        bg: 'blue.500',
                    }}
                    _focus={{
                        bg: 'blue.500',
                    }}>
                    Create Equipment
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />

                <ModalContent bg={"white"} border={"1px solid gray"}>
                    <ModalHeader>Create Equipment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input
                            placeholder='Equipment Name...'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

                        <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

                        <BsFillImageFill
                            onClick={() => imageRef.current.click()}
                            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                            size={16}
                        />
                        {selectedFile && (
                            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                                <Image src={selectedFile} alt='Selected img' />
                                <CloseButton
                                    position={"absolute"}
                                    top={2}
                                    right={2}
                                    onClick={() => {
                                        setSelectedFile(null);
                                    }}
                                />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateEquipment;

function useCreateEquipment() {
    const showToast = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    // const createPost = useEquipmentsStore((state) => state.createEquipment);
    // const addPost = useUserProfileStore((state) => state.addPost);
    // const userProfile = useUserProfileStore((state) => state.userProfile);
    // const { pathname } = useLocation();

    const handleCreateEquipment = async (selectedFile, caption) => {
        if (isLoading) return;
        if (!selectedFile) throw new Error("Please select an image");
        setIsLoading(true);
        const newEquipmentCollection = {
            name: caption,
            inQueue: [],
            createdAt: Date.now(),
            createdBy: authUser.uid,
            isActive: true,
            timeUsage: 10,
        };

        try {

            // Add to Firestore Database
            const postDocRef = await addDoc(collection(firestore, "equipments"), newEquipmentCollection);
            const imageRef = ref(storage, `equipments/${postDocRef.id}`);

            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(postDocRef, { imageURL: downloadURL });

            const q = query(collection(firestore, "equipments"));
            const querySnapshot = await getCountFromServer(q);
            const equipmentCount = querySnapshot.data().count;

            // Add to Realtime Database
            const newRT = {
                RFID: "",
                User: "",
                queue: "",
                queueCount: 0,
                status: "FREE",
            }

            const equipmentName = 'gymEq' + equipmentCount;

            await set(firebaseRef(db, 'equipments/' + equipmentName), newRT);
            await updateDoc(postDocRef, { equipmentName: equipmentName });

            // newEquipmentCollection.imageURL = downloadURL;
            // if (userProfile.uid === authUser.uid) createPost({ ...newEquipmentCollection, id: postDocRef.id });
            // if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newEquipmentCollection, id: postDocRef.id });

            showToast("Success", "Equipment created successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreateEquipment };
}

// 1- COPY AND PASTE AS THE STARTER CODE FOR THE CRAETEPOST COMPONENT
// import { Box, Flex, Tooltip } from "@chakra-ui/react";
// import { CreatePostLogo } from "../../assets/constants";

// const CreatePost = () => {
// 	return (
// 		<>
// 			<Tooltip
// 				hasArrow
// 				label={"Create"}
// 				placement='right'
// 				ml={1}
// 				openDelay={500}
// 				display={{ base: "block", md: "none" }}
// 			>
// 				<Flex
// 					alignItems={"center"}
// 					gap={4}
// 					_hover={{ bg: "whiteAlpha.400" }}
// 					borderRadius={6}
// 					p={2}
// 					w={{ base: 10, md: "full" }}
// 					justifyContent={{ base: "center", md: "flex-start" }}
// 				>
// 					<CreatePostLogo />
// 					<Box display={{ base: "none", md: "block" }}>Create</Box>
// 				</Flex>
// 			</Tooltip>
// 		</>
// 	);
// };

// export default CreatePost;

// 2-COPY AND PASTE FOR THE MODAL
{
    /* <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />

                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Textarea placeholder='Post caption...' />

                        <Input type='file' hidden />

                        <BsFillImageFill
                            style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
                            size={16}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3}>Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */
}