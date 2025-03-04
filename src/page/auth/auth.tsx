'use client'
import React from 'react';
import AuthWidget from "@/widgets/AuthWidget/AuthWidget";

const AuthPage = () => {
    return (
        <main className={'min-h-screen flex justify-center items-center'}>
            <AuthWidget></AuthWidget>
        </main>
    );
};

export default AuthPage;