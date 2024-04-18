import { Badge, Box, Container, Flex, Heading, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import useGetUsers from '../../hooks/useGetUsers';
import { useState } from 'react';
import UsersRowAction from '../../components/Users/UsersRowAction';

const UserPage = () => {
    const { users } = useGetUsers();
    const [userQuery, setUserQuery] = useState('');

    const usersData = users && users.filter((eventData) => {
        if (userQuery === "") return eventData
        else if (eventData.fullName.toLowerCase().includes(userQuery.toLowerCase())) { return eventData }
        else if (eventData.username.toLowerCase().includes(userQuery.toLowerCase())) { return eventData }
        else if (eventData.email.toLowerCase().includes(userQuery.toLowerCase())) { return eventData }
    });

    return (
        <>
            <Container maxW={"container.xl"}>
                <Box p={4}>
                    <Heading as='h4' size='md' pb={4}>
                        User Equipments
                    </Heading>
                    <Flex gap={2}>
                        <Text>
                            Name:
                        </Text>
                        <Input onChange={e => setUserQuery(e.target.value)} placeholder='' size='sm' />
                    </Flex>

                    <TableContainer border={'1px solid'} borderColor={'cyan.100'} borderRadius='10px' mt={5} p={1}>
                        <Table variant='striped' size='sm' sx={{ 'tableLayout': 'fixed', width: 'full' }} >
                            <Thead>
                                <Tr>
                                    <Th>
                                        Name
                                    </Th>
                                    <Th>Username</Th>
                                    <Th>Email Address</Th>
                                    <Th>Bracelet Name</Th>
                                    <Th>Bracelet Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {usersData && usersData.map((data) => (
                                    <Tr key={data.id}>
                                        <Td>{data.fullName}</Td>
                                        <Td>{data.username}</Td>
                                        <Td>{data.email}</Td>
                                        <Td><Badge colorScheme='green'>{data.RFIDname}</Badge></Td>
                                        {/* <Td>
                                            <Flex minWidth='max-content' alignItems='center' gap='2'>
                                                <Button
                                                    disabled={data.RFIDname === '' ? true : false}
                                                    isLoading={isLoading}
                                                    size='xs'
                                                    onClick={() => { onOpen(); setUserID(data.uid) }}
                                                    leftIcon={<RiRfidFill />} colorScheme='teal' variant='solid'>
                                                    Edit
                                                </Button>
                                                <Button
                                                    // disabled={true}
                                                    disabled={data.RFIDname === '' ? true : false}
                                                    isLoading={isLoading}
                                                    size='xs'
                                                    onClick={() => { handleClearRFID(data.uid, data.RFIDcode); }}
                                                    leftIcon={<GrClear />} colorScheme='red' variant='solid'>
                                                    Clear
                                                </Button>
                                            </Flex>
                                        </Td> */}
                                        <Td><UsersRowAction user={data} /></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container >
        </>

    )
}

export default UserPage