import React, {useState} from 'react';
import {PanelResizeHandle} from "react-resizable-panels";

interface CustomPanelResizeHandleProps{
    className?: string;
    classNameActive?: string;
}
export const CustomPanelResizeHandle = ({className, classNameActive}: CustomPanelResizeHandleProps) => {
    const [activeStyle, setActiveStyle] = useState('')
    const toggleActiveStyle = () =>{
        if (!activeStyle){
            setActiveStyle(`${classNameActive}`)
        } else {
            setActiveStyle('')
        }
    }
    return (
        <PanelResizeHandle hitAreaMargins={{coarse: 0, fine: 0}} onDragging={()=>{toggleActiveStyle()}} className={`${className} ${activeStyle}`}/>
    );
};
