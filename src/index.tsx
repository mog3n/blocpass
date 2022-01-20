import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { Loader, PointerLockControls } from '@react-three/drei';
import reportWebVitals from './reportWebVitals';
import { IslandScene } from './scenes/IslandScene';
import { RecoilRoot, useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilState } from 'recoil';
import { showMenuState, worldSceneState } from './state/atoms';
import { SCENES } from './state/types';
import { Menu } from './UI/DebugMenu';
import { MMOHomeScene } from './scenes/MMOHomeScene';
import { UserInterface } from './UI/UserInterface';
// import { OrbitControls } from '@react-three/drei';

// import transparentTexture from './../public/transparent.png';

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 10;
camera.position.y = 2;


function App() {
  const [keysPressed, setKeysPressed] = useState<{ [key: string]: boolean }>({});
  const [worldScene, setWorldScene] = useRecoilState(worldSceneState);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  useEffect(() => {
    document.addEventListener('keydown', (keyEvt) => {
      const { key } = keyEvt;
      keysPressed[key] = true;
      setKeysPressed(keysPressed);
    });

    document.addEventListener('keyup', (keyEvt) => {
      const { key } = keyEvt;
      keysPressed[key] = false;
      setKeysPressed(keysPressed);
    });
  }, []);

  return <>
    <Canvas camera={camera} shadows gl={{ alpha: false, antialias: true, }} dpr={window.devicePixelRatio}>
      <RecoilBridge>
        {worldScene === SCENES.Island ? <IslandScene keysPressed={keysPressed} /> : <></>}
        {worldScene === SCENES.MMOHome ? <MMOHomeScene keysPressed={keysPressed} /> : <></>}
      </RecoilBridge>
    </Canvas>
  </>
}

ReactDOM.render(
  <div style={{ width: '100vw', height: '100vh' }}>
    <Suspense fallback={<Loader />}>
      <RecoilRoot>
        <UserInterface />
        <App />
      </RecoilRoot>
    </Suspense>
  </div>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
