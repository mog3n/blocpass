import { Camera, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import Stats from 'stats.js';
import { useSphere } from '@react-three/cannon';
import { BufferGeometry, Material, Mesh, SpotLight, Vector3 } from 'three';
import Soldier from './Soldier';

interface ControllableProps {
  keyInputs: { [key: string]: boolean }
}

const CHARACTER_ACCELERATION = 10;
const CHARACTER_MAX_VELOCITY = 6;
const CAMERA_FOLLOW_SPEED = 0.05;
const ANIMATION_FADE_DURATION = 0.25;
// const WALK_VELOCITY = 2;


enum LookDirection {
  Left, Right
}

export const Controllable = (props: ControllableProps) => {
  const { keyInputs } = props;

  const playerPos = useRef([0, 0, 0]);
  const velocity = useRef([0, 0, 0]);
  const playerRotation = useRef([0, 0, 0]);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [animations, setAnimations] = useState<any>(null);
  const [currentAction, setCurrentAction] = useState<string>('Idle');
  const [lookDirection, setLookDirection] = useState<LookDirection>(LookDirection.Left);
  const lightRef = useRef<SpotLight>();

  const usernameTextRef = useRef<any>();

  const [ref, api] = useSphere(() => ({
    args: [0.3],
    mass: 1,
    position: [0, 1, 0],
    angularDamping: 0.998,
    onCollide: (collision) => {
      setIsJumping(false);
    }
  }));

  useEffect(() => {
    if (animations) {
      animations.actions['Idle'].play();
    }
  }, [animations])
  
  api.position.subscribe((position) => {
    playerPos.current = position
  });
  api.velocity.subscribe((_velocity) => {
    velocity.current = _velocity;
  });
  api.rotation.subscribe(rotation => {
    playerRotation.current = rotation;
  })

  const getPosition = () => {
    const rotation = lookDirection === LookDirection.Left ? Math.PI / 2 : 3 * Math.PI / 2;
    return { position: playerPos.current, rotation: [0, rotation, 0] }
  }


  useFrame((gameState) => {
    if (!api) {
      return;
    }

    const { clock, camera } = gameState;
    const delta = clock.getDelta();

    // move camera x to the player
    const { x: camX, y: camY, z: camZ } = camera.position;
    const curPosVector = new Vector3(camX, camY, camZ);
    const playerPosVector = new Vector3(playerPos.current[0],
      playerPos.current[1], playerPos.current[2]);
    curPosVector.lerp(playerPosVector, CAMERA_FOLLOW_SPEED);
    camera.position.setX(curPosVector.x);
    camera.position.x = curPosVector.x;
    camera.position.y = 5;
    camera.position.z = 13;

    // look at player at the same rate
    const directionVector: Vector3 = new Vector3(0, 0, 0);
    camera.getWorldDirection(directionVector);
    directionVector.lerp(new Vector3(playerPos.current[0], playerPos.current[1], playerPos.current[2]),
      CAMERA_FOLLOW_SPEED);
    camera.lookAt(playerPos.current[0], 4, playerPos.current[2]);

    // APPLY ANIMATIONS
    let animationToPlay = '';
    if (Math.abs(velocity.current[0]) >= 4) {
      animationToPlay = 'Run';
    } else if (Math.abs(velocity.current[0]) > 0.8 && Math.abs(velocity.current[0]) < 4) {
      animationToPlay = 'Walk';
    } else {
      animationToPlay = 'Idle';
    }
    if (currentAction !== animationToPlay) {
      const currentAnimation = animations.actions[currentAction];
      const nextAnimation = animations.actions[animationToPlay];

      currentAnimation.fadeOut(ANIMATION_FADE_DURATION);
      nextAnimation.reset().fadeIn(ANIMATION_FADE_DURATION).play();

      setCurrentAction(animationToPlay);
    }

    // mixer update
    if (animations && animations.mixer) {
      animations.mixer.update(delta);
    }

    // Change player direction && move player
    const playerVelocity = CHARACTER_ACCELERATION * (1 - delta);

    if (keyInputs['ArrowLeft']) {
      if (velocity.current[0] > -CHARACTER_MAX_VELOCITY) {
        api.applyForce([-playerVelocity, 0, 0], [1, 1, 0]);
        setLookDirection(LookDirection.Left);
      }
    } else if (keyInputs['ArrowRight']) {
      if (velocity.current[0] < CHARACTER_MAX_VELOCITY) {
        api.applyForce([playerVelocity, 0, 0], [1, 1, 0]);
        setLookDirection(LookDirection.Right);
      }
    }

    if (keyInputs[' '] && !isJumping) {
        api.applyForce([0, 500, 0], [0, 0, 0]); 
        setIsJumping(true);
    }

    // Apply username label
    if (usernameTextRef.current) {
      usernameTextRef.current.position.x = playerPos.current[0];
      usernameTextRef.current.position.y = playerPos.current[1] + 2;
      usernameTextRef.current.position.z = playerPos.current[2];
    }

    // move lighting with character
    if (lightRef.current) {
      lightRef.current.position.x = playerPos.current[0];
      lightRef.current.position.y = playerPos.current[1] + 2;
      lightRef.current.position.z = playerPos.current[2];
    }

    // Reset player position if they fall off the map
    if (playerPos.current[1] < -20) {
      api.position.set(0, 1, 0);
      api.velocity.set(0,0,0);
    }

  });


  return <group>
    <Soldier setAnimations={setAnimations} getPosition={getPosition} />
    {/* <Text depthOffset={20} outlineColor="white" outlineWidth={0.1} fontSize={0.25} ref={usernameTextRef} color="black" position={[0, 0, 10]} anchorX="center" anchorY="middle">EppcMogen</Text> */}
    <mesh ref={ref} castShadow>
      <sphereBufferGeometry args={[0.3, 25, 25]} />
      <meshToonMaterial color="hotpink" transparent opacity={0} />
    </mesh>
  </group>;
};
