//REVIEW AND ALTER THIS AS NECESSARY
export interface Token {
    username: string
}

export interface CreateCollection {
    name: string,
    description: string,
    image: string
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
    id : string,
    name : string,
    album: string,
    artist: string,
    length: number,
    info: string,
    genres: string[],
    image: string
}

export interface Album {
    id : string,
    name: string,
    artist: string,
    image: string
}

export interface Jam {
    id : string,
    name: string,
    host: string,
    participants: string[],
    playlist: string[]
}

export interface Collection {
    id : string,
    name: string,
    description: string,
    creator: string,
    songs: string[],
    image: string
}

export interface Reviews {
    id : string,
    title: string,
    author: string,
    song: string,
    rating: number
}