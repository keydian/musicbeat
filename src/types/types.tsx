//REVIEW AND ALTER THIS AS NECESSARY
export interface Token {
    username: string
}

export interface LoginCreds {
    username: string,
    pwd: string
}

export interface RegisterCreds {
    username: string,
    email: string,
    pwd: string,
    confirmPwd: string
}

export interface User {
    id: string,
    username: string,
    email: string,
    collections: string[],
    jams: string[]
}

export interface Song {
    name : string,
    album: string,
    artist: string,
    length: number,
    info: string,
    genres: string[],
    image: string
}

export interface Album {
    name: string,
    artist: string,
    image: string
}

export interface Jam {
    name: string,
    host: string,
    participants: string[],
    playlist: string[]
}

export interface Collection {
    name: string,
    creator: string,
    songs: string[],
    image: string
}

export interface Reviews {
    title: string,
    author: string,
    song: string
}