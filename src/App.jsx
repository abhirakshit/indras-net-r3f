import {useContext, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import './App.css'
import Exp from "./Exp";
import {DataProvider} from "./DataContext.jsx";

function App() {

  return (
    <>
        <Canvas
            shadows
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ - 0.2, -2.0, -7.5 ]
            } }
        >
            <DataProvider>
                <Exp/>
            </DataProvider>

            <EffectComposer>
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                <Noise opacity={0.02} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </Canvas>
    </>
  )
}

export default App
