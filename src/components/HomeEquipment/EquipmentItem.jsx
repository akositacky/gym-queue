import { Badge, Box, Button, Center, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import useEquipmentQueue from "../../hooks/useEquipmentQueue";
import useAuthStore from "../../store/authStore";
import { useState } from "react";

const EquipmentItem = ({ equipments, isOffline }) => {
    const { handleEquipmentQueue } = useEquipmentQueue(equipments);
    const authUser = useAuthStore((state) => state.user);

    const isPending = (equipments.User == authUser.uid) && equipments.status == "PENDING" ? "PENDING" : false;
    const isUse = (equipments.User == authUser.uid) && equipments.status == "USE" ? true : false;

    const equipmentQueue = equipments.queue ? equipments.queue : [];
    const isQueue = (equipmentQueue.some(item => item.User === authUser.uid)) ? "INQUEUE" : false;
    const mode = isPending ? 'PENDING' : isQueue;

    const queueText = mode ? 'Remove Queue' : 'Join Queue';
    const queueButtonVariant = mode ? 'outline' : 'solid';
    const queueButtonColor = mode ? 'red' : 'blue';
    const queueButtonBG = mode ? 'white' : 'cyan.600';

    const queueLength = equipments ? equipments.queueCount : '';
    const personsText = queueLength > 1 ? 'persons' : 'person';

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const isPendingData = equipments.User === authUser.uid && equipments.status == "PENDING" ? true : false;

    const { isOpen: isOpenLeave, onOpen: onOpenLeave, onClose: onCloseLeave } = useDisclosure({ defaultIsOpen: false });

    const equipmentBgColor = isOffline ? 'gray.200' : (isUse && 'gray.50') || (isPending && 'yellow.100') || (isQueue && 'blue.100');

    let queueNumber;
    let count = 0;
    equipmentQueue.map((e) => {
        count++;
        if (e.User === authUser.uid) {
            queueNumber = count;
        }
    });

    // bgColor={'green.500'}
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

    return (
        <>
            <Modal
                isOpen={isPendingData && isOpen}
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
                    >You&lsquo;re turn on queue!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} alignContent='center'>
                        <Text
                            align="center"
                            fontWeight="bold"
                            my={2}
                        >
                            Please go and scan your bracelet to the {equipments.name} equipment.
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
                                border="1px solid"
                                borderColor="cyan.200"
                                borderRadius='lg'
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
                        {/* <Button mr={3} onClick={handleAssignRFID} isLoading={isLoading}>
              Assign
            </Button> */}
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

            <Flex
                // h={'120px'}
                // h='auto'
                boxShadow='base'
                borderRadius='md'
                p={2}
                bgColor={equipmentBgColor}
                bgGradient={isUse && 'linear(to-r, cyan.300, blue.400)'}
                direction='column'
            >
                <Flex>
                    <Link to={`/equipment/${equipments.equipmentName}`} >
                        <Image
                            objectFit='contain'
                            // width={{ base: '80px', sm: '80px' }}
                            // minH={{ base: '80px', sm: '80px' }}
                            h='100%'
                            w='80px'
                            src={equipments.imageURL}
                            alt='Caffe Latte'
                            zIndex='-99'
                            border="1px solid"
                            borderColor="cyan.200"
                            borderRadius='lg'
                        />
                    </Link>
                    <Stack
                        flex={1}
                        p={1}
                        px={2}
                        spacing='auto'
                    >
                        <Text
                            fontSize={{ base: 'xs', md: 'md' }}
                            as='b'
                        >
                            {equipments.name}
                        </Text>
                        <Spacer />
                        {isUse ? (
                            <Button
                                isDisabled={isOffline}
                                onClick={() => { onOpenLeave(); }}
                                variant='outline'
                                colorScheme='red'
                                size='xs'
                                fontSize={{ base: '10px' }}
                                bg='white'
                                px={3}
                                w='100%'
                            >
                                <Text mr={1}>
                                    Leave Equipment
                                </Text>
                            </Button>
                        ) : (
                            <Button
                                isDisabled={isOffline}
                                onClick={() => { handleClick() }}
                                variant={queueButtonVariant}
                                colorScheme={isOffline ? 'gray' : queueButtonColor}
                                size='xs'
                                fontSize={{ base: '10px' }}
                                bg={isOffline ? 'gray' : queueButtonBG}
                                px={3}
                                w='100%'
                            >
                                <Text mr={1}>
                                    {queueText}
                                </Text>
                                {/* {queueLength == 0 ? (
                                <Text
                                    mr={1}
                                >
                                    Use Equipment!
                                </Text>
                            ) : (
                               
                            )} */}

                            </Button>
                        )}
                    </Stack>
                    <Spacer />
                    {!isUse && (
                        <Stack
                            p={2}
                            spacing='0'
                            borderRadius='full'
                            bgGradient={queueLength > 0 ? 'linear(to-r, green.500, teal.500)' : ''}
                            color={queueLength > 0 ? 'white' : 'black'}
                        >
                            <Center>
                                <Text
                                    pt={queueLength <= 0 ? 3 : 2}
                                    as='b'
                                    fontSize='md'
                                    color={queueLength <= 0 ? 'green.600' : ''}
                                    align={'center'}
                                >
                                    {queueLength <= 0 ? ((equipments.User != "" && equipments.User != authUser.uid) ? `Has pending user` : 'Available') : queueLength}
                                </Text>
                            </Center>
                            <Center>
                                <Text
                                    fontSize='10px'
                                    w={16}
                                    align='center'
                                    lineHeight='10px'
                                    color={queueLength <= 0 ? 'green.600' : ''}
                                >
                                    {/* {queueLength <= 0 ? ((equipments.User != "" && equipments.User != authUser.uid) ? '' : '') : 'in queue'} */}
                                    {queueLength <= 0 ? '' : `${personsText} in queue`}
                                </Text>
                            </Center>
                        </Stack>
                    )}
                </Flex >
                <Box>
                    {isPending && (
                        <>

                            <Flex
                                mt={2}
                                py={1}
                                borderRadius='10px'
                                fontSize={{ base: 'xs', md: 'sm' }}
                                fontWeight='bold'
                                border="1px solid"
                                borderColor="cyan.200"
                                direction='row' alignItems='center' mx='auto' bgColor='white' justifyContent='center'>
                                {/* <Text
                                    align='center'
                                    color='yellow.600'
                                    mr={1}
                                >Pending. </Text> */}
                                <Badge mr={1} colorScheme='yellow' >
                                    Pending
                                </Badge>
                                <Text
                                    align='center'
                                >Please go to the equipment and scan</Text>
                            </Flex >
                        </>

                    )}

                    {isQueue && (
                        <>
                            <Flex
                                mt={2}
                                py={1}
                                borderRadius='10px'
                                fontSize={{ base: 'xs', md: 'sm' }}
                                fontWeight='bold'
                                border="1px solid"
                                borderColor="cyan.200"
                                direction='row' alignItems='center' mx='auto' bgColor='white' justifyContent='center'>
                                {/* <Text
                                    align='center'
                                    color='yellow.600'
                                    mr={1}
                                >Pending. </Text> */}
                                <Text
                                    align='center'
                                >You are #{queueNumber} in queue </Text>
                                {/* <Badge ml={.5} colorScheme='blue' >
                                    In queue
                                </Badge> */}
                            </Flex >
                        </>

                    )}

                    {isUse && (
                        <>
                            <Flex
                                mt={2}
                                py={1}
                                bgColor={'green.500'}
                                color={'white'}
                                // bgColor='white'
                                borderRadius='10px'
                                fontSize={{ base: 'xs', md: 'sm' }}
                                fontWeight='bold'
                                border="1px solid"
                                borderColor="cyan.200"
                                direction='row' alignItems='center' mx='auto' justifyContent='center'>
                                <Text
                                    align='center'
                                >You are currently using this equipment!</Text>
                                {/* <Badge ml={.5} colorScheme='green' >
                                    using
                                </Badge>
                                <Text
                                    align='center'
                                >this equipment</Text> */}
                            </Flex >
                        </>

                    )}
                </Box>
            </Flex >
        </>
    )
}


export default EquipmentItem