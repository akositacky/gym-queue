import { Button, Flex, Image, Spacer, Stack, Text, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Center } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';
import { convertDate } from "../../../utils/convertTime";

const UseItem = ({ equipments, handleClick, onOpenLeave }) => {
    const queueLength = equipments ? equipments.queueCount : '';
    const personsText = queueLength > 1 ? 'persons' : 'person';
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleComplete = () => {
        handleClick();
    }
    const handleOnTick = (e) => {
        const minute = e.minutes;
        const seconds = e.seconds;

        if (minute == 3 && seconds == 0) {
            onOpen();
        }
    }
    console.log('equipments.timeUsage', equipments.timeUsage);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
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
                            Last 3 minutes!
                        </Text>
                        <Center>
                            <Image
                                objectFit='contain'
                                w='50%'
                                mt={5}
                                src={equipments.imageURL}
                                alt='Caffe Latte'
                                zIndex='-99'
                            />
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Text
                            fontWeight="bold"
                            mx={'auto'}
                        >
                            You only have last 3 minutes to the {equipments.name} equipment.
                        </Text>
                    </ModalFooter>
                </ModalContent>
            </Modal >

            <Flex
                boxShadow='base'
                borderRadius='md'
                p={2}
                bgGradient={'linear(to-r, green.200, green.300)'}
                direction='column'
            >
                <Flex direction={'column'} alignItems={'center'}>
                    <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        as='b'
                        mb={2}
                    >
                        {equipments.name}
                    </Text>
                    <Box
                        fontSize={{ base: 'md', md: 'lg' }}
                        as='b'
                        mb={2}
                    >
                        {equipments.timestamp && (
                            <Countdown
                                daysInHours
                                onComplete={handleComplete}
                                onTick={(e) => { handleOnTick(e) }}
                                date={convertDate(equipments.timestamp, +equipments.timeUsage)} />
                        )}

                        {/* <Countdown
                            daysInHours
                            onComplete={handleComplete}
                            date={fiveMins()} /> */}
                    </Box>

                    <Link to={`/equipment/${equipments.equipmentName}`} >
                        <Image
                            objectFit='contain'
                            h='100%'
                            w='100px'
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
                        <Spacer />
                        <Button
                            onClick={() => { onOpenLeave() }}
                            variant={'outline'}
                            colorScheme={'red'}
                            size='xs'
                            fontSize={{ base: '10px' }}
                            bg={'white'}
                            px={3}
                            w='100%'
                        >
                            <Text mr={1}>
                                Leave Equipment
                            </Text>
                        </Button>
                    </Stack>
                    <Spacer />
                </Flex >

                <Flex
                    mt={2}
                    p={2}
                    w={'100 %'}
                    borderRadius='full'
                    mx={'auto'}
                    bgGradient={queueLength > 0 ? 'linear(to-r, green.500, teal.500)' : ''}
                    color={queueLength > 0 ? 'white' : 'black'}
                >
                    <Text
                        ml={2}
                        as='b'
                        fontSize='sm'
                        color={queueLength <= 0 ? 'green.600' : ''}
                    >
                        {queueLength <= 0 ? ((equipments.User != "") ? `has a pending user` : 'Available') : queueLength}
                    </Text>

                    {(queueLength > 0) && (
                        <Text
                            fontSize='12px'
                            w={16}
                            mt={1}
                            ml={2}
                            lineHeight='10px'
                            color={queueLength <= 0 ? 'green.600' : ''}
                        >
                            {`${personsText} in queue`}
                        </Text>
                    )}
                </Flex>

                <Flex
                    mt={2}
                    p={2}
                    borderRadius='10px'
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    fontWeight='bold'
                    border="1px solid"
                    h={'30px'}
                    w={'100%'}
                    borderColor="cyan.200"
                    direction='row' alignItems='center' mx='auto' bgColor='white' justifyContent='center'>
                    <Text
                        align='center'
                    >You are currently using this equipment!</Text>
                </Flex >
            </Flex >
        </>
    )
}

export default UseItem