const initialState = { status: 'idle', items: [], error: null };

function reducer(state, action) {
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

console.log(reducer(initialState, { type: 'FETCH_START' }));

console.log(reducer(initialState, { type: 'FETCH_SUCCESS', payload: [1, 2] }));

console.log(reducer(initialState, { type: 'FETCH_ERROR', error: "Error: Network failed!" }));