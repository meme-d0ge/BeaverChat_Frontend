'use client'
import React, {ReactNode, useEffect, useRef} from 'react';
import useResizeHandler, {BreakPoint, useResizeHandlerSetting} from "@/widgets/SideBar/model/useResizeHandler";

export interface SideBarProps {
    children: ReactNode;
    setIsOpen: (value: boolean)=>void;
    className?: string;
}
export const SideBar = ({children, setIsOpen, className}: SideBarProps) => {
    const panelRef = useRef(null)
    const handlerRef = useRef(null)

    const settingResize = {
        handlerRef: handlerRef,
        panelRef: panelRef,

        handlerActiveClassName: 'opacity-100',

        breakPointsX: [
            {
                nameBreakPoint: 'close',

                minSize:null,
                maxSize:130,
                minWidth:'80px',
                maxWidth:'80px',
            } as BreakPoint,
            {
                nameBreakPoint: 'open',

                minSize:160,
                maxSize:null,
                minWidth:'260px',
                maxWidth:'420px',
            } as BreakPoint,
        ],
        defaultWidth: 80,

        saveStateToLocalStorage: 'sidebar',
    } as useResizeHandlerSetting

    const [breakPointActive, getWidth] = useResizeHandler(settingResize)

    useEffect(() => {
        if (breakPointActive === 'close'){
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }, [breakPointActive]);

    return (
        <div className={`flex relative w-max ${className}`}>
            <div style={{width: getWidth + 'px'}} ref={panelRef}>
                {children}
            </div>
            <div ref={handlerRef} className={`cursor-col-resize absolute right-[-2.5px] top-0 bottom-0 w-[5px] rounded-[50px] duration-200 bg-indigo-500 opacity-0 hover:opacity-100 max-lg:w-0 max-lg:h-0 max-lg:invisible`}/>
        </div>
    );
};