'use client'
import {RefObject, useEffect, useRef} from "react";


export interface useResizeHandlerSetting {
    handler: RefObject<any>;
    handlerActiveClassName?: string;

    panel: RefObject<any>;
    panelActiveClassName?: string;

    breakPoints: {
        collapseWidth: number,
        collapseSize: number,
        minWidth: number,
        maxWidth: number,
        defaultWidth: number,
    }
    setIsOpen: (value: boolean)=>void
    localStore?: string
}
const UseResizeHandler = ({handler, handlerActiveClassName, panel, panelActiveClassName, breakPoints, setIsOpen, localStore}: useResizeHandlerSetting) => {
    const activeResize = useRef(false)
    const mouseDownWidth = useRef(0)

    const mouseDown = (event: MouseEvent) => {
        if (event.target === handler.current && panel.current) {
            handler.current.classList.add(handlerActiveClassName)
            panel.current.classList.add(panelActiveClassName)
            activeResize.current = true
            mouseDownWidth.current = event.x
        }
    }
    const mouseUp = () => {
        if (panel.current && handler.current){
            handler.current.classList.remove(handlerActiveClassName)
            panel.current.classList.remove(panelActiveClassName)

            activeResize.current = false
            mouseDownWidth.current = 0
        }
    }
    const mouseMove = (event: MouseEvent) => {
        if (activeResize.current && panel.current && handler.current){
            const newWidth = event.x + handler.current.offsetWidth / 2

            if (newWidth > breakPoints.minWidth) {
                setIsOpen(true)
                panel.current.style.width = `${newWidth}px`
                if (localStore){
                    localStorage.setItem(localStore, String(newWidth))
                }
            } else if (newWidth > breakPoints.collapseWidth && newWidth < breakPoints.minWidth) {
                setIsOpen(true)
                panel.current.style.width = `${breakPoints.minWidth}px`
                if (localStore) {
                    localStorage.setItem(localStore, String(breakPoints.minWidth))
                }
            } else {
                setIsOpen(false);
                panel.current.style.width = `${breakPoints.collapseSize}px`
                if (localStore) {
                    localStorage.setItem(localStore, String(breakPoints.collapseSize))
                }
            }
        }
    }

    const touchStart = (event: TouchEvent) => {
        if (event.target === handler.current && panel.current) {
            handler.current.classList.add(handlerActiveClassName)
            panel.current.classList.add(panelActiveClassName)
            activeResize.current = true
            mouseDownWidth.current = event.changedTouches[0].clientX
        }
    }
    const touchEnd = () => {
        if (panel.current && handler.current){
            handler.current.classList.remove(handlerActiveClassName)
            panel.current.classList.remove(panelActiveClassName)

            activeResize.current = false
            mouseDownWidth.current = 0
        }
    }
    const touchMove = (event: TouchEvent) => {
        if (activeResize.current && panel.current && handler.current){
            const newWidth = event.changedTouches[0].clientX + handler.current.offsetWidth / 2

            if (newWidth > breakPoints.minWidth) {
                setIsOpen(true)
                panel.current.style.width = `${newWidth}px`
                if (localStore){
                    localStorage.setItem(localStore, String(newWidth))
                }
            } else if (newWidth > breakPoints.collapseWidth && newWidth < breakPoints.minWidth) {
                setIsOpen(true)
                panel.current.style.width = `${breakPoints.minWidth}px`
                if (localStore) {
                    localStorage.setItem(localStore, String(breakPoints.minWidth))
                }
            } else {
                setIsOpen(false);
                panel.current.style.width = `${breakPoints.collapseSize}px`
                if (localStore) {
                    localStorage.setItem(localStore, String(breakPoints.collapseSize))
                }
            }
        }
    }

    const preventDefaultDrag = (event: DragEvent) => {
        event.preventDefault()
    }

    const getStartWidthPanel = ():number => {
        if (localStore) {
            const value = localStorage.getItem(localStore)
            if (value) {
                return Number(value)
            }

            localStorage.setItem(localStore, String(breakPoints.defaultWidth))
            return breakPoints.defaultWidth
        }
        return  breakPoints.defaultWidth
    }

    useEffect(() => {
        const panelCurrent = handler.current

        window.addEventListener('mousedown', mouseDown)
        window.addEventListener('mouseup', mouseUp)
        window.addEventListener('mousemove', mouseMove)

        window.addEventListener('touchmove', touchMove)
        window.addEventListener('touchstart', touchStart)
        window.addEventListener('touchend', touchEnd)

        panel.current.style.width = getStartWidthPanel()


        panel.current.style.maxWidth = `${breakPoints.maxWidth}px`;
        panel.current.style.minWidth = `${breakPoints.collapseSize}px`;

        panelCurrent.addEventListener('dragstart', preventDefaultDrag)

        return ()=>{
            window.removeEventListener('mousedown', mouseDown)
            window.removeEventListener('mouseup', mouseUp)
            window.removeEventListener('mousemove', mouseMove)

            window.removeEventListener('touchmove', touchMove)
            window.removeEventListener('touchstart', touchStart)
            window.removeEventListener('touchend', touchEnd)

            if (panelCurrent){
                panelCurrent.removeEventListener('dragstart', preventDefaultDrag);
            }
        }
    }, []);

    return getStartWidthPanel
};

export default UseResizeHandler;