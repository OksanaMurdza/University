/*Constants*/
const SELECT_VALUE = 'SELECT_VALUE';
const SAVE_DATA = 'SAVE_DATA';
const MAKE_LINK = 'MAKE_LINK';


/*Actions*/

export function select_value( props ) {
    return {
        type: SELECT_VALUE,
        payload: props,
    }
}


export function save_data( props ) {
    return {
        type: SAVE_DATA,
        payload: props
    }
}


export function make_link( props ) {
    return {
        type: MAKE_LINK,
        payload: props
    }
}

/*Initial State*/
const initialState = {
    view: false,
    modalType: '',
    
    value: 0,
    options: ['Рейс','Перевозчик','Самолёт'],
    second_options: [
        ['ID', 'Название', 'Город'],
        ['ID перевозчика','Год основания','Название'],
        ['ID','Модель','Вместимость']
    ],
    link: '',
    data: []
};

/*Reducer*/
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_VALUE:
            return {...state, value: action.payload};

        case SAVE_DATA:
            return {...state, data: action.payload};
            
        case MAKE_LINK:
            return {...state, link:action.payload};
        default:
            return state;
    }
}