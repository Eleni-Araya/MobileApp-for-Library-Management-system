import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Pressable, SafeAreaView, Text, TextInput } from 'react-native'
import styles from './styleSheet'
import { getUser } from '../apis/api'
import { LOCAL_STORAGE_KEY } from './constant';
import GlobalContext from './context';

interface LoginProps {
    setLoggedIn: (loggedIn: boolean) => void
}
export default function Login() {
    const [email, setEmail] = useState("")
    const { setLoggedIn } = useContext(GlobalContext)
    const onLogin = async () => {
        console.log("....this is ")
        if (email.trim() === "") {
            return Alert.alert("please enter email")
        }
        const res = await getUser(email);
        console.log("this is ...", res)
        if (res) {
            AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ loggedIn: true }))
            setLoggedIn(true);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none' />
            <Pressable style={styles.buttonLogin} onPress={onLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </SafeAreaView>
    )
}
