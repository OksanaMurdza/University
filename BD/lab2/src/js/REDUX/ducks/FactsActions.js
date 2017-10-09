/*Constants*/
const FACTS_DATA = 'FACTS_DATA';
const SAVE_FACTS = 'SAVE_FACTS';


/*Actions*/
export function take_facts_data( props ) {
    return {
        type: FACTS_DATA,
        payload: props
    }
}


export function save_facts( props ) {
    return {
        type: SAVE_FACTS,
        payload: props
    }
}



const initialState = {
    facts_data : ''
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FACTS_DATA:
            return {...state, facts_data: action.payload};

        default:
            return state;
    }
}
