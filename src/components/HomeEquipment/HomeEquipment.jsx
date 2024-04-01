import { Box, Container, Flex, Heading, Link, SimpleGrid, Skeleton, Spacer, Spinner, Text, Tooltip, VStack } from '@chakra-ui/react'
import useGetEquipment from '../../hooks/useGetEquipments';
import EquipmentItem from './EquipmentItem';
import useAuthStore from '../../store/authStore';
import { InfoIcon, SpinnerIcon } from '@chakra-ui/icons';

const HomeEquipment = () => {
    const { isLoading, equipments } = useGetEquipment();
    // const isLoading = false;
    // const equipments = [
    //     {
    //         "id": "47dd80UwD3xYBbfNvYOv",
    //         "name": "Treadmill",
    //         "imageURL": "/assets/treadmill.jpg",
    //         // "imageURL": "https://firebasestorage.googleapis.com/v0/b/gym-locker.appspot.com/o/equipments%2F47dd80UwD3xYBbfNvYOv?alt=media&token=486a0268-8c0f-4db7-9e13-9858be76f789",
    //         "equipmentName": "gymEq1",
    //         "createdBy": "BYS1FyBXU6crb0K1d0FvdNpRY192",
    //         "createdAt": 1710445034444,
    //         "inQueue": [
    //             "JY3qwUYP0QSHA8mvVZErHIigzJI3"
    //         ],
    //     },
    //     {
    //         "id": "8vs5WVe8xff0X1YDt3Ut",
    //         "inQueue": [
    //             "JY3qwUYP0QSHA8mvVZErHIigzJI3"
    //         ],
    //         "createdAt": 1710446306234,
    //         "imageURL": "/assets/chestpress.jpg",
    //         // "imageURL": "https://firebasestorage.googleapis.com/v0/b/gym-locker.appspot.com/o/equipments%2F8vs5WVe8xff0X1YDt3Ut?alt=media&token=6a8ceb6d-60d3-4ee2-b5f1-7a6b96110410",
    //         "createdBy": "BYS1FyBXU6crb0K1d0FvdNpRY192",
    //         "name": "Chest Press",
    //         "equipmentName": "gymEq2"
    //     },
    //     {
    //         "id": "EhMOPyQKrqOHrcKFI9sh",
    //         "createdBy": "BYS1FyBXU6crb0K1d0FvdNpRY192",
    //         "name": "Leg Press",
    //         "equipmentName": "gymEq3",
    //         "imageURL": "/assets/legpress.jpg",
    //         // "imageURL": "https://firebasestorage.googleapis.com/v0/b/gym-locker.appspot.com/o/equipments%2FEhMOPyQKrqOHrcKFI9sh?alt=media&token=a33034d0-d0c9-4217-8845-d396cb9da2dc",
    //         "inQueue": [
    //             "JY3qwUYP0QSHA8mvVZErHIigzJI3",
    //             "BYS1FyBXU6crb0K1d0FvdNpRY192"
    //         ],
    //         "createdAt": 1710448199322
    //     }
    // ];

    const authUser = useAuthStore((state) => state.user);
    // console.log('equipments', equipments);
    // console.log('authUser', authUser);
    // console.log('userIsInEquipment', userIsInEquipment);
    if (!authUser) return <Spinner />;
    const userIsInEquipment = authUser && equipments && authUser.inEquipment != '' ? equipments.filter((e) => e.id === authUser.inEquipment) : null;
    const isOffline = authUser.RFIDcode === '' ? true : false;

    return (
        <>
            <Container maxW={"container.xl"}>
                <Heading
                    as='h5'
                    size='sm'
                    pt={3}
                >
                    Hello, {authUser ? authUser.fullName : ''} 👋
                </Heading>
                <Heading
                    as='h5'
                    size='md'
                    fontWeight='bolder'
                    fontSize='27px'
                >
                    Welcome back!
                </Heading>
                {userIsInEquipment && userIsInEquipment.length > 0 && (
                    <Flex
                        pr={2}
                        my={5}
                        bgGradient='linear(to-r, cyan.500, blue.500)'
                        p={2}
                        borderRadius='10px'
                        color='white'
                    >
                        <Text fontWeight='bolder'>
                            You&apos;re currently using&nbsp;
                        </Text>
                        <Link
                            href='#'
                            fontWeight='bolder'
                            textShadow='0 0 3px white, 0 0 5px #0000FF'
                        >
                            {userIsInEquipment[0].name}!
                        </Link>
                    </Flex>
                )}

                <Flex
                    py={3}
                    pb={5}
                    pt={5}
                >
                    <Heading
                        as='h6'
                        size='xs'
                        color='gray.500'
                    >
                        Available Equipments ({`${equipments ? equipments.length : ''}`})
                    </Heading>
                    <Spacer />
                    <Flex alignItems='center' gap='2'>
                        {!isOffline ? (
                            <>
                                <Box h={3} w={3} bgColor='green' borderRadius='full' boxShadow='dark-lg' />
                                <Text
                                    as='b'
                                    fontSize='xs'
                                    color='gray.600'
                                >
                                    Online (On gym)
                                </Text>
                            </>
                        ) : (
                            <>
                                <Box h={3} w={3} bgColor='gray' borderRadius='full' boxShadow='dark-lg' />
                                <Text
                                    as='b'
                                    fontSize='xs'
                                    color='gray.600'
                                >
                                    Offline
                                </Text>
                                <Tooltip size="xs" label="Please go to your administrator" fontSize='md'>
                                    <InfoIcon w={4} color={'gray.600'} />
                                </Tooltip>
                            </>
                        )}
                    </Flex>
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2}>
                    {isLoading &&
                        [0, 1, 2].map((_, idx) => (
                            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10} pt={5}>
                                <Skeleton w={"full"}>
                                    <Box h={"300px"}>contents wrapped</Box>
                                </Skeleton>
                                <Flex gap='2' pt={2}>
                                    <VStack gap={2} alignItems={"flex-start"}>
                                        <Skeleton height='20px' w={"150px"} />
                                        <Skeleton height='10px' w={"200px"} />
                                        <Skeleton height='10px' w={"200px"} />
                                    </VStack>
                                </Flex>
                            </VStack>
                        ))}

                    {!isLoading && equipments.length > 0 &&
                        equipments.map((post) => <EquipmentItem key={post.id} equipments={post} isOffline={isOffline} />)
                    }
                </SimpleGrid>
                {!isLoading && equipments.length === 0 && (
                    <>
                        <Text fontSize={"md"} color={"red.400"}>
                            Getting equipments...
                            <Spinner />
                        </Text>
                    </>
                )}
            </Container>
        </>
    )
}

export default HomeEquipment;

