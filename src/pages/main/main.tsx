'use client'
import React, {useState} from 'react';
import {SideBar} from "@/widgets/SideBar";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>()

    return (
        <main className={'min-h-screen flex'}>
            <SideBar setIsOpen={setIsOpen}>
                <p>test content</p>
            </SideBar>
            <div>
                <p>test WorkSpace</p>
            </div>
        </main>
    );
};

export default MainPage;