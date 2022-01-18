// @ts-ignore
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, {useEffect, useRef} from 'react';
import {useGLTF, useAnimations, TransformControls, useHelper} from '@react-three/drei';
import {AnimationAction, AnimationClip, BoxHelper} from 'three';
import { useFrame } from '@react-three/fiber';

export default function Model({...props}) {
  const group = useRef();
  const {nodes, materials, animations} = useGLTF('/assets/Soldier.glb');
  const anim = useAnimations(animations, group);

  useEffect(() => {
    if (props.setAnimations) {
      props.setAnimations(anim);
    }
  }, []);

  useFrame(() => {
    if (props.getPosition) {
      const { position, rotation } = props.getPosition();
      group.current.position.set(position[0], position[1], position[2]);
      group.current.rotation.set(rotation[0], rotation[1], rotation[2]);
    }
  });

  return (
    <group ref={group} castShadow {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.vanguard_Mesh.geometry}
          material={materials.VanguardBodyMat}
          skeleton={nodes.vanguard_Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.vanguard_visor.geometry}
          material={materials.Vanguard_VisorMat}
          skeleton={nodes.vanguard_visor.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/Soldier.glb');
