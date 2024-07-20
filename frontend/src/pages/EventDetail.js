import {useParams, Link} from 'react-router-dom'

export default function EventDetailPage(){
    const params = useParams();
    
    return(
        <>
        <h1>Event Details</h1>
        <p>Event ID: {params.eventId}</p>
        <p><Link to=".." >back</Link></p>
        </>
    )
}