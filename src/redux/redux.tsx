import { createStore } from "redux";
import { JOINJAM, JoinJam, LeaveJam, LEAVEJAM, LOGIN, LoginAction, LOGOUT, LogoutAction, RESET_TOKEN, Reset_Token_Action, SessionActionTypes, SessionInfo } from "./redux-types";

//SESSION REDUCER
const STATE: SessionInfo = { isLogged: false, username: "", token: "", jam: "" }
const session_reducer = function (state = STATE, actions: SessionActionTypes): SessionInfo {
    switch (actions.type) {
        case LOGIN:
            state = { ...state, ...actions.data, isLogged: true };
            break;
        case LOGOUT:
            state = STATE;
            break;
        case RESET_TOKEN:
            state = { ...state, token: actions.data };
            break;
        case JOINJAM:
            state = {...state, jam: actions.data}
            break;
        case LEAVEJAM:
            state = {...state, jam:""}
            break;
    }
    return state;
}

//SESSION ACTIONS (TO ORGANIZE CODE)
export function login(data: SessionInfo): LoginAction {
    return { type: LOGIN, data: data }
}

export function logout(): LogoutAction {
    return { type: LOGOUT }
}

export function reset_token(data: string): Reset_Token_Action {
    return { type: RESET_TOKEN, data: data }
}

export function joinjam(data : string): JoinJam {
    return { type: JOINJAM, data: data}
}

export function  leavejam(data : string): LeaveJam {
    return { type: LEAVEJAM}
}

//STORE
const store = createStore(session_reducer)
store.subscribe(() => {
    //console.log("Redux Store", store.getState())
})
export default store

export const state_to_props = (state: any) => {
    return {
        isLogged: state.isLogged,
        token: state.token,
        username: state.username,
        jam: state.jam
    }
}

export const dispatch_to_props = (dispatch: any) => {
    return {
        login: (newSessionInfo: SessionInfo) => dispatch({
            type: LOGIN,
            data: newSessionInfo
        }),
        logout: () => dispatch({
            type: LOGOUT
        }),
        reset_token: (token: string) => dispatch({
            type: RESET_TOKEN,
            data: token
        }),
        joinjam : (jamid : string) => dispatch({
            type: JOINJAM,
            data : jamid
        }),
        leavejam: () => dispatch({
            type: LEAVEJAM
        })
    }
}

export type FullProps = ReturnType<typeof state_to_props> & ReturnType<typeof dispatch_to_props>