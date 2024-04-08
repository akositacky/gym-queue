import useLogout from '../../hooks/useLogout';

const Logout = async () => {
    const { handleLogout } = useLogout();
    return handleLogout();
}

export default Logout