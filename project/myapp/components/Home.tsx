import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BooksList from './Books/BooksList'
import AuthorsList from './Authors/AuthorsList'
import PublishersList from './publishers/PublishersList'
import MembersList from './Members/MembersList'
import { Image, Pressable, Text, View, StyleSheet } from 'react-native'
// import styles from './styleSheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOCAL_STORAGE_KEY } from './constant'
import GlobalContext from './context'


const { Navigator, Screen } = createNativeStackNavigator()

export default function Home({ navigation }: any) {
    const { loggedIn, setLoggedIn } = useContext(GlobalContext)
    const onBook = () => {
        navigation.navigate('books-list')
    }
    const onAuthor = () => {
        navigation.navigate('authors-list')
    }
    const onPublisher = () => {
        navigation.navigate('publishers-list')
    }
    const onMembers = () => {
        navigation.navigate('memebers-list')
    }

    const onTransaction = () => {
        navigation.navigate('transaction')
    }

    const onLogOut = async () => {
        const logOut = await AsyncStorage.removeItem(LOCAL_STORAGE_KEY)
        setLoggedIn(false)
    }

    return (

        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onBook}>
                <Text style={styles.buttonText}>Books</Text>
                <Image
                    source={require('../assets/Books.jpg')}
                    style={styles.image}
                />

            </Pressable>
            <Pressable style={styles.button} onPress={onAuthor}>
                <Text style={styles.buttonText}>Authors </Text>
                <Image
                    source={require('../assets/Books.jpg')}
                    style={styles.image}
                />
            </Pressable>
            <Pressable style={styles.button} onPress={onPublisher}>
                <Text style={styles.buttonText}>Publishers </Text>
                <Image
                    source={require('../assets/Books.jpg')}
                    style={styles.image}
                />
            </Pressable>
            <Pressable style={styles.button} onPress={onMembers}>
                <Text style={styles.buttonText}>Memebers </Text>
                <Image
                    source={require('../assets/Books.jpg')}
                    style={styles.image}
                />
            </Pressable>
            <Pressable style={styles.button} onPress={onTransaction}>
                <Text style={styles.buttonText}>Transaction </Text>
                <Image
                    source={require('../assets/hero.jpg')}
                    style={styles.image}
                />
            </Pressable>
            <Pressable style={styles.button} onPress={onLogOut}>
                <Text style={styles.buttonText}>LogOut </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', // Arrange children in a row
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10, // Add some spacing between the images
    }, button: {

    },
    buttonText: {}
});