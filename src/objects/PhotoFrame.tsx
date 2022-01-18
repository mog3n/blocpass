import { Image } from '@react-three/drei';
import { MeshProps, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { BufferGeometry, Color, Material, Mesh, MeshStandardMaterial } from 'three';
import { nftPhotoViewerDataState, showNFTPhotoViewerState } from '../state/atoms';

export interface NFTPhoto {
    photoUrl: string;
}

interface PhotoFrameProps extends MeshProps {
    photoNFT: NFTPhoto
}

export const PhotoFrame = (props: PhotoFrameProps) => {
    const imageRef = useRef<any>();
    const photoRef = useRef<Mesh<BufferGeometry, Material | Material[]>>();
    let [random, setRandom] = useState(1);
    const meshRef = useRef<MeshStandardMaterial>();
    const [isHovering, setIsHovering] = useState(false);
    
    // NFT viewer
    const setShowNFTViewer = useSetRecoilState(showNFTPhotoViewerState);
    const setNFTViewerData = useSetRecoilState(nftPhotoViewerDataState);

    useEffect(() => {
        setRandom(Math.random()*10);
    }, [])

    useFrame((state) => {
        const clock = state.clock;

        if(imageRef.current) {
            imageRef.current.scale.x = 0.85;
            imageRef.current.scale.y = 0.85;
        }
        if (photoRef.current && meshRef.current) {
            const deviation = Math.sin(clock.getElapsedTime()+random) * 0.005;
            photoRef.current.position.y += deviation;

            if (isHovering) {
                meshRef.current.color = new Color("#ac52ff");
            } else {
                meshRef.current.color = new Color("#fff");
            }
        }
    })

    return <group>
        <mesh {...props} ref={photoRef} onPointerOver={() => setIsHovering(true)} onPointerOut={() => setIsHovering(false)}
            onPointerDown={() => {
                setShowNFTViewer(true);
                setNFTViewerData(props.photoNFT)
            }}
        >
            <boxGeometry args={[1, 1, 0.01]} />
            <meshStandardMaterial ref={meshRef} color="#fff" metalness={0.5} roughness={0.5} envMapIntensity={2} />
            <Image ref={imageRef} url={props.photoNFT.photoUrl} position={[0, 0, 0.01]} />
        </mesh>
    </group>
}