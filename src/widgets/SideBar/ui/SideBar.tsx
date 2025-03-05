import React, {useEffect, useRef, useState} from 'react';
import {useConverterToll} from '../model/useConverterToll'
import {Panel} from "react-resizable-panels";

export interface SideBarProps {
    children?: React.ReactNode;
    className?: string;
    setIsOpen?: (isOpen: boolean) => void;
    defaultWidth?: number;
    maxWidth?: number;
    minWidth?: number;
    collapseWidth?: number;
}

export const SideBar = ({className, children, collapseWidth=80, minWidth=260, maxWidth=420, defaultWidth=420, setIsOpen}: SideBarProps) => {
    const {toPx, toPercent} = useConverterToll();
    const [width, setWidth] = useState(defaultWidth);
    return (
        <Panel
            onCollapse={()=>{
                if (setIsOpen) {
                    setIsOpen(false)
                }
            }}
            onExpand={()=>{
                if (setIsOpen) {
                    setIsOpen(true)
                }
            }}
            collapsible={true}
            collapsedSize={toPercent(collapseWidth)}
            minSize={toPercent(minWidth)}
            maxSize={toPercent(maxWidth)}
            defaultSize={toPercent(defaultWidth)}
            className={className}
            style={{maxWidth: width, minWidth: width}}
            onResize={(percent)=>{
                setWidth(toPx(percent));
            }}
        >
            {children}
        </Panel>
    );
};
