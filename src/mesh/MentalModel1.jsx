import {folder, useControls} from "leva";
import {useState} from "react";

export default function MentalModel1({modelProps}) {
    // console.log(modelProps)
    const [isSelected, setIsSelected] = useState(false)

    const clicked = (event) => {
        console.log(`Clicked ${modelProps.title}`)
        event.stopPropagation()
        setIsSelected(true)
    }

    const missed = () => {
        console.log(`Missed ${modelProps.title}`)
        setIsSelected(false)
    }

    const mentalModelControls = useControls('Mental Model', {
        'Transform': folder({
            'Resize': false
        }),
        'States': folder({

        }),
    },{collapsed: true},[isSelected])
    return <>
        <mesh
            position={modelProps.position}
            castShadow
            onClick={clicked}
            onPointerMissed={missed}
        >
            <sphereGeometry/>
            <meshPhysicalMaterial roughness={0} metalness={.5} transmission={1} envMapIntensity={1}/>
        </mesh>
    </>
}