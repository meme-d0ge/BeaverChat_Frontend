'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/ui/tabs";
import {LoginForm} from "@/features/login";
import {RegisterForm} from "@/features/register";

const AuthWidget = () => {
    return (
        <Tabs defaultValue={'login'} className={'max-w-md'}>
            <TabsList>
                <TabsTrigger className={'cursor-pointer'} value={'login'}>Login</TabsTrigger>
                <TabsTrigger className={'cursor-pointer'} value={'register'}>Register</TabsTrigger>
            </TabsList>
            <TabsContent value={'login'}>
                <LoginForm/>
            </TabsContent>
            <TabsContent value={'register'}>
                <RegisterForm/>
            </TabsContent>
        </Tabs>
    );
};

export default AuthWidget;