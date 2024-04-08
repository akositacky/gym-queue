import { useEffect } from "react"
import { useParams } from 'react-router-dom';
import useSetNextQueue from "../../hooks/useSetNextQueue";

const NextQueuePage = () => {
    const { equipment } = useParams();
    const { setNext } = useSetNextQueue();
    useEffect(() => {
        setNext(equipment);

    }, [equipment, setNext])

    return (
        <div>{equipment}</div>
    )
}

export default NextQueuePage