import uuid from 'react-native-uuid';
export interface IBook {
    id: string
    title: string
    genre: string
    category: string
    authorIDs: string[]
    publisherId: string
}

export interface IAuthor {
    id: string
    name: string
    phone: string
    email: string
}

export interface IPublisher {
    id: string
    name: string
    phone: string
    email: string
    address: string
}

export interface ICatalog {
    id: string
    bookId: string
    numberOfCopies: number
    availableCopies: number
}

export interface IMember {
    id: string
    residentID: string
    firstname: string
    lastname: string
    address: string
    phone: string
    email: string
}

export interface ITransaction {
    id: string
    bookId: string
    memberId: string
    borrowedDate: string
    returnedDate: string
}

export interface IUser {
    id: string
    name: string
    email: string
}