import { Container, Flex, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
    return (
        <Flex minH={"80vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <VStack spacing={5} align={"stretch"}>
                        <AuthForm />
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default AuthPage