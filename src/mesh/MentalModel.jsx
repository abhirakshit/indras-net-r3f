import React, {createContext, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Clone, useGLTF, PivotControls, Sparkles} from "@react-three/drei";
import GlassMaterial from "../material/GlassMaterial.jsx";
import {useControls, folder, button} from "leva";
import {useFrame} from "@react-three/fiber";
import {Physics, RigidBody} from "@react-three/rapier";
import {DataContext} from "../DataContext.jsx";
// const ModelContext = createContext()

const Controls = (props) => {
    // const {modelProperties, setModelProperties} = useContext(ModelContext);
    // console.log('ctx', props)
    const {dispatch} = useContext(DataContext);
    useControls(`Mental Model`, {
        'Title': {
            value: props.title,
            onChange: (data) => {
                dispatch({
                    type: 'UPDATE_MODEL',
                    data: {...props, title: data}
                })
            }
        },
        'Properties': folder({
            innerLight: {label: 'Inner Light', value: props.modelProperties.innerLight, min: 1, max: 10, step: 1},
            arousal: {label: 'Arousal', value: props.modelProperties.arousal, min: 1, max: 10, step: 1},
            openness: {label: 'Openness', value: props.modelProperties.openness, options: ['Open', 'Closed', 'Partial']},
            repression: {value: props.modelProperties.repression, label: 'Repression'}
        }, {collapsed: false}),
        'Thought': folder({
            'Ruminate': button(() => {

            })
        }, {collapsed:true}),
        'Remove Sphere': button(() => {
            console.log('delete')
            dispatch({
                type: 'REMOVE_MODEL',
                data: {...props}
            })
        }),
    })
    return <></>
}


export default function MentalModel(props) {
    // const [modelProperties, setModelProperties] = useState(props.modelProperties)

    // console.log('Props', props)
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

    // useMemo(() => {
    //     if (isSelected)
    //         console.log('show menu')
    //     else
    //         console.log('hide menu')
    //
    // }, [isSelected])

    return (
        <>
            {/*<ModelContext.Provider value={{modelProperties, setModelProperties}}>*/}
            <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
                lineWidth={4}
                axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
                scale={100}
                fixed={true}
                object={modelRef}
                visible={false}
                // disableScaling={false}
            >
                <Physics debug={false}>
                    <RigidBody
                        type="fixed"
                        colliders="ball"
                        restitution={0}
                        friction={0.7}
                        // colliders={ false }
                        onCollisionEnter={collisionEnter}
                    >
                        <group dispose={null} ref={modelRef}>
                            <Sparkles count={50} scale={1} size={2} speed={0.4}/>

                            <mesh
                                castShadow
                                receiveShadow
                                geometry={model.nodes.Sphere.geometry}
                                onClick={clicked}
                                onPointerMissed={missed}
                            >
                                <pointLight position={[0, 0, 0]} intensity={10} color="#fff"/>
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
            </PivotControls>
            {isSelected &&
                <Controls {...props}/>
            }
            {/*</ModelContext.Provider>*/}
        </>
    )
}

useGLTF.preload("./mesh/hollowSphere_05.glb");