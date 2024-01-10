import React, {useEffect, useMemo, useRef, useState} from "react";
import {Clone, useGLTF, PivotControls, Sparkles} from "@react-three/drei";
import GlassMaterial from "../material/GlassMaterial.jsx";
import {useControls, folder} from "leva";
import {useFrame} from "@react-three/fiber";
import {Physics, RigidBody} from "@react-three/rapier";


const Controls = ({title}) => {
    const [modelProperties, setModelProperties] = useState({
        innerLight: 5,
        arousal: 5,
        openness: 'Open',
        repression: false
    })
    useControls(`Mental Model: ${title}`, {
        'Transform': folder({
            resize: {value: false, label: 'Resize'}
        }, {collapsed: true}),
        'States': folder({
            innerLight: {label: 'Inner Light', value: modelProperties.innerLight, min: 1, max: 10, step: 1},
            arousal: {label: 'Arousal', value: modelProperties.arousal, min: 1, max: 10, step: 1},
            openness: {label: 'Openness', value: modelProperties.openness, options: ['Open', 'Closed', 'Partial']},
            repression: {value: modelProperties.repression, label: 'Resize'}
        }, {collapsed: true}),
    })
    return <></>
}

export default function MentalModel(props) {
    // console.log(props)
    const model = useGLTF("./mesh/hollowSphere_05.glb");
    // console.log(model)
    const modelRef = useRef()
    const projectileRef = useRef()
    const [isSelected, setIsSelected] = useState(false)

    useFrame((state, delta) => {
        const angle = state.clock.elapsedTime
        // console.log(Math.sin(angle) * 8)
        projectileRef.current.position.x = Math.sin(angle) * 4
    })

    const clicked = (e) => {
        e.stopPropagation()
        setIsSelected(true)
    }

    const missed = () => {
        setIsSelected(false)
    }

    const collisionEnter = () => {
        console.log('collision')
    }

    useMemo(() => {
        if (isSelected)
            console.log('show menu')
        else
            console.log('hide menu')

    }, [isSelected])

    return (
        // <Clone object={model.scene}></Clone>
        <>
            <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
                lineWidth={4}
                axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                scale={100}
                fixed={true}
                object={modelRef}
            >
            </PivotControls>

            <Physics debug={false}>
                <RigidBody
                    type="fixed"
                    colliders="ball"
                    restitution={ 0 }
                    friction={ 0.7 }
                    // colliders={ false }
                    onCollisionEnter={ collisionEnter }
                >
                    <group {...props} dispose={null} ref={modelRef}>
                        <Sparkles count={50} scale={1} size={2} speed={0.4} />

                        <mesh
                            castShadow
                            receiveShadow
                            geometry={model.nodes.Sphere.geometry}
                            onClick={clicked}
                            onPointerMissed={missed}
                        >
                            <pointLight position={[0,0,0]} intensity={10} color="#fff" />
                            <GlassMaterial/>
                            <RigidBody type="fixed" colliders="ball">
                                <mesh visible userData={{hello: 'world'}} position={[0, 0, 0]} ref={projectileRef}>
                                    <sphereGeometry args={[.05, 64, 64]}/>
                                    <meshMatcapMaterial/>
                                </mesh>
                            </RigidBody>
                        </mesh>
                    </group>
                </RigidBody>
            </Physics>
            {isSelected && <Controls title={props.title}/>}
        </>
    )
}

useGLTF.preload("./mesh/hollowSphere_05.glb");