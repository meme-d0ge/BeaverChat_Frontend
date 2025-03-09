'use client'
import {RefObject, useEffect, useRef, useState} from "react";

export interface BreakPoint {
    nameBreakPoint: string;
    alwaysActiveIf?: ()=>boolean;

    minSize: number | null;
    maxSize: number | null;

    minWidth: string;
    maxWidth: string;
}
export interface useResizeHandlerSetting {
    saveStateToLocalStorage: string;

    handlerRef: RefObject<any>;
    handlerActiveClassName?: string;

    panelRef: RefObject<any>;
    panelActiveClassName?: string;

    breakPointsX: BreakPoint[];
    defaultWidth: number;
    // breakPointsY: BreakPoint[]; //not implemented
}

const UseResizeHandler = ({
                              handlerRef,
                              panelRef,
                              panelActiveClassName,
                              handlerActiveClassName,
                              breakPointsX,
                              saveStateToLocalStorage,
                              defaultWidth
                          }: useResizeHandlerSetting) => {
    const findBreakPoint = (width: number) => {
        for (const i in breakPointsX) {
            const breakPoint = breakPointsX[i]
            if ((breakPoint.minSize ? width > breakPoint.minSize : true) && (breakPoint.maxSize ? width < breakPoint.maxSize : true) ) {
                return breakPoint
            }
        }
    };

    const getWidth = (localStoreName: string) => {
        const width = Number(localStorage.getItem(localStoreName+':width'))
        if (width) {
            return width
        } else {
            return defaultWidth
        }
    }
    const getActiveBreakPoint = (localStoreName: string) => {
        const activeBreakPoint = localStorage.getItem(localStoreName+':breakPoint')
        if (activeBreakPoint) {
            return activeBreakPoint
        } else {
            const breakPoint = findBreakPoint(getWidth(localStoreName))
            return breakPoint ? breakPoint.nameBreakPoint : ''
        }
    }

    const setWidth = (width: number, localStoreName: string) => {
        localStorage.setItem(localStoreName+':width', String(width))
    }
    const setActiveBreakPoint = (localStoreName: string, activeBreakPoint: string) => {
        localStorage.setItem(localStoreName+':breakPoint', activeBreakPoint)
    }

    const activeResize = useRef<boolean>(false)
    const [isActiveResize, setActiveResize] = useState<boolean>(false)
    const [breakPointActive, setBreakPointActive] = useState<string>(getActiveBreakPoint(saveStateToLocalStorage))
    const lateBreakPoint = useRef<string>('')

    const startResize = () => {
        if (panelRef.current && handlerRef.current) {
            panelRef.current.classList.add(panelActiveClassName);
            handlerRef.current.classList.add(handlerActiveClassName);
            activeResize.current = true
            setActiveResize(true)
        }
    }
    const endResize = () => {
        if (panelRef.current && handlerRef.current) {
            panelRef.current.classList.remove(panelActiveClassName);
            handlerRef.current.classList.remove(handlerActiveClassName);
            activeResize.current = false
            setActiveResize(false)
        }
    }
    const resizeX = (widthResize: number) => {
        if (activeResize.current) {
            const xPosition = panelRef.current.getBoundingClientRect().x
            const relativePosition = widthResize - xPosition
            const breakPoint = findBreakPoint(relativePosition)
            if (breakPoint){
                resizeXPosition(relativePosition, breakPoint)
            }
        }
    }
    const resizeXPosition = (widthResize: number, breakPoint: BreakPoint) => {
        panelRef.current.style.maxWidth = breakPoint.maxWidth
        panelRef.current.style.minWidth = breakPoint.minWidth
        panelRef.current.style.width = widthResize + 'px'
        setWidth(widthResize, saveStateToLocalStorage)

        if (breakPoint.nameBreakPoint && lateBreakPoint.current !== breakPoint.nameBreakPoint) {
            setBreakPointActive(breakPoint.nameBreakPoint)
            setActiveBreakPoint(saveStateToLocalStorage, breakPoint.nameBreakPoint)
            lateBreakPoint.current = breakPoint.nameBreakPoint
        }
    }

    const mouseDown = (event: MouseEvent) => {
        if (event.target === handlerRef.current) {
            startResize()
        }
    }
    const mouseUp = () => {
        endResize()
    }
    const mouseMove = (event: MouseEvent) => {
        if (handlerRef.current) {
            const newWidth = event.x + (handlerRef.current.offsetWidth / 2)
            resizeX(newWidth)
        }
    }

    const touchStart = (event: TouchEvent) => {
        if (event.target === handlerRef.current) {
            startResize()
        }
    }
    const touchEnd = () => {
        endResize()
    }
    const touchMove = (event: TouchEvent) => {
        if (handlerRef.current) {
            const newWidth = event.changedTouches[0].clientX + (handlerRef.current.offsetWidth / 2)
            resizeX(newWidth)
        }
    }

    const preventDefaultDrag = (event: DragEvent) => {
        event.preventDefault()
    }
    function throttle<F extends (...args: any[]) => void>(func: F, delay: number): (...args: Parameters<F>) => void {
        let lastTime = 0;

        return function(this: any, ...args: Parameters<F>): void {
            const now = Date.now();
            if (now - lastTime >= delay) {
                func.apply(this, args);
                lastTime = now;
            }
        };
    }

    useEffect(() => {
        const handler = handlerRef.current;
        const panel = panelRef.current;

        if (!handler || !panel) return;

        const mouseDownHandler = throttle(mouseDown, 25)
        const mouseUpHandler = throttle(mouseUp, 25)
        const mouseMoveHandler = throttle(mouseMove, 25)

        const touchStartHandler = throttle(touchStart, 25)
        const touchEndHandler = throttle(touchEnd, 25)
        const touchMoveHandler = throttle(touchMove, 25)

        window.addEventListener('mousedown', mouseDownHandler)
        window.addEventListener('mouseup', mouseUpHandler)
        window.addEventListener('mousemove', mouseMoveHandler)

        window.addEventListener('touchmove', touchMoveHandler)
        window.addEventListener('touchstart', touchStartHandler)
        window.addEventListener('touchend', touchEndHandler)

        handler.addEventListener('dragstart', preventDefaultDrag)

        if (saveStateToLocalStorage) {
            const width = getWidth(saveStateToLocalStorage)
            const breakPoint = findBreakPoint(width)
            if (breakPoint) {
                resizeXPosition(width, breakPoint)
            }
        } else {
            const breakPoint = findBreakPoint(defaultWidth)
            if (breakPoint) {
                resizeXPosition(defaultWidth, breakPoint)
            }
        }

        return () => {
            window.removeEventListener('mousedown', mouseDownHandler)
            window.removeEventListener('mouseup', mouseUpHandler)
            window.removeEventListener('mousemove', mouseMoveHandler)

            window.removeEventListener('touchmove', touchMoveHandler)
            window.removeEventListener('touchstart', touchStartHandler)
            window.removeEventListener('touchend', touchEndHandler)

            if (handler) {
                handler.removeEventListener('dragstart', preventDefaultDrag);
            }
        }
    }, []);
    useEffect(() => {
        if (isActiveResize) {
            window.document.body.style.cursor = 'col-resize'
            window.document.body.style.userSelect = 'none'
        } else {
            window.document.body.style.cursor = 'auto'
            window.document.body.style.userSelect = 'auto'
        }
    }, [isActiveResize]);

    return [breakPointActive, getWidth(saveStateToLocalStorage)]

};

export default UseResizeHandler;