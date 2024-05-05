import { Avatar, Box, Button, Center, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react"
import useEquipmentQueue from "../../hooks/useEquipmentQueue";
import useAuthStore from "../../store/authStore";
import PendingItem from "./components/PendingItem";
import UseItem from "./components/UseItem";
import { useEffect } from "react";
import NextQueuePage from "../../pages/NextQueue/NextQueuePage";
import EquipmentBox from "./assets/EquipmentBox";
import { numberSuffix } from "../../utils/numberSuffix";
import { useState } from "react";

const EquipmentDetails = ({ equipments, isOffline }) => {
    const { handleEquipmentQueue } = useEquipmentQueue(equipments);
    const authUser = useAuthStore((state) => state.user);

    const isPending = (equipments.User == authUser.uid) && equipments.status == "PENDING" ? true : false;
    const isUse = (equipments.User == authUser.uid) && equipments.status == "USE" ? true : false;
    const isNext = (equipments.User == authUser.uid) && equipments.status == "NEXT" ? true : false;

    const equipmentQueue = equipments.queue ? equipments.queue : [];
    const isQueue = (equipmentQueue.some(item => item.User === authUser.uid)) ? "INQUEUE" : false;
    const mode = isPending ? 'PENDING' : isQueue;

    const queueText = mode ? 'Remove Queue' : 'Join Queue';
    const queueButtonVariant = mode ? 'outline' : 'solid';
    const queueButtonColor = mode ? 'red' : 'blue';
    const queueButtonBG = mode ? 'white' : 'cyan.600';

    const queueLength = equipments ? equipments.queueCount : '';
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const { isOpen: isOpenLeave, onOpen: onOpenLeave, onClose: onCloseLeave } = useDisclosure({ defaultIsOpen: false });

    let queueNumber;
    let count = 0;
    equipmentQueue.map((e) => {
        count++;
        if (e.User === authUser.uid) {
            queueNumber = count;
        }
    });

    const handleClose = () => {
        onClose();
    }

    const handleClick = () => {
        !mode && onOpen();
        handleEquipmentQueue(mode);
    }

    const handleLeave = () => {
        onCloseLeave();
        handleEquipmentQueue("LEAVE");
    }

    const isInQueueLength = (queueLength >= 1 && isQueue) ? true : false;
    const { isOpen: queueOpen, onClose: queueClose } = useDisclosure({ defaultIsOpen: isInQueueLength });
    const { isOpen: timeUsageisOpen, onOpen: timeUsageOnOpen, onClose: timeUsageOnClose } = useDisclosure();
    const [value, setValue] = useState('5');

    useEffect(() => {
        function vibrate() {
            if (!window) {
                return;
            }

            if (!window.navigator) {
                return;
            }

            if (!window.navigator.vibrate) {
                return;
            }

            window.navigator.vibrate([200, 100, 200]);
        }

        if (isPending || queueOpen) {
            vibrate();
        }
    }, [isPending, queueOpen])

    const handleSetTimeUsage = () => {
        // handleClick()
        !mode && onOpen();
        handleEquipmentQueue(mode, value);
        timeUsageOnClose();
    }

    return (
        <>
            {!isOffline && (
                <>
                    <Modal
                        isOpen={isPending && isOpen}
                        onClose={handleClose}
                        size={{ base: "xs", md: "xl" }}
                    >
                        <ModalOverlay />

                        <ModalContent
                            border={"1px solid gray"}
                        >
                            <ModalHeader
                                bgGradient='linear(to-r, cyan.500, blue.500)'
                                color='white'
                            >{equipments.name}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6} alignContent='center'>
                                <Text
                                    align="center"
                                    fontWeight="bold"
                                    my={2}
                                    fontSize={'22px'}
                                >
                                    You&lsquo;re turn on queue!
                                </Text>
                                <Center>
                                    <Image
                                        objectFit='contain'
                                        // width={{ base: '80px', sm: '80px' }}
                                        // minH={{ base: '80px', sm: '80px' }}
                                        // h='100%'
                                        w='50%'
                                        mt={5}
                                        src={equipments.imageURL}
                                        alt='Caffe Latte'
                                        zIndex='-99'
                                    // border="1px solid"
                                    // borderColor="cyan.200"
                                    // borderRadius='lg'
                                    />
                                </Center>

                                {/* {rfids && (rfids.length > 0) && (
              <Select placeholder='Select bracelet' variant='filled' onChange={e => setRFID(e.target.value)}>
                {rfids.filter((data) => !data.isUsing).map((data) => (
                  <option key={data.id} value={data.RFIDcode}>{data.RFIDname}</option>
                ))}
              </Select>
            )} */}
                            </ModalBody>

                            <ModalFooter>
                                <Text
                                    fontWeight="bold"
                                    mx={'auto'}
                                >
                                    Please go and scan your bracelet to the {equipments.name} equipment.
                                </Text>
                            </ModalFooter>
                        </ModalContent>
                    </Modal >

                    <Modal
                        isOpen={isOpenLeave}
                        onClose={onCloseLeave}
                        size={{ base: "xs", md: "xl" }}
                    >
                        <ModalOverlay />

                        <ModalContent
                            border={"1px solid gray"}
                        >
                            <ModalHeader
                            // bgGradient='linear(to-r, cyan.500, blue.500)'
                            // color='white'
                            >Leaving Equipment</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6} alignContent='center'>
                                <Text
                                    align="center"
                                    fontWeight="bold"
                                    my={2}
                                >
                                    Do you want to leave your equipment?
                                </Text>
                                <Button
                                    onClick={() => handleLeave()}
                                >
                                    Leave
                                </Button>
                            </ModalBody>
                        </ModalContent>
                    </Modal >

                    <Modal
                        isOpen={timeUsageisOpen}
                        onClose={timeUsageOnClose}
                        size={{ base: "xs", md: "xl" }}
                    >
                        <ModalOverlay />

                        <ModalContent
                            border={"1px solid gray"}
                        >
                            <ModalHeader
                            // bgGradient='linear(to-r, cyan.500, blue.500)'
                            // color='white'
                            >Select Time Usage</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6} alignContent='center'>
                                <Text
                                    align="center"
                                    fontWeight="bold"
                                    my={2}
                                >
                                    Please select time usage for the equipment
                                </Text>
                                <Text>
                                    Time value: {value}
                                </Text>
                                <RadioGroup onChange={setValue} value={value} defaultValue='5'>
                                    <Stack direction='row'>
                                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width={'100%'} my={5} >
                                            <Radio value='5'>5 Minutes</Radio>
                                            <Radio value='10'>10 Minutes</Radio>
                                            <Radio value='15'>15 Minutes</Radio>
                                            <Radio value='20'>20 Minutes</Radio>
                                            <Radio value='25'>25 Minutes</Radio>
                                            <Radio value='30'>30 Minutes</Radio>
                                        </SimpleGrid>
                                    </Stack>
                                </RadioGroup>

                                <Button
                                    onClick={() => handleSetTimeUsage()}
                                >
                                    Submit
                                </Button>
                            </ModalBody>
                        </ModalContent>
                    </Modal >

                    {queueNumber && (
                        <Modal
                            isOpen={queueOpen}
                            onClose={queueClose}
                            size={{ base: "xs", md: "xl" }}
                        >
                            <ModalOverlay />
                            <ModalContent
                                border={"1px solid gray"}
                            >
                                <ModalHeader
                                    bgGradient='linear(to-r, cyan.500, blue.500)'
                                    color='white'
                                > {equipments.name}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6} alignContent='center'>
                                    <Text
                                        align="center"
                                        fontWeight="bold"
                                        my={2}
                                    >
                                        You are {queueNumber}{numberSuffix(queueLength)} in queue
                                    </Text>
                                </ModalBody>
                            </ModalContent>
                        </Modal >
                    )}
                </>
            )}

            {isPending && (
                <PendingItem equipments={equipments} handleClick={handleClick} />
            )}

            {isUse && (
                <UseItem equipments={equipments} handleClick={handleLeave} onOpenLeave={onOpenLeave} />
            )}

            {isNext && (
                <NextQueuePage equipment={equipments.equipmentName} />
            )}

            {!isPending && !isUse && (
                <EquipmentBox>
                    <Box p={6}>
                        <Flex gap={2}>
                            <Avatar
                                size={'xl'}
                                src={equipments.imageURL}
                                mb={4}
                                pos={'relative'}
                                _after={{
                                    content: '""',
                                    w: 4,
                                    h: 4,
                                    bg: `${equipments.status !== "FREE" ? 'red.300' : 'green.300'}`,
                                    border: '2px solid white',
                                    rounded: 'full',
                                    pos: 'absolute',
                                    bottom: 0,
                                    right: 3,
                                }}
                            />
                            <Box
                                textAlign={'left'}
                            >
                                <Heading fontSize={'2xl'} fontFamily={'body'}>
                                    {equipments.name}
                                </Heading>
                                <Text fontWeight={600} color={'gray.500'} mb={4}>
                                    {/* {equipments.isActive ? 'Active' : 'Inactive'} */}
                                    {isQueue && (
                                        <Text
                                            fontWeight='bold'
                                        >You are {queueNumber}{numberSuffix(queueNumber)} in queue
                                        </Text>
                                    )}
                                </Text>
                            </Box>
                            <Box
                                textAlign={'right'}
                                flex={1}
                            >

                                {queueLength <= 0 ?
                                    (equipments.User != "" && (equipments.User != authUser.uid) && equipments.status !== 'NEXT') ? (
                                        <Text
                                            pt={3}
                                            as='b'
                                            fontSize='md'
                                            color={'red.600'}
                                            align={'center'}
                                        >
                                            Occupied
                                        </Text>

                                    ) : (
                                        <Text
                                            pt={3}
                                            as='b'
                                            fontSize='md'
                                            color={'green.600'}
                                            align={'center'}
                                        >
                                            Available
                                        </Text>
                                    )
                                    : (
                                        <Text
                                            pt={2}
                                            as='b'
                                            fontSize='sm'
                                            color={queueLength <= 0 ? 'green.600' : ''}
                                            align={'center'}
                                        >
                                            Total queue: {queueLength}
                                        </Text>
                                    )}

                                {/* <Text mb={4} fontWeight={'bold'} fontSize='sm'>
                                    Equipment Usage: {equipments.timeUsage} mins
                                </Text> */}
                            </Box>
                        </Flex>
                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                variant={queueButtonVariant}
                                onClick={timeUsageOnOpen}
                                fontSize={'sm'}
                                rounded={'full'}
                                isDisabled={isOffline}
                                bg={isOffline ? 'gray' : queueButtonBG}
                                colorScheme={isOffline ? 'gray' : queueButtonColor}
                                boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                }
                                _hover={{
                                    bg: `${queueButtonVariant == "solid" ? 'cyan.700' : 'gray.100'}`,
                                }}
                                _focus={{
                                    bg: `${queueButtonVariant == "solid" ? 'cyan.700' : 'gray.100'}`,
                                }}>
                                {queueText}
                            </Button>
                        </Stack>
                    </Box>
                </EquipmentBox>
            )}
        </>
    )
}


export default EquipmentDetails