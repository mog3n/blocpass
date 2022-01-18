import { Physics } from "@react-three/cannon"
import { OrbitControls, Sky, Stars, TransformControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Controllable } from "../character/Controllable"
import { IslandAsset } from "../objects/Island"
import { DirtBlock, GrassBlock } from "../objects/QuaterniusFloor"
import { TransparentWall } from "../WorldHelpers/TransparentWall"

interface MMOHomeSceneProps {
    keysPressed: {[key: string]: boolean}
}

const generateGround = (width: number, height: number, depth: number) => {

    // Hacky tool to let us use the map function
    let returnObject = [];

    for (let z = 0; z<depth; z++) {
        for (let x=0; x<width; x++) {
            returnObject.push(<GrassBlock position={[x-Math.floor(width/2), 0, z-(Math.floor(depth/2))]} />);
    
            for (let y=0; y<height; y++) {
                returnObject.push(<DirtBlock position={[x-Math.floor(width/2), -y-1, z-(Math.floor(depth/2))]} />);
            }
        }
    }
    

   
    // dirt block

    return returnObject;
}

export const MMOHomeScene = (props: MMOHomeSceneProps) => {

    useFrame((state) => {

    })

    return <>
        <hemisphereLight intensity={0.35} color="#419aff"/>
        <pointLight intensity={0.5} color="#c000c0" position={[20, 10, -20]}/>
        <Stars />
        <Physics gravity={[0, -25, 0]}>
            <TransparentWall />
            {/* <OrbitControls /> */}

            <fog near={0}  far={10}/>
            <IslandAsset position={[0, 5, -20]}/>

            {generateGround(50, 0, 3)}

            <Controllable keyInputs={props.keysPressed}/>
        </Physics>
    </>
}