import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { nftPhotoViewerDataState, showInventoryState, showMenuState, showNFTPhotoViewerState, worldSceneState } from "../state/atoms";
import { SCENES } from "../state/types";
import { Inventory } from "./MainMenu/MainMenu";
import { NFTViewer } from "./NFTViewer";
import { UIDraggable } from "./UIDraggable";


const InventoryButton = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

margin: 20px;

padding: 15px;
border-radius: 50%;
background-color: rgba(255,255,255,0.2);
font-size: 16px;
font-family: Sarpanch;
font-weight: 700;
cursor: pointer;

transition: 0.1s ease-in-out;

:hover {
    background-color: #446DFF;
}

:active {
    margin-bottom: 10px;
}
`
const InventoryImage = styled.img`
width: 28px;
filter: brightness(10000%);
`

export const UserInterface = () => {

    const [showDebugMenu, setShowDebugMenu] = useRecoilState(showMenuState);
    const [worldScene, setWorldScene] = useRecoilState(worldSceneState);

    const [showNFTViewer, setShowNFTViewer] = useRecoilState(showNFTPhotoViewerState);
    const [showInventory, setShowInventory] = useRecoilState(showInventoryState);

    useEffect(() => {
        document.addEventListener('keypress', evt => {
            const { key } = evt;
            if (key === 'd') {
                setShowDebugMenu(true);
            }
        })
    }, []);


    return <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 999,
        }}>
            <InventoryButton onClick={() => setShowInventory(true)}>
                <InventoryImage src="/icons/island.svg" />
            </InventoryButton>
        </div>

        {/* NFT Viewer */}
        {showNFTViewer ? <>
            <UIDraggable title="NFT" onClose={() => setShowNFTViewer(false)}>
                <NFTViewer />
            </UIDraggable>
        </> : <></>}

        {/* Inventory */}
        {showInventory ? <>
            <UIDraggable title="BlocPass" onClose={() => setShowInventory(false)}>
                <Inventory />
            </UIDraggable>
        </> : <></>}

        {/* Blockpass Logo (Top Right) */}
        {/* <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 999,
        }}>
            <img src="/BLOCPASS.png" style={{ height: 30, margin: 10, opacity: 0.3 }} alt="Logo" />
        </div> */}

        {/* Debug Menu */}
        {showDebugMenu ? <UIDraggable onClose={() => setShowDebugMenu(false)} title="Debug Menu">
            <div style={{ padding: 20, color: '#fff' }}>
                <h3>Teleport</h3>
                <button onClick={() => setWorldScene(SCENES.Island)}>Island</button>
                <button onClick={() => setWorldScene(SCENES.MMOHome)}>MMOHome</button>
            </div>
        </UIDraggable> : <></>}
    </>

}