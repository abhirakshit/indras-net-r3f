import {useRef, useState, useContext, createContext, useReducer} from "react";
import {OrbitControls, Sky, useHelper} from "@react-three/drei";
import * as THREE from 'Three';
import {Perf} from "r3f-perf";
import {button, useControls} from "leva"
import MentalModel from "./mesh/MentalModel.jsx"

let nextId = 2;
const defaultModelProps = {innerLight: 5, arousal: 5, openness: 'Open', repression: false}
const initialModels = [
    {...defaultModelProps, id: 1, title: 'MM1', position: [2, 0, 0]},
    // {id: 2, title: 'MM2', position: [-2, 0, 0]},
]
function mentalModelReducer(models, action) {
    switch (action.type) {
        case 'added': {
            return [...models, {
                id: action.id,
                title: `MM-${nextId}`,
            }];
        }
        case 'changed': {
            return models.map(t => {
                if (t.id === action.model.id) {
                    return action.model;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return models.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}



export default function Exp() {
    //Light
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const [mentalModels, dispatch] = useReducer(mentalModelReducer, initialModels)
    //State
    // const [showTransform, setShowTransform] = useState(false)
    // const [id, setCurrentId] = useState(false)
    // const [mentalModels, setMentalModels] = useState(initialModels)

    const addNewMentalModel = () => {
        // const id = initialModels[initialModels.length - 1].id + 1
        // setMentalModels((mentalModels) => [...mentalModels, {
        //     id,
        //     title: `MM-${id}`,
        //     position: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]
        // }])
        // console.log(mentalModels)
    }

    const handleDeleteMentalModel = (modelId) => {
        console.log('delete model')
    }

    const handleUpdateMentalModel = (modelProps) => {
        console.log('update model')
    }

    const {perfVisible, sunPosition} = useControls('Scene', {
        'Add Sphere': button(addNewMentalModel),
        perfVisible: {label: 'Perf', value: true},
        sunPosition: {value: [1, 0, 1]}
    })

    return <>
        {perfVisible ? <Perf position="top-left"/> : null}
        <OrbitControls makeDefault/>
        <Sky sunPosition={sunPosition}/>

        {mentalModels.map(({id, title, position}) => {
            return <MentalModel
                key={`key-${id}`}
                // id
                position={position}
                title={title}
            ></MentalModel>
        })}


    </>
}