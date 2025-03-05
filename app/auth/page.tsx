'use client'
import React, {useEffect} from 'react';
import AuthPage from "@/pages/auth/auth";
import {useAppSelector} from "@/shared/hooks/useAppSelector";
import {useRouter} from "next/navigation";
import {StatusCookie} from "@/entities/cookie";

const RouterAuthPage = () => {
    const isAccepted = useAppSelector(state => state.cookie.isAccepted);
    const router = useRouter()
    useEffect(() => {
        if (isAccepted === StatusCookie.accepted){
            router.push('/')
        }
    }, [isAccepted, router]);
    return (
        <AuthPage/>
    );
};

export default RouterAuthPage;