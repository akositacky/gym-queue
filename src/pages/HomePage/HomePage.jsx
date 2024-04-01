import { Box, Container, Heading, Hide, Text } from "@chakra-ui/react";
import HomeEquipment from "../../components/HomeEquipment/HomeEquipment";

const HomePage = () => {
    return (
        <>
            <Hide above='md'>
                <Heading
                    as='h4'
                    size='md'
                    p={3}
                    px={4}
                    w='100%'
                    h={12}
                    position='fixed'
                    boxShadow='sm'
                    bgColor='white'
                    zIndex={9}
                >
                    <Text
                        bgGradient='linear(to-r, cyan.500, blue.500)'
                        bgClip='text'
                    >
                        Gym Equipment Management
                    </Text>
                </Heading>
                <Box h={10} mb={3} />
            </Hide>
            <Container maxW={"container.xl"} px={0} >
                <Box p={1}>
                    <HomeEquipment />
                </Box>
            </Container >
        </>
    );
};

export default HomePage;