import { Box, Container, Heading, Hide, Text } from "@chakra-ui/react";
import HomeEquipment from "../../components/HomeEquipment/HomeEquipment";
import { useEffect } from "react";

const HomePage = () => {
    useEffect(() => {
        function vibrate() {
            if (!window) {
                return;
            }

            if (!window.navigator) {
                return;
            }

            if (!window.navigator.vibrate) {
                return;
            }

            window.navigator.vibrate([200, 100, 200]);
        }

        vibrate();
    }, [])

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
                    zIndex={9}
                    bgGradient='linear(to-r, cyan.500, blue.500)'
                    color='white'
                >
                    <Text>
                        Gym Queue Management
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