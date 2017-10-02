/*Constants*/
const VALIDATE_NAME = 'VALIDATE_NAME';

/*Actions*/

export function validate_name(props) {
    return {
        type: VALIDATE_NAME,
        payload: props,
    }
}


/*Initial State*/
const initialState = {
    view: false,
    modalType: '',
    
};

/*Reducer*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case VALIDATE_NAME:
            return {...state, validateName: action.payload};


        default:
            return state;
    }
}