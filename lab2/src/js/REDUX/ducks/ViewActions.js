/*Constants*/
const REQUES_DATA = 'REQUES_DATA';
const DATA_FROM_FILE = 'DATA_FROM_FILE';
const VIEW_DATA = 'VIEW_DATA';


/*Actions*/

export function request_data( props ) {
    return {
        type: REQUES_DATA,
        payload: props
    }
}


export function data_from_file( props ) {
    return {
        type: DATA_FROM_FILE,
        payload: props
    }
}

export function view_data( props ) {
    return {
        type: VIEW_DATA,
        payload: props
    }
}

/*Initial State*/
const initialState = {
    request_data: [],
    dataFromFile: [],
    drawData: 'Загрузите файл (.json)'
};


/*Reducer*/


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUES_DATA:
            return {...state, request_data: action.payload};
    
        case DATA_FROM_FILE:
            return {...state, dataFromFile: action.payload};
            
        case VIEW_DATA:
            return {...state, drawData: action.payload};
            
        default:
            return state;
        
    }
}



