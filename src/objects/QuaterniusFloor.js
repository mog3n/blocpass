import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export const GrassBlock = (props) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    mass: 1,
    ...props
  }));
    return <>
    <mesh ref={ref}> 
      <boxGeometry />
      <meshBasicMaterial color="hotpink" opacity={0} transparent/>
      </mesh>
      <GrassModel {...props}/>
      </>
}

export const DirtBlock = (props) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    mass: 1,
    ...props
  }));
    return <>
    <mesh ref={ref}> 
      <boxGeometry />
      <meshBasicMaterial color="hotpink" opacity={0} transparent/>
      </mesh>
      <DirtModel {...props}/>
      </>
}


export function GrassModel(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/ground/Cube_Grass_Single.gltf');
  return (
    <group ref={group} {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube276.geometry}
        material={materials.Green_Light}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube276_1.geometry}
        material={materials.Dirt_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube276_2.geometry}
        material={materials.Dirt_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube276_3.geometry}
        material={materials.Dirt_3}
      />
    </group>
  )
}

export function DirtModel(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/assets/ground/Cube_Dirt_Single.gltf')
  return (
    <group ref={group} {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube045.geometry}
        material={materials.Dirt_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube045_1.geometry}
        material={materials.Dirt_2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube045_2.geometry}
        material={materials.Dirt_3}
      />
    </group>
  )
}

useGLTF.preload('/Cube_Dirt_Single.gltf')
useGLTF.preload('/Cube_Grass_Single.gltf')
