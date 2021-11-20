//REVIEW AND ALTER THIS AS NECESSARY

export interface User {
    username: string,
    email: string,
    password: string,
    collections: string[]
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