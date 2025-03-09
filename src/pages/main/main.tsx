'use client'
import React, {useState} from 'react';
import {SideBar} from "@/widgets/SideBar";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>()

    return (
        <main className={'min-h-screen flex'}>
            <SideBar className={'max-lg:!max-w-none max-lg:!min-w-auto max-lg:!w-screen lg:border-r-[1px] lg:border-neutral-600'} setIsOpen={setIsOpen}>
                <p>test content</p>
            </SideBar>
            <div className={'max-lg:invisible max-lg:absolute'}>
                <p>test WorkSpace</p>
            </div>
        </main>
    );
};

export default MainPage;