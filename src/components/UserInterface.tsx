import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { nftPhotoViewerDataState, showMenuState, showNFTPhotoViewerState, worldSceneState } from "../state/atoms";
import { SCENES } from "../state/types";
import { UIDraggable } from "./UIDraggable";

export const UserInterface = () => {

    const [showDebugMenu, setShowDebugMenu] = useRecoilState(showMenuState);
    const [worldScene, setWorldScene] = useRecoilState(worldSceneState);

    const [showNFTViewer, setShowNFTViewer] = useRecoilState(showNFTPhotoViewerState);
    const [nftViewerData, setNFTViewerData] = useRecoilState(nftPhotoViewerDataState);

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
            left: 0,
            zIndex: 999,
        }}>
            <div style={{
                margin: 20,
                color: '#000',
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '50px',
                padding: 10,
            }}>
            </div>
        </div>

        {/* NFT Viewer */}
        {showNFTViewer ? <>
            <UIDraggable title="NFT" onClose={() => setShowNFTViewer(false)}>
                <div style={{ border: '20px solid #000' }}>
                    <img src={nftViewerData.photoUrl} style={{
                        border: '10px solid #fff',
                        backgroundColor: '#fff',
                        imageRendering: 'pixelated',
                        maxWidth: '300px',
                        userSelect: 'none',
                        MozUserSelect: 'none',
                        WebkitUserSelect: 'none',
                    }} alt="NFT" />
                </div>
            </UIDraggable>
        </> : <></>}

        {/* Blockpass Logo (Top Right) */}
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 999,
        }}>
            <img src="/BLOCPASS.png" style={{ height: 30, margin: 10, opacity: 0.2 }} alt="Logo" />
        </div>

        {/* Debug Menu */}
        {showDebugMenu ? <UIDraggable onClose={() => setShowDebugMenu(false)} title="Debug Menu">
            <div style={{padding: 20, color: '#fff'}}>
            <h3>Teleport</h3>
            <button onClick={() => setWorldScene(SCENES.Island)}>Island</button>
            <button onClick={() => setWorldScene(SCENES.MMOHome)}>MMOHome</button>
            </div>
        </UIDraggable> : <></>}
    </>
}