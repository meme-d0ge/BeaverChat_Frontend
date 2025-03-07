'use client'
import React, {ReactNode, useRef} from 'react';
import useResizeHandler, {useResizeHandlerSetting} from "@/widgets/SideBar/model/useResizeHandler";

export interface SideBarProps {
    children: ReactNode;
    setIsOpen: (value: boolean)=>void;
}
export const SideBar = ({children, setIsOpen}: SideBarProps) => {
    const panelRef = useRef(null)
    const handlerRef = useRef(null)

    const settingResize = {
        handler: handlerRef,
        panel: panelRef,

        handlerActiveClassName: 'opacity-100',

        breakPoints: {
            minWidth: 260,
            maxWidth: 420,
            collapseWidth: 150,
            collapseSize: 80,
            defaultWidth: 260
        },
        localStore: 'main-panel',
        setIsOpen: (value)=>{
            setIsOpen(value)
        }
    } as useResizeHandlerSetting

    const getStartWidthPanel = useResizeHandler(settingResize);

    return (
        <div className={'flex relative w-max min-h-screen'}>
            <div style={{width: getStartWidthPanel()}} className={`bg-neutral-800`} ref={panelRef}>
                {children}
            </div>
            <div ref={handlerRef} className={`cursor-col-resize absolute right-[-2.5px] top-0 bottom-0 w-[5px] rounded-[50px] duration-300 bg-green-500 opacity-0 hover:opacity-100`}/>
        </div>
    );
};