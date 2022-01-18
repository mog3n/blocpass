import { usePlane } from "@react-three/cannon";

export const TransparentWall = (props: any) => {
    const [ref] = usePlane(() => ({
        position: [0, 0, -0.5],
        ...props
    }));
    const [ref2] = usePlane(() => ({
        position: [0, 0, 1],
        rotation: [0, Math.PI, 0],
        ...props
    }));
    return <group ref={ref}>
        <mesh ref={ref}>
            <planeGeometry args={[5000, 50]} />
            <meshBasicMaterial transparent visible={false} />
        </mesh>
        <mesh ref={ref2} >
            <planeGeometry args={[5000, 50]} />
            <meshBasicMaterial transparent visible={false} />
        </mesh>
    </group>
}