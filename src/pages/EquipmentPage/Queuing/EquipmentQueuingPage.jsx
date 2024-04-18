import { Box, Container, Flex, Heading, Image, Skeleton, SkeletonCircle, Text, VStack, Spinner } from '@chakra-ui/react'
import EquipmentQueue from '../../../components/HomeEquipment/EquipmentQueue'
import { Link, useParams } from 'react-router-dom';
import useGetEquipmentByName from '../../../hooks/useGetEquipmentByName';
import EquipmentItem from '../../../components/HomeEquipment/EquipmentItem';
import useAuthStore from '../../../store/authStore';

const EquipmentQueuingPage = () => {
    const { equipmentName } = useParams();
    const { isLoading, equipment } = useGetEquipmentByName(equipmentName);
    const authUser = useAuthStore((state) => state.user);

    const userNotFound = !isLoading && !equipment;

    if (userNotFound) return <UserNotFound />;
    if (!equipment) return <Spinner />;

    const isOffline = authUser.RFIDcode === '' ? true : false;

    console.log('equipment', equipment);

    return (
        <Container maxW={"container.lg"}>
            <Flex gap={20}>
                <Box flex={2} py={10}>
                    <EquipmentItem equipments={equipment} isOffline={isOffline} />

                    {/* {!isLoading && equipment && (
                        <>
                            <Heading as='h4' size='md' pb={4}>
                                {equipment.name}
                            </Heading>
                            <Image
                                objectFit='cover'
                                maxW={{ base: '120px', sm: '120px' }}
                                h='100%'
                                src={equipment.imageURL}
                                alt='Caffe Latte'
                            />
                        </>
                    )} */}

                    {/* <EquipmentQueue /> */}
                    {isLoading && <ProfileHeaderSkeleton />}
                </Box>
            </Flex>
        </Container>
    )
}

export default EquipmentQueuingPage

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
    return (
        <Flex
            gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <SkeletonCircle size='24' />

            <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
                <Skeleton height='12px' width='150px' />
                <Skeleton height='12px' width='100px' />
            </VStack>
        </Flex>
    );
};

const UserNotFound = () => {
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} py={12}>
            <Text fontSize={"2xl"}>Equipment Not Found</Text>
            <Link to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    );
};