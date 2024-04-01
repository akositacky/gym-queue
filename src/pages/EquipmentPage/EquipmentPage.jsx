import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import CreateEquipment from '../../components/HomeEquipment/CreateEquipment'
import useGetEquipment from '../../hooks/useGetEquipments';
import EquipmentItemAdmin from '../../components/HomeEquipment/EquimentItemAdmin';

const EquipmentPage = () => {
    const { isLoading, equipments } = useGetEquipment();

    return (
        <Container maxW={"container.xl"} py={10}>
            <Box p={4}>
                <Heading as='h4' size='md' pb={4}>
                    Manage Equipments
                </Heading>
                <CreateEquipment />
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                    {!isLoading && equipments.length > 0 &&
                        equipments.map((post) => <EquipmentItemAdmin key={post.id} equipments={post} />)
                    }
                </SimpleGrid>
            </Box>
        </Container>
    )
}

export default EquipmentPage