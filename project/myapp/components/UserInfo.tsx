import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import styles from './styleSheet'

export default function UserInfo() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const onAddUser = () => {

    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Name'
                value={name}
                onChangeText={text => setName(text)} />
            <TextInput style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)} />
            <Pressable style={styles.button} onPress={onAddUser}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    )
}
