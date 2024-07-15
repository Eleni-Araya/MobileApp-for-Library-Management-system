import { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Home from './components/Home';
import { IAuthor, IBook, IMember, IPublisher, ITransaction } from './types/types';
import GlobalContext from './components/context'
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import BooksList from './components/Books/BooksList';
import AuthorsList from './components/Authors/AuthorsList';
import PublishersList from './components/publishers/PublishersList';
import MembersList from './components/Members/MembersList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuthors, getBooks, getMembers, getPublisher, getTransaction } from './apis/api';
import AddAuthor from './components/Authors/AddAuthor';
import Author from './components/Authors/Author';
import AuthorDetail from './components/Authors/AuthorDetail';
import UpdateAuthor from './components/Authors/UpdateAuthor';
import AddPublisher from './components/publishers/AddPublisher';
import UpdatePublisher from './components/publishers/UpdatePublisher';
import PublisherDetail from './components/publishers/PublisherDetail';
import AddBook from './components/Books/AddBook';
import BookDetail from './components/Books/BookDetail';
import UpdateBook from './components/Books/UpdateBook';
import MemberDetail from './components/Members/MemberDetail';
import UpdateMemeber from './components/Members/UpdateMemeber';
import AddMember from './components/Members/AddMember';
import BorrowBook from './components/Transaction/BorrowBook';
import ReturnBook from './components/Transaction/ReturnBook';
import Transaction from './components/Transaction/Transaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEY } from './components/constant';

const { Screen } = createBottomTabNavigator();
const { Navigator } = createNativeStackNavigator()

export default function App() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [publishers, setPublishers] = useState<IPublisher[]>([])
  const [members, setMembers] = useState<IMember[]>([])
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loggedIn, setLoggedIn] = useState(false)

  async function loadAuthorsData() {
    try {
      const data = await getAuthors()
      setAuthors(data)
    } catch (error) {
      throw new Error("unable to get authors")
    }
  }
  async function loadPublisherData() {
    try {
      const data = await getPublisher()
      console.log("this is publishers......", data)
      setPublishers(data)
    } catch (error) {
      throw new Error("unable to get publishers")
    }
  }
  async function loadBooksData() {
    try {
      const data = await getBooks()
      console.log("this is books......", data)
      setBooks(data)
    } catch (error) {
      throw new Error("unable to get books")
    }
  }
  async function loadMembersData() {
    try {
      const data = await getMembers()
      setMembers(data)
    } catch (error) {
      Alert.alert("unable to get members")
    }
  }
  async function loadTransaction() {
    try {
      const data = await getTransaction()
      setTransactions(data)
    } catch (error) {
      Alert.alert("unable to get transactions")
    }

  }

  useEffect(() => {
    loadAuthorsData()
    loadPublisherData()
    loadBooksData()
    loadMembersData()
    loadTransaction()
    LoginControl()
  }, [])
  const LoginControl = async () => {
    const userExist = await AsyncStorage.getItem(LOCAL_STORAGE_KEY)
    if (userExist) {
      const log = JSON.parse(userExist)
      setLoggedIn(log.loggedIn)
    }
  }

  if (!loggedIn) {
    return <Login />
  }
  return (
    <GlobalContext.Provider value={{
      books, setBooks, authors, setAuthors,
      publishers, setPublishers, members, setMembers,
      transactions, setTransactions,
      loggedIn, setLoggedIn
    }}>
      <NavigationContainer>
        {/* <Navigator>
          <Screen name='home' component={Home} options={{
            title: 'Home',
            tabBarIcon: ({ color }) =>
              <Ionicons name='home' color={color} size={25} />
          }} />
          <Screen name='account' component={UserInfo} options={{
            title: 'Account',
            tabBarIcon: () =>
              <MaterialCommunityIcons name="account" size={24} color="black" />
          }} />

        </Navigator> */}
        <Navigator>
          <Screen name='home' component={Home} options={{
            title: 'Home',
            tabBarIcon: ({ color }) =>
              <Ionicons name='home' color={color} size={25} />
          }} />
          <Screen name='books-list' component={BooksList} />
          <Screen name='authors-list' component={AuthorsList} />
          <Screen name='publishers-list' component={PublishersList} />
          <Screen name='memebers-list' component={MembersList} />
          <Screen name='add-author' component={AddAuthor} />
          <Screen name='author-detail' component={AuthorDetail} />
          <Screen name='update-author' component={UpdateAuthor} />
          <Screen name='add-publisher' component={AddPublisher} />
          <Screen name='update-publisher' component={UpdatePublisher} />
          <Screen name='publisher-detail' component={PublisherDetail} />
          <Screen name='add-book' component={AddBook} />
          <Screen name='book-detail' component={BookDetail} />
          <Screen name='update-book' component={UpdateBook} />
          <Screen name='memeber-detail' component={MemberDetail} />
          <Screen name='update-memeber' component={UpdateMemeber} />
          <Screen name='add-member' component={AddMember} />
          <Screen name='transaction' component={Transaction} />
          <Screen name='borrow-book' component={BorrowBook} />
          <Screen name='return-book' component={ReturnBook} />

        </Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
