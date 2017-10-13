/*Constants*/
const FACTS_DATA = 'FACTS_DATA';
const DRAW_FACTS = 'SAVE_FACTS';
const EDIT_ITEM = 'EDIT_ITEM';
const INPUT_PANEL = 'INPUT_PANEL';


/*Actions*/

export function take_facts_data( props ) {
    return (dispatch) => {
        dispatch({
            type: FACTS_DATA,
            payload: props
        })
    }
}



export function draw_facts( props ) {
    return {
        type: DRAW_FACTS,
        payload: props
    }
}

export function edit_item( props ) {
    return {
        type: EDIT_ITEM,
        payload: props
    }
}

export function input_panel( props ) {
    return {
        type: INPUT_PANEL,
        payload: props
    }
}


const initialState = {
    facts_data : '',
    draw: '',
    editItem: ' ',
    inputPanel: false
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FACTS_DATA:
            return {...state, facts_data: action.payload};

        case DRAW_FACTS:
            return {...state, draw: action.payload};
        
        case EDIT_ITEM:
            return {...state, editItem: action.payload};
            
        case INPUT_PANEL:
            return {...state, inputPanel: action.payload};
            
        default:
            return state;
    }
}
