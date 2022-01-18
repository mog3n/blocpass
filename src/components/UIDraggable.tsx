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

const CloseButton = styled.div`
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    :hover {
        color: #f700ff7e;
    }
`

export const UIDraggable = (props: UIDraggableProps) => {
    const [windowPos, setWindowPos] = useState([props.initPos?.x || 0, props.initPos?.y || 0]);
    const [isDragging, setIsDragging] = useState(false);
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
            top: windowPos[1],
            left: windowPos[0],
            minWidth: 200,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            backgroundColor: isDragging ? '#f700ff7e' : 'rgba(255,255,255,0.3)',
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
            }}
            onMouseUp={() => {
                setIsDragging(false);
            }}
            onMouseLeave={() => {
                setIsDragging(false);
            }}
            onMouseMove={(mouseEvt) => {
                if (isDragging && windowRef.current) {
                    const x = mouseEvt.clientX - windowRef.current.clientWidth / 2;
                    const y = mouseEvt.clientY - 20;

                    const DRAG_THRESHOLD = 3; // in pixels
                    if (Math.abs(x - windowPos[0]) > DRAG_THRESHOLD && Math.abs(y - windowPos[1]) > DRAG_THRESHOLD) {
                        setWindowPos([x, y]);
                    }
                }
            }}
        >
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 12 }}>{props.title}</div>
            <CloseButton onClick={props.onClose}>[Close]</CloseButton>
        </div>
        {props.children}
    </div>
}