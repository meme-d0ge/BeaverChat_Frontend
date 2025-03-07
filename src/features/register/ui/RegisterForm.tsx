'use client'
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/ui/card";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {UseRegisterForm} from "@/features/register/model/useRegisterForm";

export const RegisterForm = () => {
    const {register, handleSubmit, onSubmit} = UseRegisterForm()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle className={'mx-auto text-[20px]'}>Register</CardTitle>
                    <CardDescription>Register an account to start communicating.</CardDescription>
                </CardHeader>
                <CardContent className={'flex flex-col gap-y-4'}>
                    <div className={'flex flex-col gap-y-[5px]'}>
                        <Label className={'text-[16px] px-[5px] font-bold'} htmlFor="displayName">Public name</Label>
                        <Input {...register('displayName', {required: 'Public name field is required'})} id='displayName' placeholder={'Public name'}></Input>
                    </div>
                    <div className={'flex flex-col gap-y-[5px]'}>
                        <Label className={'text-[16px] px-[5px] font-bold'} htmlFor="name">Username</Label>
                        <Input {...register('username', {required: 'Username field is required'})} id='username' placeholder={'Username'}></Input>
                    </div>
                    <div className={'flex flex-col gap-y-[5px]'}>
                        <Label className={'text-[16px] px-[5px] font-bold'} htmlFor="password">Password</Label>
                        <Input type={'password'} {...register('password', {required: 'Password field is required'})} id='password' placeholder={'Password'}></Input>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type={'submit'} className={'mx-auto cursor-pointer'}>Login</Button>
                </CardFooter>
            </Card>
        </form>
    );
};