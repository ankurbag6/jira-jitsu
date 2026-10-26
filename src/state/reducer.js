export const initialState = { status: 'idle', items: [], error: null };

export function reducer(state, action) {
    switch(action.type) {
        case "FETCH_START":
            return {...state, status: 'loading'};
        case "FETCH_SUCCESS":
            return {...state, status: 'success', items: action.payload};
        case "FETCH_ERROR":
            return {...state, status: 'error', error: action.error};
        default:
            return state;
    }
}