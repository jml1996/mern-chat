import { SET_CURRENT_USERNAME } from '../actions'

export const initialState = {
    currentUsername: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_CURRENT_USERNAME):
            return({
                ...state,
                currentUsername: action.payload
            })
        default:
                return state;
    }
}

export default reducer;