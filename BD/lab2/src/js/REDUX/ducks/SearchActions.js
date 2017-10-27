/*Constants*/
const SEARCH_ITEM = 'SEARCH_ITEM';

/*Actions*/

export function filter_data( props ) {
    return {
        type: SEARCH_ITEM,
        payload: props
    }
}


/*Initial State*/
const initialState = {
  filter_data: ''
};


/*Reducer*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ITEM:
            return {...state, filter_data: action.payload};
        
        default:
            return state;
    }
}



