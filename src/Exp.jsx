import {useRef, useState, useContext, createContext, useReducer} from "react";
import {Environment, GizmoHelper, GizmoViewport, OrbitControls, Sky, useHelper} from "@react-three/drei";
import * as THREE from 'Three';
import {Perf} from "r3f-perf";
import {button, useControls} from "leva"
import MentalModel from "./mesh/MentalModel.jsx"
import {DataContext} from "./DataContext.jsx";
import {useFrame, useThree} from "@react-three/fiber";
import SphereTest from "./mesh/SphereTest.jsx";
import HollowSphere from "./mesh/HollowSphere.jsx";
import {Physics, RigidBody} from "@react-three/rapier";
import MergedSpheres from "./mesh/MergedSpheres.jsx";

export default function Exp() {
    const {data, dispatch} = useContext(DataContext);
    const camera = useThree(state => state.camera)

    //Light
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const addNewMentalModel = () => {
        console.log('add model', camera.position)
        dispatch({type: 'ADD_MODEL', data: {position: camera.position}})
        // console.log(data)
    }

    const handleDeleteMentalModel = (modelId) => {
        console.log('delete model')
    }

    const handleUpdateMentalModel = (modelProps) => {
        console.log('update model')
    }

    /**
     * Default Controls
     */
    const {perfVisible, sunPosition, background, Debug} = useControls('Scene', {
        'Add Sphere': button(addNewMentalModel),
        perfVisible: {label: 'Perf', value: false},
        background: {
            options: ['night', 'apartment', 'city', 'dawn', 'forest', 'sunset', 'lobby', 'park', 'studio', 'warehouse'],
            label: 'Background'
        },
        'Debug': false
        // sunPosition: {value: [1, 0, 1]}
    })

    return <>
        {perfVisible ? <Perf position="top-left"/> : null}
        <OrbitControls makeDefault/>
        <Environment
            background
            preset={background}
        />
        {/*<Sky sunPosition={sunPosition}/>*/}

        <Physics debug={Debug}>
            {data.map((data) => {
                // return <SphereTest  key={`key-${data.id}`}/>
                // return <HollowSphere key={`key-${data.id}`}/>
                // return <MergedSpheres key={`key-${data.id}`}/>

                return <MentalModel
                    key={`key-${data.id}`}
                    {...data}
                ></MentalModel>


            })}

            {/*<RigidBody type="fixed">*/}
            {/*    <mesh receiveShadow position-y={-2.25}>*/}
            {/*        <boxGeometry args={[10, 0.5, 10]}/>*/}
            {/*        <meshStandardMaterial color="greenyellow"/>*/}
            {/*    </mesh>*/}
            {/*</RigidBody>*/}
        </Physics>
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1}/>
        </GizmoHelper>
    </>
}