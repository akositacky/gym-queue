import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    useDisclosure,
    Stack,
    Spinner,
    Text,
    Image,
    useColorModeValue,
    Container,
    Hide,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
// import Sidebar from '../../components/Sidebar/Sidebar'
import useLogout from '../../hooks/useLogout'
import { BiLogOut } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase/firebase";
import { Link, useLocation } from "react-router-dom";
// import ProfileLink from '../../components/Sidebar/ProfileLink'
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from '../../store/authStore'

const NavList = () => {
    const authUser = useAuthStore((state) => state.user);
    return (
        <>
            <ProfileLink />
            {authUser && authUser.userRole === "admin" && (
                <>
                    <EquipmentLink />
                    <CustomerLink />
                    <RFIDLink />
                </>
            )}
        </>
    )
}
const ProfileLink = () => {
    const authUser = useAuthStore((state) => state.user);
    return (
        <Link
            to={`/${authUser?.username}`}
            as={RouterLink}
        >
            <Text
                _hover={{
                    textDecoration: 'none',
                    color: useColorModeValue('blue.900', 'blue.900'),
                }}
                as='b'
                color={'white'}
                px={2}
                py={1}
                rounded={'md'}
            >Profile</Text>
        </Link>
    )
}

const EquipmentLink = () => {
    return (
        <Link
            to={`/equipment`}
            as={RouterLink}
            h={16}
        >
            <Text
                _hover={{
                    textDecoration: 'none',
                    color: useColorModeValue('blue.900', 'blue.900'),
                }}
                as='b'
                color={'white'}
                px={2}
                py={1}
                rounded={'md'}
            >Equipment</Text>
        </Link>
    )
}

const CustomerLink = () => {
    return (
        <Link
            to={`/users`}
            as={RouterLink}
            h={16}
        >
            <Text
                _hover={{
                    textDecoration: 'none',
                    color: useColorModeValue('blue.900', 'blue.900'),
                }}
                as='b'
                color={'white'}
                px={2}
                py={1}
                rounded={'md'}
            >Users</Text>
        </Link>
    )
}

const RFIDLink = () => {
    return (
        <Link
            to={`/bracelet`}
            as={RouterLink}
            h={16}
        >
            <Text
                _hover={{
                    textDecoration: 'none',
                    color: useColorModeValue('blue.900', 'blue.900'),
                }}
                as='b'
                color={'white'}
                px={2}
                py={1}
                rounded={'md'}
            >Bracelet</Text>
        </Link>
    )
}

// const NavLink = (props) => {
//     const { children } = props

//     return (
//         <Box
//             color={'white'}
//             as="a"
//             px={2}
//             py={1}
//             rounded={'md'}
//             _hover={{
//                 textDecoration: 'none',
//                 // bg: useColorModeValue('blue.700', 'blue.800'),
//             }}
//             href={'#'}>
//             <Text as='b'> {children}</Text>
//         </Box>
//     )
// }

export default function Simple({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { pathname } = useLocation();

    const [user, loading] = useAuthState(auth);

    const firstPath = pathname.split('/');
    const canRenderSidebar = (firstPath[1] !== "auth" && user) && firstPath[1] !== "updateNextQueue";

    const checkingUserIsAuth = !user && loading;
    if (checkingUserIsAuth) return <PageLayoutSpinner />;

    return (
        <>
            {canRenderSidebar ? (
                <Hide below='md'>
                    <Box
                        bgGradient='linear(to-r, cyan.500, blue.500)'
                        px={5}
                        as="header"
                        w="100%"
                        zIndex='99'
                        position="fixed"
                    >
                        <Container maxW={"container.xl"}>
                            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}  >
                                {/* <Link to={"/"} as={RouterLink} pl={2} cursor='pointer'> */}
                                {/* <InstagramLogo /> */}
                                <IconButton
                                    size={'md'}
                                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                                    aria-label={'Open Menu'}
                                    display={{ md: 'none' }}
                                    onClick={isOpen ? onClose : onOpen}
                                />
                                {/* </Link> */}
                                <HStack spacing={8} alignItems={'center'}>
                                    <Link to={"/"} as={RouterLink} pl={2} cursor='pointer'>
                                        <Image
                                            p={1}
                                            src='/IOTIVITY-LOGO.svg'
                                            h={20}
                                            mt={3}
                                            borderRadius='full'
                                            cursor={"pointer"}
                                        />
                                    </Link>
                                    {/* 
                            <Image
                                src='/IOTIVITY-LOGO.svg'
                                h={12}
                                cursor={"pointer"} /> 
                            */}
                                    <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                        <NavList />
                                    </HStack>
                                </HStack>
                                <ProfileMenu />
                            </Flex>

                        </Container>

                        {isOpen ? (
                            <Box pb={4} display={{ md: 'none' }}>
                                <Stack as={'nav'} spacing={4}>
                                    <NavList />
                                    {/* <NavLink><ProfileLink /></NavLink> */}
                                    {/* {Links.map((link) => (
                                    <NavLink key={link}>{link}</NavLink>
                                ))} */}
                                </Stack>
                            </Box>
                        ) : null}
                    </Box>
                    <Box h={16}>

                    </Box>
                </Hide>
            ) : null}
            <Box>
                {children}
            </Box>
            {canRenderSidebar ? (
                <Hide above='md'>
                    <Box
                        bgGradient='linear(to-r, cyan.500, blue.500)'
                        as="footer"
                        position="fixed"
                        bottom="0"
                        width="100%"
                        display='flex'
                        justifyContent='space-evenly'
                    >
                        <FooterNav />
                    </Box>
                </Hide>
            ) : null}
        </>
    )
}

const FooterNav = () => {
    return (
        <>
            <ProfileButton />
            <HomeButton />
            <LogOutButton />
        </>
    )
}

const ProfileButton = () => {
    const authUser = useAuthStore((state) => state.user);
    return (
        <Stack
            as={RouterLink}
            to={`/${authUser?.username}`}
            spacing={0} align='center' color={'white'} width='100%'
            // onClick={}
            _hover={{
                textDecoration: 'none',
                backgroundColor: useColorModeValue('blue.900', 'blue.900'),
            }}
        >
            <Avatar
                size={'xs'}
                src={authUser?.profilePicURL || ""}
                mt={1}
            />

            {/* <IconButton
                variant='solid'
                colorScheme='white'
                aria-label='Logout'
                fontSize='25px'
                mt={-1}
                icon={<BiUserCircle />} /> */}
            <Text fontSize='10px' pb={1}>Profile</Text>
        </Stack>
    )
}

const HomeButton = () => {
    return (
        <Stack
            as={RouterLink}
            to={`/`}
            spacing={0} align='center' color={'white'} width='100%'
            // onClick={}
            _hover={{
                textDecoration: 'none',
                backgroundColor: useColorModeValue('blue.900', 'blue.900'),
            }}
        >
            <Image
                p={1}
                src='/IOTIVITY-LOGO.svg'
                h={14}
                mt={-5}
                borderRadius='full'
                cursor={"pointer"}
            />
            <Text fontSize='10px' mt={-2} pb={1}>Home</Text>
            {/* <IconButton
                variant='solid'
                colorScheme='white'
                aria-label='Logout'
                fontSize='25px'
                mt={-1}
                icon={<BiSolidHome />} />
           */}
        </Stack>
    )
}

const LogOutButton = () => {
    const { handleLogout } = useLogout();

    return (
        <Stack spacing={0} align='center' color={'white'} width='100%'
            onClick={handleLogout}
            _hover={{
                textDecoration: 'none',
                backgroundColor: useColorModeValue('blue.900', 'blue.900'),
            }}
        >
            <IconButton
                variant='solid'
                colorScheme='white'
                aria-label='Logout'
                fontSize='25px'
                mt={-1}
                icon={<BiLogOut />} />
            <Text fontSize='10px' mt={-2} pb={1}>Logout</Text>
        </Stack>
    )
}

const PageLayoutSpinner = () => {
    return (
        <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
            <Spinner size='xl' />
        </Flex>
    );
};

const ProfileMenu = () => {
    const { handleLogout, isLoggingOut } = useLogout();
    const authUser = useAuthStore((state) => state.user);

    return (
        <>
            <Flex alignItems={'center'}>
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded={'full'}
                        variant={'link'}
                        cursor={'pointer'}
                        minW={0}>
                        <Avatar
                            size={'sm'}
                            src={authUser?.profilePicURL || ""}
                        />
                    </MenuButton>
                    <MenuList>
                        <Text
                            bgGradient='linear(to-r, cyan.700, cyan.900)'
                            // bgGradient='linear(to-r, #00B5D8, #1A365D)'
                            bgClip='text'
                            fontWeight='bold'
                            px={4}
                        >
                            Hello, {authUser?.fullName}

                        </Text>

                        <MenuDivider />
                        <Button
                            onClick={handleLogout}
                            isLoading={isLoggingOut}
                            leftIcon={<BiLogOut />}
                            variant={"ghost"}
                            size='sm'
                            w='100%'
                        >
                            Logout
                        </Button>
                    </MenuList>
                </Menu>
            </Flex>
        </>
    )
}