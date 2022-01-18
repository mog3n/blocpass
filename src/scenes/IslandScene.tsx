import { Physics, usePlane } from "@react-three/cannon";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { Controllable } from "../character/Controllable";
import { IslandAsset, WindmillIsland } from "../objects/Island";
import { NFTPhoto, PhotoFrame } from "../objects/PhotoFrame";
import { worldSceneState } from "../state/atoms";
import { TransparentWall } from "../WorldHelpers/TransparentWall";

interface IslandSceneProps {
    keysPressed: { [key: string]: boolean }
}

export const IslandScene = (props: IslandSceneProps) => {

    const { keysPressed } = props;

    const NFTs: NFTPhoto[] = [
      {
      photoUrl: '/assets/bored.png',
    },
    {
      photoUrl: '/assets/punk.png'
    }
  ]

    return <>
    <hemisphereLight intensity={0.25} color="#4a22ff" />
      <spotLight
        position={[-30, 30, 10]}
        angle={0}
        penumbra={1}
        intensity={1}
        castShadow
        color="#dc6aff"
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <spotLight
        position={[-30, 30, -10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#0547ff"
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />


      <Stars radius={100} depth={50} count={5000} fade />
      {/* <OrbitControls /> */}
      <Physics gravity={[0, -25, 0]}>

        <TransparentWall />
        <OrbitControls />

        <WindmillIsland />
        <PhotoFrame position={[-6, 4, -2]} photoNFT={NFTs[0]} scale={[3, 3, 3]} />
        <PhotoFrame position={[-3, 3, -3]} photoNFT={NFTs[1]} scale={[3, 3, 3]} />

        <IslandAsset />

        <Controllable keyInputs={keysPressed} />

      </Physics>
    </>
}