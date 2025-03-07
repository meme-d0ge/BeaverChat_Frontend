'use client'
import React, {useState} from 'react';
import {SideBar} from "@/widgets/SideBar";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>()

    return (
        <main className={'min-h-screen'}>
            <SideBar setIsOpen={setIsOpen}>
                <p>test content</p>
            </SideBar>
            <div>

            </div>
        </main>
    );
};

export default MainPage;