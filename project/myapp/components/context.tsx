import { createContext } from 'react'
import { IAuthor, IBook, IMember, IPublisher, ITransaction } from '../types/types'

interface IContext {
    books: IBook[];
    setBooks: (updatedBooks: IBook[]) => void;
    authors: IAuthor[],
    setAuthors: (authors: IAuthor[]) => void
    publishers: IPublisher[],
    setPublishers: (publishers: IPublisher[]) => void;
    members: IMember[],
    setMembers: (members: IMember[]) => void;
    transactions: ITransaction[],
    setTransactions: (trans: ITransaction[]) => void;
    loggedIn: boolean,
    setLoggedIn: (log: boolean) => void
}
const GlobalContext = createContext<IContext>({
    books: [],
    setBooks: () => { },
    authors: [],
    setAuthors: () => { },
    publishers: [],
    setPublishers: () => { },
    members: [],
    setMembers: () => { },
    transactions: [],
    setTransactions: () => { },
    loggedIn: false,
    setLoggedIn: () => { }
})

export default GlobalContext