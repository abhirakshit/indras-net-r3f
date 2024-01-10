import {useRef, useState, useContext, createContext, useReducer} from "react";
import {Environment, GizmoHelper, GizmoViewport, OrbitControls, Sky, useHelper} from "@react-three/drei";
import * as THREE from 'Three';
import {Perf} from "r3f-perf";
import {button, useControls} from "leva"
import MentalModel from "./mesh/MentalModel.jsx"
import {DataContext} from "./DataContext.jsx";
import {useFrame, useThree} from "@react-three/fiber";

export default function Exp() {
    const {data, dispatch} = useContext(DataContext);
    const camera = useThree(state => state.camera)
    // console.log(camera)

    // useFrame(() => {
    //     console.log('Camera Position:', camera.position);
    //     console.log('Camera Rotation:', camera.rotation);
    // });

    //Light
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    // const [mentalModels, dispatch] = useReducer(mentalModelReducer, initialModels)

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
    const {perfVisible, sunPosition} = useControls('Scene', {
        'Add Sphere': button(addNewMentalModel),
        perfVisible: {label: 'Perf', value: false},
        // sunPosition: {value: [1, 0, 1]}
    })

    return <>
        {perfVisible ? <Perf position="top-left"/> : null}
        <OrbitControls makeDefault/>
        <Environment
            background
            preset="night"
        />
        {/*<Sky sunPosition={sunPosition}/>*/}

        {data.map((data) => {
            return <MentalModel
                key={`key-${data.id}`}
                {...data}
            ></MentalModel>
        })}

        {/*<GizmoHelper alignment="bottom-right" margin={[100, 100]}>*/}
        {/*    <GizmoViewport labelColor="white" axisHeadScale={1}/>*/}
        {/*</GizmoHelper>*/}
    </>
}