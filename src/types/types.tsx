//REVIEW AND ALTER THIS AS NECESSARY
export interface Token {
    username: string,
    jam: string
}

export interface Collection {
    id : string,
    name: string,
    description: string,
    creator: string,
    songs: string[],
    imageUrl: string
}
export interface CollectionFull {
    id: string,
    name: string,
    description: string,
    creator: string,
    imageUrl: string,
    songs: SongList[]
}

export interface CreateCollection {
    name: string,
    description: string,
    imageUrl: string
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
export interface UpdatePasswordCreds{
    oldPwd: string,
    newPwd: string,
    confirmPwd: string
}
export interface User {
    id: string,
    username: string,
    email: string,
    collections: string[],
    jams: string[]
}

export interface SongList {
    id: string,
    name: string,
    album:string,
    artist: string,
    imageUrl: string,
    bpm: number,
    key: string
}

export interface Song {
    id : string,
    name : string,
    album: string,
    artist: string,
    length: number,
    info: string,
    genres: string[],
    imageUrl: string,
    rating: number,
    numRates: number,
    lyrics: string,
    bpm: number,
    key: string
}

export interface SongMinimal {
    id: string,
    name: string,
    artist: string,
    imageUrl: string,
    bpm: number,
    key: string
}

export interface Album {
    id : string,
    name: string,
    artist: string,
    imageURL: string,
    year: string,
    label: string
}
export interface CreateJam {
    name: string,
    collectionId: string,
    imageURL: string
}

export interface Jam {
    id : string,
    name: string,
    host: string,
    participants: string[],
    playlist: string[],
    imageUrl: string,
}

export interface JamWithSong {
    id : string,
    name: string,
    host: string,
    participants: string[],
    playlist: string[],
    imageUrl: string,
    firstSong : SongMinimal
}


export interface Reviews {
    id : string,
    title: string,
    author: string,
    song: string,
    rating: number
}