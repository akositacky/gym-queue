import { Link, useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Avatar, Box, Button, Center, Container, Flex, Heading, Skeleton, SkeletonCircle, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import EditProfile from "../Profile/EditProfile";

const UserQueueProfile = () => {
    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    const userNotFound = !isLoading && !userProfile;
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (userNotFound) return (
        <UserNotFound />
    );

    console.log('userProfile', userProfile);
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
                            bg: 'green.300',
                            border: '2px solid white',
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
                    <Text
                        textAlign={'center'}
                        // color={useColorModeValue('gray.700', 'gray.400')}
                        px={3}>
                        {userProfile.bio}
                    </Text>

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