import { Button, Center, Flex, Image, Spacer, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import useEquipmentQueueDebug from "../../hooks/useEquipmentQueueDebug";

const EquipmentClear = ({ equipments, isOffline }) => {
    const { isInQueue, handleEquipmentQueueClear } = useEquipmentQueueDebug(equipments);

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
            </Flex >
        </>
    )
}

export default EquipmentClear