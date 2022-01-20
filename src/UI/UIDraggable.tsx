import { rgba } from "@react-spring/shared"
import { useEffect, useRef, useState } from "react"
import styled from 'styled-components';

interface UIDraggableProps {
    initPos?: { x: number, y: number }
    children?: JSX.Element
    onClose: () => void
    title: string

    windowProps?: React.CSSProperties
}

const CloseButton = styled.img`
    color: #fff;
    width: 12px;
    padding: 2px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0);
    :hover {
        filter: saturate(4276%) hue-rotate(228deg) brightness(102%);
        border: 1px solid #ffffffc5;
    }
`

export const UIDraggable = (props: UIDraggableProps) => {

    const [windowPos, setWindowPos] = useState([
        props.initPos?.x || window.innerWidth / 2,
        props.initPos?.y || window.innerHeight / 2
    ]);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState([0,0]);
    const windowRef = useRef<HTMLDivElement | null>();

    useEffect(() => {
        // center window on spawn
        if (windowRef.current) {
            const x = window.innerWidth/2 - windowRef.current.clientWidth/2;
            const y = window.innerHeight/2 - windowRef.current.clientHeight/2;
            setWindowPos([x, y]);
        }
    }, [windowRef])

    return <div
        ref={ref => windowRef.current = ref}
        style={{
            position: 'fixed',
            // top: windowPos[1],
            // left: windowPos[0],

            top: 0,
            left: 0,
            transform: `translate(${windowPos[0]}px, ${windowPos[1]}px)`,

            minWidth: 200,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            backgroundColor: isDragging ? '#2051ff' : 'rgba(255,255,255,0.3)',
            userSelect: 'none',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: 2,
            borderRadius: 3,

            ...props.windowProps
        }}

    >
        <div
            style={{
                padding: 10,
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
            }}

            onMouseDown={(mouseEvt) => {
                setIsDragging(true);
                if (windowRef.current) {
                    const windowX = windowRef.current.getBoundingClientRect().x;
                    const windowY = windowRef.current.getBoundingClientRect().y;
                    
                    const mouseX = mouseEvt.clientX;
                    const mouseY = mouseEvt.clientY;

                    setDragOffset([mouseX-windowX, mouseY-windowY]);
                }
            }}
            onMouseUp={() => {
                setIsDragging(false);
            }}
            onMouseLeave={(mouseEvt) => {
                if (isDragging && windowRef.current) {
                    const x = mouseEvt.clientX - dragOffset[0];
                    const y = mouseEvt.clientY - dragOffset[1];
                    setWindowPos([x, y]);
                }
                setIsDragging(false);
            }}
            onMouseMove={(mouseEvt) => {
                if (isDragging && windowRef.current) {
                    const x = mouseEvt.clientX - dragOffset[0];
                    const y = mouseEvt.clientY - dragOffset[1];
                    setWindowPos([x, y]);
                }
            }}
        >
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 12 }}>{props.title}</div>
            <CloseButton src="/icons/close.svg" onClick={props.onClose}></CloseButton>
        </div>
        <div>
            {props.children}
        </div>
    </div>
}