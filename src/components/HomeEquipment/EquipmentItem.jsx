import { Badge, Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, Heading, Image, Progress, Spacer, Stack, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import useEquipmentQueue from "../../hooks/useEquipmentQueue";

const EquipmentItem = ({ equipments, isOffline }) => {
    const { isInQueue, handleEquipmentQueue } = useEquipmentQueue(equipments);

    const queueText = isInQueue ? 'Remove Queue' : 'Join Queue';
    const queueButtonVariant = isInQueue ? 'outline' : 'solid';
    const queueButtonColor = isInQueue ? 'red' : 'blue';
    const queueButtonBG = isInQueue ? '' : 'cyan.600';

    const queueLength = equipments ? equipments.queueCount : '';
    const personsText = queueLength > 1 ? 'persons' : 'person';

    return (
        <>
            <Flex
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
                    <Spacer />
                    <Button
                        isDisabled={isOffline}
                        onClick={handleEquipmentQueue}
                        variant={queueButtonVariant}
                        colorScheme={isOffline ? 'gray' : queueButtonColor}
                        size='xs'
                        fontSize={{ base: '10px' }}
                        bg={isOffline ? 'gray' : queueButtonBG}
                        px={3}
                        w='100%'
                    >
                        {queueLength == 0 ? (
                            <Text
                                mr={1}
                            >
                                Use Equipment!
                            </Text>
                        ) : (
                            <Text
                                mr={1}
                            >
                                {queueText}
                            </Text>
                        )}

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
            </Flex >
            {/* <Card maxW='xs'>
                <CardBody>
                    <Image
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>Living room Sofa</Heading>
                        <Text>
                            This sofa is perfect for modern tropical spaces, baroque inspired
                            spaces, earthy toned spaces and for people who love a chic design with a
                            sprinkle of vintage design.
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            $450
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <Button variant='solid' colorScheme='blue'>
                            Buy now
                        </Button>
                        <Button variant='ghost' colorScheme='blue'>
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card> */}

            {/* <Link to={`/equipment/${equipments.equipmentName}`} w='100%'> */}
            {/* <Card
                direction={{ sm: 'row' }}
                overflow='hidden'
                variant='outline'
            // h={{ base: '120px', sm: '170px' }}
            >
                <VStack>
                    <Flex>
                        <Link to={`/equipment/${equipments.equipmentName}`} w='100%'>
                            <Image
                                objectFit='cover'
                                // maxW={{ base: '120px', sm: '120px' }}
                                h='50%'
                                src={equipments.imageURL}
                                alt='Caffe Latte'
                            />
                        </Link>

                        <Stack spacing={0} w='100%'>
                            <CardBody py={1} pt={3} spacing='24px' >
                                <Flex spacing='between' mb={1} >
                                    <Heading size='xs'>{equipments.name}</Heading>
                                    <Spacer />
                                    <Heading as='h4' size='md'>
                                        in Queue ({equipments.inQueue.length})
                                    </Heading>
                                </Flex>


                            </CardBody>
                            <CardFooter py={1} pb={3}>
                           
                            </CardFooter>
                        </Stack>
                    </Flex>
                    <Flex w="100%" p={2}>
                        <Button
                            onClick={handleEquipmentQueue}
                            variant={queueButtonVariant}
                            colorScheme={queueButtonColor}
                            size='sm'
                            bg={queueButtonBG}
                        >
                            {queueText}
                        </Button>
                    </Flex>
                </VStack>
            </Card> */}
            {/* </Link> */}
        </>
    )
}

export default EquipmentItem