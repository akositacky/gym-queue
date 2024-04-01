import { Badge, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";

const EquipmentItemAdmin = ({ equipments }) => {
    const authUser = useAuthStore((state) => state.user);
    const [isDeleting, setIsDeleting] = useState(false);
    const showToast = useShowToast();

    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this equipment?")) return;
        if (isDeleting) return;

        try {
            const imageRef = ref(storage, `equipments/${equipments.id}`);
            await deleteObject(imageRef);
            // const userRef = doc(firestore, "users", authUser.uid);
            await deleteDoc(doc(firestore, "equipments", equipments.id));

            // await updateDoc(userRef, {
            //     posts: arrayRemove(equipments.id),
            // });

            // deletePost(post.id);
            // decrementPostsCount(equipments.id);
            showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* <Link to={`/equipment/${equipments.equipmentName}`} w='100%'> */}
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                h={{ base: '100px', sm: '160px' }}
            >
                <Link to={`/equipment/${equipments.equipmentName}`} w='100%'>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '120px', sm: '120px' }}
                        h='100%'
                        src={equipments.imageURL}
                        alt='Caffe Latte'
                    />
                </Link>

                <Stack spacing={0} w='100%'>
                    <CardBody py={1} pt={3} spacing='24px' >
                        <Flex spacing='between' mb={1} >
                            <Heading size='xs'>{equipments.name}</Heading>
                            {/* <Spacer /> */}
                            <Spacer />
                            <Button
                                size={"sm"}
                                bg={"transparent"}
                                _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                                borderRadius={4}
                                p={1}
                                onClick={handleDeletePost}
                                isLoading={isDeleting}
                            >
                                <MdDelete size={20} cursor='pointer' />
                            </Button>
                        </Flex>
                        <Badge variant='subtle' colorScheme='green'>in Queue (2)</Badge>

                        {/* <Text fontSize='sm'>
                            Caffè latte
                        </Text> */}
                    </CardBody>
                    {authUser.userRole !== 'admin' && (
                        <CardFooter py={1} pb={3}>
                            <Button variant='solid' colorScheme='blue' size='sm' bg={'cyan.600'}>
                                Join Queue
                            </Button>
                        </CardFooter>
                    )}
                </Stack>
            </Card>
            {/* </Link> */}
        </>
    )
}

export default EquipmentItemAdmin