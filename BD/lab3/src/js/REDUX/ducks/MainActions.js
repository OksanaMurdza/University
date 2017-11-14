/*Constants*/
// const REQUES_DATA = 'REQUES_DATA';


/*Actions*/

// export function request_data( props ) {
//     return {
//         type: REQUES_DATA,
//         payload: props
//     }
// }



/*Initial State*/
const initialState = {
    request_data: [],
    dataFromFile: [],
    drawData: 'Загрузите файл (.json)',
    editItem: ''
};


/*Reducer*/


export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case REQUES_DATA:
        //     return {...state, request_data: action.payload};
    
        default:
            return state;
        
    }
}



