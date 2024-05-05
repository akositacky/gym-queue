import { Link, useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Avatar, Box, Button, Center, Container, Flex, Heading, Skeleton, SkeletonCircle, Spinner, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import EditProfile from "../Profile/EditProfile";
import useAuthStore from "../../store/authStore";

const UserQueueProfile = () => {
    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const authUser = useAuthStore((state) => state.user);

    const userNotFound = !isLoading && !userProfile;

    console.log('userProfile', userProfile, isLoading, userNotFound);

    if (userNotFound) return (
        <UserNotFound />
    );

    if (!userProfile) return <Spinner />;

    const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;

    return (
        <Container maxW='container.lg' py={5} pt={10}>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
            {isLoading ? (
                <ProfileHeaderSkeleton />
            ) : (
                <Box
                    // maxW={'320px'}
                    w={'full'}
                    // bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={userProfile.profilePicURL}
                        mb={4}
                        pos={'relative'}
                        _after={{
                            content: '""',
                            w: 4,
                            h: 4,
                            border: '2px solid white',
                            bg: `${userProfile.RFIDname == "" ? 'red.300' : 'green.300'}`,
                            rounded: 'full',
                            pos: 'absolute',
                            bottom: 0,
                            right: 3,
                        }}
                    />
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {userProfile.fullName}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        {userProfile.email}
                    </Text>

                    {userProfile.bio == '' ? (
                        <Text
                            textAlign={'center'}
                            color={'gray.400'}
                            fontSize={'sm'}
                            px={3}>
                            {visitingOwnProfileAndAuth ? 'Please add a bio' : ''}
                        </Text>
                    ) : (
                        <Text
                            textAlign={'center'}
                            px={3}>
                            {userProfile.bio}
                        </Text>
                    )}
                    {visitingOwnProfileAndAuth && (
                        <Center>
                            <Stack mt={8} direction={'row'} spacing={4}
                                w={'50%'}
                            >
                                <Button
                                    flex={1}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    onClick={onOpen}
                                    boxShadow={
                                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                    }
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    _focus={{
                                        bg: 'blue.500',
                                    }}>
                                    Edit Profile
                                </Button>
                            </Stack>
                        </Center>
                    )}
                </Box>
            )
            }
        </Container >
    )
}

export default UserQueueProfile

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
    return (
        <Flex
            gap={{ base: 4, sm: 10 }}
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
        <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
            <Text fontSize={"2xl"}>User Not Found</Text>
            <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
                Go home
            </Link>
        </Flex>
    );
};