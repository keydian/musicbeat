export const LOGIN = "login"
export const LOGOUT = "logout"
export const RESET_TOKEN = "reset_token"
export const JOINJAM = "join_jam"
export const LEAVEJAM = "leave_jam"

export interface SessionInfo{
    isLogged : boolean;
    username : string;
    token : string;
    jam : string;
}

export interface LoginAction{
    type : typeof LOGIN
    data : SessionInfo
}

export interface LogoutAction{
    type : typeof LOGOUT
}

export interface Reset_Token_Action{
    type : typeof RESET_TOKEN
    data : string
}

export interface JoinJam {
    type: typeof JOINJAM
    data : string
}

export interface LeaveJam {
    type: typeof LEAVEJAM
}

export type SessionActionTypes = LoginAction | LogoutAction | Reset_Token_Action | JoinJam | LeaveJam