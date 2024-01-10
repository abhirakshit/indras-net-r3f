import React, { createContext, useReducer } from 'react';
function mentalModelReducer(models, action) {
    switch (action.type) {
        case 'GET_MODEL': {
            console.log('action', action)
        }
        case 'ADD_MODEL': {
            action.data.position.z += -5
            return [...models, {id: getId() , title: 'Mental Model', position: action.data.position, modelProperties: defaultModelProps}];
        }
        case 'UPDATE_MODEL': {
            console.log('action', action)
            return models.map(model => {
                if (model.id === action.data.id) {
                    return action.data;
                } else {
                    return model;
                }
            });
        }
        case 'REMOVE_MODEL': {
            return models.filter(t => t.id !== action.data.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const defaultModelProps = {
    innerLight: 5,
    arousal: 5,
    openness: 'Open',
    repression: false,
    resize: false
}

const getId = () => {
    return Math.random().toString(36).slice(2)
}

// const camera = useThree(state => state.camera)
// const getPosition = () => {
//     return new Vector3(camera.position.x, camera.position.y, camera.position.z - 5)
// }

const initialModels = [
    {id: getId() , title: 'New Model', position: [ - 0.2, -2.0, -12.5 ], modelProperties: defaultModelProps},
]
// console.log(initialModels)
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, dispatch] = useReducer(mentalModelReducer, initialModels);

    return (
        <DataContext.Provider value={{ data, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};