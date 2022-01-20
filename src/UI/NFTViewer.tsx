import { useRecoilState } from "recoil";
import { nftPhotoViewerDataState } from "../state/atoms";
import { UIDraggable } from "./UIDraggable"

export const NFTViewer = (props: any) => {
    const [nftViewerData, setNFTViewerData] = useRecoilState(nftPhotoViewerDataState);
    return  <div style={{ border: '20px solid #000' }}>
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
}