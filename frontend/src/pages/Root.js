import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import { useEffect } from 'react';

import MainNavigation from "../components/MainNavigation"
import { getTokenDuration } from '../util/auth';

export default function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(()=>{
        if (!token){
            return
        }

        if(token === 'EXPIRED'){
            submit(null, {action: '/logout', method: 'post'});
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);

        setTimeout(() =>{
            submit(null, {action: '/logout', method: 'post'});
        }, tokenDuration);

    },[token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                
                <Outlet />
            </main>
        </>
    )
}