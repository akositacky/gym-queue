import { Box, useColorModeValue } from "@chakra-ui/react";

export default function EquipmentBox({ children }) {
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            textAlign={'center'}
        >
            {children}
        </Box>
    )
}