import React, {useEffect, useState} from 'react';
import {SideBar} from "@/widgets/SideBar";
import {Panel, PanelGroup} from "react-resizable-panels";
import {CustomPanelResizeHandle} from "@/shared/ui/CustomPanelResizeHandle";

const MainPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>()

    return (
        <main className={'min-h-screen'}>
            <PanelGroup
                autoSaveId={'main-panel'}
                id="main-panel"
                direction='horizontal'
                className={'min-h-screen'}
            >
                <SideBar setIsOpen={setIsOpen}>
                    test content
                </SideBar>
                <CustomPanelResizeHandle className={'px-[3px] bg-neutral-800 hover:bg-neutral-700 duration-300 rounded-[10px]'} classNameActive={'!bg-neutral-700'}/>
                <Panel></Panel>
            </PanelGroup>
        </main>
    );
};

export default MainPage;