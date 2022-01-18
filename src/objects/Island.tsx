import { useBox, usePlane, Triplet, Debug } from '@react-three/cannon';
import { useFBX } from '@react-three/drei';
import React from 'react';

export const IslandAsset = (props: any) => {
    const fbx = useFBX('/assets/island.fbx');

    return <group dispose={null} {...props}>
        <mesh position={[0, -4, -6]} rotation={[0, Math.PI/2 + 0, 0]} scale={[0.2, 0.2, 0.2]}>
            <primitive object={fbx} />
        </mesh>
    </group>
}

export const WindmillIsland = (props: any) => {    
    const floorSize: Triplet = [17, 1, 2];
    // add floor
    const [ref] = useBox(() => ({
        args: floorSize,
        position: [-1, -1.2, 0],
        material: 'ground',
        type: 'Static',
        mass: 100,
        rotation: [-Math.PI/2, 0, 0]
    }));

    return <group {...props}>
        <mesh ref={ref}>
            <boxBufferGeometry args={floorSize}/>
            <meshPhongMaterial transparent color="hotpink" opacity={0}/>
        </mesh>
        <spotLight
            intensity={0.1}
            position={[-5, 8, 2]}
            angle={1}
            penumbra={1}
        />
        <IslandAsset />
    </group>
}