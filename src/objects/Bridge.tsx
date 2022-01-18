import { useFBX } from "@react-three/drei"

export const Bridge = (props: any) => {
    const fbx = useFBX('/assets/Bridge_Small.fbx');

    return <mesh scale={[0.01, 0.01, 0.01]} {...props}>
        <primitive object={fbx} />
    </mesh>
}