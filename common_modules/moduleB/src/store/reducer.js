const initState = {
    auth: ''
}

export default function (state = initState, action) {
    switch (action.type) {
        case 'UPDATE_AUTH': {
            return {
                ...state,
                auth: action.payload
            }
        }
        default: return state
    }
}