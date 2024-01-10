import {
    OrbitControls,
    Stage,
    useHelper,
    Environment,
    Sky
} from '@react-three/drei'
import {useRef, useState, Suspense} from 'react'
import {Perf} from 'r3f-perf'
import * as THREE from 'Three'
import {button, useControls} from "leva"

import MentalModel from "./mesh/MentalModel.jsx"

let initialModels = [
    {id: 1, title: 'MM1', position: [2, 0, 0]},
    {id: 2, title: 'MM2', position: [-2, 0, 0]},
]
export default function Experience() {
    const directionalLight = useRef()
    const [showTransform, setShowTransform] = useState(false)
    const [id, setCurrentId] = useState(false)

    const [mentalModels, setMentalModels] = useState(initialModels)

    const createNewMentalModel = () => {
        const id = initialModels[initialModels.length - 1].id + 1
        setMentalModels((mentalModels) => [...mentalModels, {
            id,
            title: 'test',
            position: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]
        }])
        console.log(mentalModels)
    }

    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const {createSphere, perfVisible, toggleTransform} = useControls('Scene', {
        'Create Sphere': button(createNewMentalModel),
        'Load Sphere': button(() => {
            console.log('create')
        }),
        toggleTransform: {label: 'Show Transform', value: showTransform, onChange: setShowTransform},
        perfVisible: {label: 'Perf', value: true}
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [ 1, -1, 1 ] }
    })

    return <>
        {perfVisible ? <Perf position="top-left"/> : null}

        <OrbitControls makeDefault/>
        {/*<Environment*/}
        {/*    background*/}
        {/*    // files="./environmentMaps/puresky_2k.hdr"*/}
        {/*    files="./environmentMaps/the_sky_is_on_fire_2k.hdr"*/}
        {/*    preset={"night"}*/}
        {/*    blur={1}*/}
        {/*/>*/}


        <Sky sunPosition={sunPosition}/>

        {/*<Suspense fallback={null}>*/}
        {/*{mentalModels.map((mentalModel) => {*/}
        {/*    return <MentalModel modelProps={mentalModel}></MentalModel>*/}
        {/*})}*/}
        {/*</Suspense>*/}

        {/*<Stage*/}
        {/*    // background*/}
        {/*    shadows={{type: 'contact', opacity: 0.2, blur: 3}}*/}
        {/*    // environment="sunset"*/}
        {/*    preset="portrait"*/}
        {/*    intensity={6}*/}
        {/*>*/}

        {/*    {mentalModels.map((mentalModel) => {*/}
        {/*        return <MentalModel modelProps={mentalModel}></MentalModel>*/}
        {/*    })}*/}
        {/*</Stage>*/}

    </>
}