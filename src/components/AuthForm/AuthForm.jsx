import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Box minW='sm' borderRadius={4} padding={5} >
                <VStack spacing={4}>
                    <Image
                        src='/assets/gym-transparent.png'
                        alt="gym-logo"
                        // height={32}
                        h={32}
                        cursor={"pointer"} />
                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Gym Management
                    </Box>

                    {isLogin ? <Login /> : <Signup />}

                    {/* ---------------- OR -------------- */}
                    {/* <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                        <Text mx={1} color={"white"}>
                            OR
                        </Text>
                        <Box flex={2} h={"1px"} bg={"gray.400"} />
                    </Flex> */}

                    {/* <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} /> */}
                </VStack>
            </Box>

            <Box border={"1px solid #c6d5f3"} borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        {isLogin ? "Sign up" : "Log in"}
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;