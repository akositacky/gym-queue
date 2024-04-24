import { Avatar, Box, Button, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import useEquipmentQueueDebug from "../../hooks/useEquipmentQueueDebug";
import { useState } from "react";
import useEquipmentQueue from "../../hooks/useEquipmentQueue";
import useUsersStore from "../../store/usersStore";

const EquipmentClear = ({ equipments }) => {
    const { handleEquipmentQueueClear, handleEquipmentTime, isUpdating } = useEquipmentQueueDebug(equipments);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleEquipmentQueue } = useEquipmentQueue(equipments);

    const [timeUsage, setTimeUsage] = useState(equipments.timeUsage);

    const { users } = useUsersStore();
    const userDetails = users ? users.filter((e) => e.uid == equipments.User)[0] : null;
    console.log('userDetails', userDetails);

    const timeUsageClick = async () => {
        await handleEquipmentTime(timeUsage);
        // navigate(0);
    }

    const handleNext = () => {
        handleEquipmentQueue("INQUEUE");
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />

                <ModalContent bg={"white"} border={"1px solid gray"}>
                    <ModalHeader>Set Time Usage</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input
                            placeholder='Minutes...'
                            value={timeUsage}
                            onChange={(e) => setTimeUsage(e.target.value)}
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3}
                            onClick={() => { timeUsageClick(); }}
                            isLoading={isUpdating}>
                            Set
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box
                // maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
            >
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
                            border: '2px solid white',
                            bg: `${equipments.status !== "FREE" ? 'red.300' : 'green.300'}`,
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
                            {equipments.isActive ? 'Active' : 'Inactive'}
                        </Text>
                    </Box>
                    <Box
                        textAlign={'right'}
                        flex={1}
                    >
                        <Flex
                            alignItems="center" gap={2}
                            marginLeft="auto"
                            textAlign="right"
                            direction="row"
                            width={'fit-content'}
                        >
                            <Text>
                                Current User:
                            </Text>
                            <Text fontWeight={600}>
                                {userDetails ? userDetails.fullName : '-'}
                            </Text>
                        </Flex>

                        <Flex
                            alignItems="center" gap={2}
                            marginLeft="auto"
                            textAlign="right"
                            direction="row"
                            width={'fit-content'}
                        >
                            <Text>
                                Queue:
                            </Text>
                            <Text fontWeight={600}>
                                {equipments.queueCount}
                            </Text>
                        </Flex>

                        <Flex
                            alignItems="center" gap={2}
                            marginLeft="auto"
                            textAlign="right"
                            direction="row"
                            width={'fit-content'}
                        >
                            <Text>
                                Time Usage Limit:
                            </Text>
                            <Text fontWeight={600}>
                                {equipments.timeUsage}
                            </Text>
                        </Flex>

                        <Flex
                            alignItems="center" gap={2}
                            marginLeft="auto"
                            textAlign="right"
                            direction="row"
                            width={'fit-content'}
                            mb={4}
                        >
                            <Text>
                                Current Status:
                            </Text>
                            <Text fontWeight={600}>
                                {equipments.status}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        onClick={onOpen}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        Set Time Usage
                    </Button>
                    <Button
                        flex={1}
                        bg={'yellow.600'}
                        color={'white'}
                        onClick={handleNext}
                        fontSize={'sm'}
                        rounded={'full'}
                        isDisabled={equipments.queueCount == 0}
                        _hover={{
                            bg: 'yellow.500',
                        }}
                        _focus={{
                            bg: 'yellow.500',
                        }}>

                        Trigger Next User
                    </Button>
                    <Button
                        flex={1}
                        onClick={handleEquipmentQueueClear}
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
                        Clear Queue
                    </Button>

                </Stack>
            </Box>

            {/* <Flex
                h={24}
                boxShadow='base'
                borderRadius='md'
                p={2}
                bgColor={isOffline ? 'gray.200' : 'cyan.100'}
            >
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
                    <Button
                        isDisabled={isOffline}
                        onClick={onOpen}
                        variant={queueButtonVariant}
                        colorScheme={isOffline ? 'gray' : queueButtonColor}
                        size='xs'
                        fontSize={{ base: '10px' }}
                        bg={isOffline ? 'gray' : queueButtonBG}
                        px={3}
                        w='100%'
                    >
                        Set Time Usage
                    </Button>
                </Stack>
                <Stack>
                    <Button
                        isDisabled={isOffline}
                        onClick={handleEquipmentQueueClear}
                        variant={queueButtonVariant}
                        colorScheme={isOffline ? 'gray' : queueButtonColor}
                        size='xs'
                        fontSize={{ base: '10px' }}
                        bg={isOffline ? 'gray' : queueButtonBG}
                        px={3}
                        w='100%'
                    >
                        Clear
                    </Button>
                </Stack>
                <Spacer />
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
                        >{queueLength <= 0 ? 'Available' : queueLength}</Text>
                    </Center>
                    <Center>
                        <Text
                            fontSize='10px'
                            w={16}
                            align='center'
                            lineHeight='10px'
                            color={queueLength <= 0 ? 'green.600' : ''}
                        >
                            {queueLength <= 0 ? 'to use' : `${personsText} in queue`}

                        </Text>
                    </Center>
                </Stack>
            </Flex > */}
        </>
    )
}

export default EquipmentClear