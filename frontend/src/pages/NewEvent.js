import {json, redirect} from 'react-router-dom'

import EventForm from "../components/EventForm"

export default function NewEventPage(){

    function submitHandler(event){
        event.preventDefault();
    }

    return(
        <EventForm />
    )
}

export async function action({request, params}){
    const data = await request.formData();

    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }
    
    const response = await fetch('http://localhost:8080/events',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });

    if(!response.ok){
        throw json({message: 'Could not save event.'}, {status: 500});
    }else{
        return redirect("/events");
    }
    
};