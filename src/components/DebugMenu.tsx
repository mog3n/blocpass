import React from 'react';
import { useRecoilState } from "recoil";
import { showMenuState, worldSceneState } from "../state/atoms";
import { SCENES } from '../state/types';

interface MenuProps {
    showMenu?: boolean
}

export const Menu = (props: MenuProps) => {
    const [showMenu, setShowMenu] = useRecoilState(showMenuState);
    const [worldScene, setWorldScene] = useRecoilState(worldSceneState);

    return (
        <div
            style={{
                width: '100vw', height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
                alignItems: 'center',
                justifyContent: 'center',
                display: showMenu ? 'flex': 'none',
            }}
            onClick={() => {
                setShowMenu(false);
            }}
        >
           
        </div>
    );
}