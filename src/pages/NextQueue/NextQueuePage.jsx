import { useEffect } from "react"
// import { useParams } from 'react-router-dom';
import useSetNextQueue from "../../hooks/useSetNextQueue";

const NextQueuePage = ({ equipment }) => {
    // const { equipment } = useParams();
    const { setNext } = useSetNextQueue();

    useEffect(() => {
        setNext(equipment);
    }, [equipment, setNext])

    return (
        <></>
    )
}

export default NextQueuePage