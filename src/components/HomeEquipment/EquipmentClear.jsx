import { Avatar, Box, Button, Center, Flex, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import useEquipmentQueueDebug from "../../hooks/useEquipmentQueueDebug";
import { useState } from "react";

const EquipmentClear = ({ equipments, isOffline }) => {
    const { isInQueue, handleEquipmentQueueClear, handleEquipmentTime, isUpdating } = useEquipmentQueueDebug(equipments);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const queueText = isInQueue ? 'Remove Queue' : 'Join Queue';
    const queueButtonVariant = isInQueue ? 'outline' : 'solid';
    const queueButtonColor = isInQueue ? 'red' : 'blue';
    const queueButtonBG = isInQueue ? '' : 'cyan.600';

    const queueLength = equipments ? equipments.queueCount : '';
    const personsText = queueLength > 1 ? 'persons' : 'person';

    const [timeUsage, setTimeUsage] = useState(equipments.timeUsage);
    const navigate = useNavigate();
    const timeUsageClick = async () => {
        await handleEquipmentTime(timeUsage);
        // navigate(0);
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
                textAlign={'center'}>
                <Flex
                    gap={2}
                >
                    <Avatar
                        size={'xl'}
                        src={equipments.imageURL}
                        mb={4}
                        pos={'relative'}
                        _after={{
                            content: '""',
                            w: 4,
                            h: 4,
                            bg: 'green.300',
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
                            {equipments.isActive ? 'Active' : 'Inactive'}
                        </Text>
                    </Box>
                    <Box
                        textAlign={'right'}
                        flex={1}
                    >
                        <Text fontWeight={600} mb={4}>
                            Time Limit: {equipments.timeUsage}
                        </Text>
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
                        Clear
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