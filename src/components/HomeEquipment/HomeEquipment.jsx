import { Box, Container, Flex, Heading, Link, SimpleGrid, Skeleton, Spacer, Spinner, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import useAuthStore from '../../store/authStore';
import { InfoIcon } from '@chakra-ui/icons';
import useGetEquipment from '../../hooks/useGetEquipments';
import EquipmentDetails from './EquipmentDetails';

const HomeEquipment = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    // const isPendingData = equipments && equipments.filter((e) => e.User === authUser.uid);
    // const boolPendingData = (isPendingData && isPendingData.length > 0) ? true : false;
    const authUser = useAuthStore((state) => state.user);
    const { isLoading, equipments } = useGetEquipment();
    // const { isOpen: queueOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    if (!authUser) return <Spinner />;
    if (!equipments) return <Spinner />;

    const isPendingData = equipments && equipments.filter((e) => e.User === authUser.uid && e.status === "USE");
    const boolPendingData = (isPendingData && isPendingData.length > 0) ? true : false;

    // const pendingItem = equipments && equipments.filter((e) => (e.queue && e.queue.some(item => item.User === authUser.uid)));
    // const pendingItemQueue = pendingItem ? true : false;

    // e.User === authUser.uid && e.status === "PENDING"
    // const isQueue = () ? "INQUEUE" : false;

    const isOffline = authUser.RFIDcode === '' ? true : false;

    // const isPending = (equipments.User == authUser.uid) && equipments.status == "PENDING" ? true : false;
    // const isUse = (equipments.User == authUser.uid) && equipments.status == "USE" ? true : false;
    // const isNext = (equipments.User == authUser.uid) && equipments.status == "NEXT" ? true : false;

    return (
        <>
            <Container maxW={"container.xl"} pb={'100px'} >
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
                    {isOffline ? '' : 'Welcome, you can now queue to the equipments!'}
                </Heading>
                {boolPendingData && (
                    <Flex
                        pr={2}
                        my={5}
                        bgGradient='linear(to-r, green.300, green.400)'
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
                            {isPendingData[0].name}!
                        </Link>
                    </Flex>
                )}

                <Flex py={3} pb={5} pt={5} >
                    <Heading as='h6' size='xs' color='gray.500' >
                        Available Equipments ({`${equipments ? equipments.length : ''}`})
                    </Heading>
                    <Spacer />
                    <Flex alignItems='center' gap='2'>
                        {!isOffline ? (
                            <>
                                <Stack>
                                    <Flex
                                        alignItems="center" gap={2}
                                        marginLeft="auto"
                                        textAlign="right"
                                    >
                                        <Box h={3} w={3} bgColor='green' borderRadius='full' boxShadow='dark-lg' />
                                        <Text
                                            as='b'
                                            fontSize='xs'
                                            color='gray.600'
                                        >
                                            Available
                                        </Text>
                                    </Flex>
                                    <Text
                                        as='b'
                                        fontSize='xs'
                                        color='gray.600'
                                    >
                                        Currently Using: {authUser.RFIDname}
                                    </Text>
                                </Stack>
                            </>
                        ) : (
                            <>
                                <Box h={3} w={3} bgColor='gray' borderRadius='full' boxShadow='dark-lg' />
                                <Text
                                    as='b'
                                    fontSize='xs'
                                    color='gray.600'
                                >
                                    Unavailable
                                </Text>
                                <Tooltip size="xs" label="Please go to your administrator" fontSize='md'>
                                    <InfoIcon w={4} color={'gray.600'} />
                                </Tooltip>
                            </>
                        )}
                    </Flex>
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
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
                        equipments.map((post) => <EquipmentDetails key={post.id} equipments={post} isOffline={isOffline} />)
                    }

                    {/* {!isLoading && equipments.length > 0 &&
                        equipments.map((post) => <EquipmentItem key={post.id} equipments={post} isOffline={isOffline} />)
                    } */}
                </SimpleGrid>

                {!isLoading && equipments.length === 0 && (
                    <>
                        <Flex>
                            <Text fontSize={"md"} color={"red.400"}>
                                Getting equipments...
                            </Text>
                            <Spinner />
                        </Flex>
                    </>
                )}
            </Container>
        </>
    )
}

export default HomeEquipment;

