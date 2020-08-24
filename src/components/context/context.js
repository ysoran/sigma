import { createContext } from 'react';

let reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PARSER':
            return {
                ...state,
                jsonData: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

const initialState = {
    jsonGlobal: {
        jsonData: [],
        dispatch: () => { }
    },
    dispatch: (action) => { }
};

const JsonContext = createContext(initialState);

export { initialState, reducer, JsonContext };