import { atom } from "recoil";
import { NFTPhoto } from "../objects/PhotoFrame";
import { SCENES } from "./types";

export const worldSceneState = atom({
    key: 'worldSceneState',
    default: SCENES.MMOHome
})

export const showMenuState = atom({
    key: 'showMenuState',
    default: false,
})

export const showNFTPhotoViewerState = atom({
    key: 'showNFTPhotoViewerState',
    default: false,
})

export const nftPhotoViewerDataState = atom<NFTPhoto>({
    key: 'nftPhotoViewerDataState',
    default: { photoUrl: '' }
})