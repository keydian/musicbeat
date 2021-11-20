import {createStore} from "redux";
import { LOGIN, LoginAction, LOGOUT, LogoutAction, RESET_TOKEN, Reset_Token_Action, SessionActionTypes, SessionInfo } from "./redux-types";

//SESSION REDUCER
const STATE : SessionInfo = {isLogged : false, username : "", token : ""}
const session_reducer = function(state = STATE, actions : SessionActionTypes) : SessionInfo {
    switch(actions.type) {
        case LOGIN:
            state = {...state, ...actions.data, isLogged : true};
            break;
        case LOGOUT:
            state = STATE;
            break;
        case RESET_TOKEN:
            state = {...state, token : actions.data};
            break;
    }
    return state;
}

//SESSION ACTIONS (TO ORGANIZE CODE)
export function login(data : SessionInfo) : LoginAction{
    return {type: LOGIN, data: data}
}

export function logout() : LogoutAction{
    return {type: LOGOUT}
}

export function reset_token(data : string) : Reset_Token_Action{
    return {type: RESET_TOKEN, data: data}
}

//STORE
const store = createStore(session_reducer)
store.subscribe(() => {
    console.log("Store changed", store.getState())
})
export default store