import axios from "axios";
import { IAuthor, IBook, ICatalog, IMember, IPublisher, ITransaction } from "../types/types";
import { Alert } from "react-native";

axios.defaults.baseURL ='http://localhost:7000';

export async function getAuthors(){
    try {
        const res = await axios.get('/authors')
        if(res.status === 200){
            return res.data
        }
        
    } catch (error) {
        
    }
    return [];
}
export async function updateAuthor(id:string,author:IAuthor){
    try {
        const res = await axios.put(`/authors/${id}`,author)
        if(res.status === 200){
            return res.data
        }
    } catch (error) {
        
    }
    return null;
}

export async function checkAuthorExists(id:string){
    try {
        const res = await axios.get(`/authors/${id}`);
        return res.status === 200;
    } catch (error:any) {
        if(error.response && error.response.status===404){
            return false
        }
        throw error;
    }
}
export async function createAuthor(author:IAuthor){
     try {
        const isAuthorExist = await checkAuthorExists(author.id);
        if(isAuthorExist){
           
            Alert.alert('author already exist')
        }else{
const res = await axios.post('/authors',author)
        if(res.status === 201){
            return res.data
        }
        }
        
    } catch (error) {
        
    }
    return null;
}

export async function deleteAuthor(id:string){
    try {
        const res = await axios.delete(`/authors/${id}`)
        if(res.status === 200){
            return true
        }
    } catch (error) {
        throw new Error("unable to delete this author")
    }
    return false;
}

export async function getUser(email:string){
try {
    const res = await axios.get(`/users?email=${email}`)
    if(res.status === 200 && res.data.length > 0){
        return true;
    }
} catch (error) {
    throw new Error("email does not exist")
}
return false;
}

export async function getPublisher(){
       try {
        const res = await axios.get('/publishers')
        if(res.status === 200){
            return res.data
        }
        
    } catch (error) {
        throw new Error ("unable to get publishers ")
    }
    return [];
}
export async function checkPublisherExists(id:string){
    try {
        const res = await axios.get(`/publishers/${id}`);
        return res.status === 200;
    } catch (error:any) {
        if(error.response && error.response.status===404){
            return false
        }
        throw error;
    }
}

export async function createPublisher (publisher:IPublisher){
    try{
  const isAuthorExist = await checkPublisherExists(publisher.id);
        if(isAuthorExist){
            Alert.alert('Publisher already exist')
        }else{
 const res = await axios.post('/publishers',publisher)
        if(res.status === 201){
            return res.data
        }
        }
       
    } catch (error) {
        
    }
    return null;
}
export async function deletePublisher(id:string){
    try {
        const res = await axios.delete(`/publishers/${id}`)
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        throw new Error("unable to delete this publisher")
    }
    return false
}

export async function updatePublisher(id:String,publisher:IPublisher){
     try {
        const res = await axios.put(`/publishers/${id}`,publisher)
        if(res.status === 200){
            return res.data
        }
    } catch (error) {
       Alert.alert('unable to edit') 
    }
    return null;
}

export async function getBooks(){
       try {
        const res = await axios.get('/books')
        if(res.status === 200){
            return res.data
        }
        
    } catch (error) {
        throw new Error ("unable to get books ")
    }
    return [];
}

export async function checkBookExists(id:string){
     try {
        const res = await axios.get(`/books/${id}`);
        return res.status === 200;
    } catch (error:any) {
        if(error.response && error.response.status===404){
            return false
        }
        throw error;
    }
}
export async function createBook(book:IBook){
   try{
  const isBookExist = await checkBookExists(book.id);
        if(isBookExist){
            Alert.alert('book already exist')
        }else{
  const res = await axios.post('/books',book)
        if(res.status === 201){
            return res.data
        }
        }
      
    } catch (error) {
        
    }
    return null;
}
export async function updateBook(id:string,book:IBook){
    try {
        const res = await axios.put(`/books/${id}`,book)
        if(res.status===200){
            return res.data;
        }
    } catch (error) {
        Alert.alert('unable to edit') 
    }

}
export async function deleteBook(id:string){
    try {
        const res = await axios.delete(`/books/${id}`)
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        throw new Error("unable to delete this book")
    }
    return false 
}
export async function getMembers(){
    try {
        const res = await axios.get('/members')
        if(res.status === 200){
            return res.data
        } 
    } catch (error) {
        Alert.alert("members unavailable") 
    }
    return [];
    
}
export async function updateMember(id:String,member:IMember){
     try {
        const res = await axios.put(`/members/${id}`,member)
        if(res.status === 200){
            return res.data
        }
    } catch (error) {
       Alert.alert('unable to edit') 
    }
    return null;
}
export async function checkMemberExists(id:string){
     try {
        const res = await axios.get(`/members/${id}`);
        if(res.status === 200){
            return true
        }else{
            return false
        }
        
    } catch (error:any) {
        if(error.response && error.response.status===404){
            return false
        }
        throw error;
    }
}
export async function createMemeber (member:IMember){
    try{
        const isMemeberExist = await checkMemberExists(member.id);
        if(isMemeberExist){
            Alert.alert("memeber ID already exist")
        }else{
  const res = await axios.post('/members',member);
            if(res.status === 201){
            return res.data
        }
        }
        
        
    } catch (error) {
        
    }
    return null;
}
export async function deleteMemeber(id:string){
      try {
        const res = await axios.delete(`/members/${id}`)
        if(res.status === 200){
            return true;
        }
    } catch (error) {
        throw new Error("unable to delete this member")
    }
    return false 
}

export async function getCatalog(){
    try {
        const res = await axios.get('/catalogs');
        if(res.status === 200){
            return res.data;
        }
    } catch (error) {
        Alert.alert('Unable to get catalogs')
    }
}
export async function updateCatalog(id:string, cata:ICatalog){
    try {
        const res = await axios.put(`/catalogs/${id}`,cata)
        if(res.status === 200){
            return res.data
        }
    } catch (error) {
        
    }
    return null
}

export async function getTransaction(){
    try {
        const res = await axios.get('/transactions')
        if(res.status===200){
            return res.data
        }
    } catch (error) {
        Alert.alert('Unable to get transactions')
    }
    return null
}
export async function createTransaction(transaction:ITransaction){
    try {
        const res = await axios.post('/transactions',transaction)
        if(res.status===201){
            return res.data
        }
    } catch (error) {
        
    }
    return null;
}
export async function returnTransaction(transId:string,transaction:Partial<ITransaction>){
     try {
        const res = await axios.put(`/transactions/${transId}`,transaction)
        if(res.status === 200){
            return res.data
        }
    } catch (error) {
        
    }
    return null
}