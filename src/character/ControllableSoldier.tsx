import {Camera, useFrame} from '@react-three/fiber';
import React, {useEffect} from 'react';
import {useState} from 'react';
import Soldier from './Soldier';
import Stats from 'stats.js';
import {Triplet, useSphere} from '@react-three/cannon';
import {Vector3} from 'three';

interface ControllableSoldierProps {
    keyInputs: { [key: string]: boolean }
    camera: Camera
}

const FADE_DURATION = 0.125;
const CHARACTER_ACCELERATION = 200;
const CHARACTER_MAX_VELOCITY = 5;
const CAMERA_FOLLOW_SPEED = 0.05;
// const WALK_VELOCITY = 2;


const stats = new Stats();
document.body.appendChild(stats.dom);

export const ControllableSoldier = (props: ControllableSoldierProps) => {
  const {keyInputs} = props;

  const [currentAction, setCurrentAction] = useState<string>('Idle');
  const [playerAnimations, setPlayerAnimations] = useState<any>(null);
  const [playerPos, setPlayerPos] = useState<Triplet>([0, 0, 0]);
  const [velocity, setPlayerVelocity] = useState<Triplet>([0, 0, 0]);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 2, 0],
    angularDamping: 1,
  }));

  api.position.subscribe((position) => {
    setPlayerPos(position);
  });
  api.velocity.subscribe((velocity) => {
    setPlayerVelocity(velocity);
  });

  useFrame((gameState) => {
    stats.begin();
    if (!playerAnimations || !api) {
      return;
    }

    const {clock} = gameState;
    const delta = clock.getDelta();

    // move camera x to the player
    const {x: camX, y: camY, z: camZ} = props.camera.position;
    const curPosVector = new Vector3(camX, camY, camZ);
    const playerPosVector = new Vector3(playerPos[0],
        playerPos[1], playerPos[2]);
    curPosVector.lerp(playerPosVector, CAMERA_FOLLOW_SPEED);
    props.camera.position.x = curPosVector.x;

    // look at player at the same rate
    const directionVector: Vector3 = new Vector3(0, 0, 0);
    props.camera.getWorldDirection(directionVector);
    directionVector.lerp(new Vector3(playerPos[0], playerPos[1], playerPos[2]),
        CAMERA_FOLLOW_SPEED);
    props.camera.lookAt(playerPos[0], playerPos[1], playerPos[2]);


    // Choose animation to play
    let animationToPlay = '';
    const directionPressed = keyInputs['ArrowLeft'] || keyInputs['ArrowRight'];
    if (directionPressed) {
      animationToPlay = 'Run';
    } else {
      animationToPlay = 'Idle';
    }

    if (currentAction !== animationToPlay) {
      const currentAnimation = playerAnimations.actions[currentAction];
      const nextAnimation = playerAnimations.actions[animationToPlay];

      currentAnimation.fadeOut(FADE_DURATION);
      nextAnimation.reset().fadeIn(FADE_DURATION).play();

      setCurrentAction(animationToPlay);
    }

    // mixer update
    if (playerAnimations && playerAnimations.mixer) {
      playerAnimations.mixer.update(delta);
    }

    // Change player direction && move player
    const playerVelocity = CHARACTER_ACCELERATION * (1-delta);

    if (keyInputs['ArrowLeft']) {
      api.rotation.set(0, Math.PI/2, 0);
      if (velocity[0] > -CHARACTER_MAX_VELOCITY) {
        api.applyForce([-playerVelocity, 0, 0], [0, 0.1, 0]);
      }
    } else if (keyInputs['ArrowRight']) {
      api.rotation.set(0, 3*Math.PI/2, 0);
      if (velocity[0] < CHARACTER_MAX_VELOCITY) {
        api.applyForce([playerVelocity, 0, 0], [0, 0.1, 0]);
      }
    }


    stats.end();
  });

  useEffect(() => {
    // Play character animations
    if (playerAnimations && playerAnimations.actions &&
        playerAnimations.actions.Idle) {
      playerAnimations.actions.Idle.play();
    }
  }, [playerAnimations]);

  return <group ref={ref}>
    <Soldier setAnimations={setPlayerAnimations} />
  </group>;
};
