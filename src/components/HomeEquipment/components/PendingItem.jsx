import { Badge, Button, Flex, Image, Spacer, Stack, Text, Box } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';
import { convertDate } from "../../../utils/convertTime";
import EquipmentBox from "../assets/EquipmentBox";

const PendingItem = ({ equipments, handleClick }) => {
    const queueLength = equipments ? equipments.queueCount : '';
    const personsText = queueLength > 1 ? 'persons' : 'person';

    const handleComplete = () => {
        handleClick();
    }

    return (
        <>
            <EquipmentBox>
                <Flex
                    // h={'120px'}
                    // h='auto'
                    boxShadow='base'
                    borderRadius='md'
                    p={2}
                    bgColor={'yellow.100'}
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
                                    date={convertDate(equipments.timestamp, 5)} />
                            )}
                        </Box>
                        <Text mb={2} fontSize={'small'}>
                            Equipment Usage: {equipments.timeUsage} minutes
                        </Text>
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
                                onClick={() => { handleClick() }}
                                variant={'outline'}
                                colorScheme={'red'}
                                size='xs'
                                fontSize={{ base: '10px' }}
                                bg={'white'}
                                px={3}
                                w='100%'
                            >
                                <Text mr={1}>
                                    Remove Queue
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
                        <Badge mr={1} colorScheme='yellow' >
                            Pending
                        </Badge>
                        <Text
                            align='center'
                        >Please go to the equipment and scan</Text>
                    </Flex >


                </Flex >
            </EquipmentBox>
        </>
    )
}

export default PendingItem