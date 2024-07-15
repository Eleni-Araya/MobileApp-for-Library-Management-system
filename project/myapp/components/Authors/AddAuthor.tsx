import React, { useContext, useState } from 'react'
import { Alert, Pressable, Text, TextInput, View } from 'react-native'
import styles from '../styleSheet'
import { IAuthor } from '../../types/types'
import { createAuthor } from '../../apis/api'
import GlobalContext from '../context'

export default function AddAuthor({ navigation }: any) {
    const { authors, setAuthors } = useContext(GlobalContext)
    const [author, setAuthor] = useState<IAuthor>({ id: '', name: '', phone: '', email: '' })

    const onChangePhone = (fieldName: string, text: string) => {
        if (fieldName === 'phone') {
            const numericInput = text.replace(/\D/g, '');
            if (numericInput.length <= 10) {
                setAuthor({ ...author, phone: text });
            }
        } else {
            setAuthor({ ...author, phone: text });
        }
    }
    const onAddAuthor = async () => {
        try {
            if (author.id !== "", author.name !== '', author.phone !== "", author.email !== "") {
                const res = await createAuthor(author)
                if (res !== null) {
                    const newData = [...authors, res]

                    setAuthors(newData)
                    navigation.goBack()
                }
            } else {
                Alert.alert("fill all the fields")
            }

        } catch (error) {
            throw new Error("unable to add author")
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Id'
                value={author.id}
                onChangeText={text => setAuthor({ ...author, id: text })} />
            <TextInput style={styles.input}
                placeholder='Name'
                value={author.name}
                onChangeText={text => setAuthor({ ...author, name: text })} />
            <TextInput style={styles.input}
                placeholder='Phone'
                value={author.phone}
                onChangeText={(text: string) => onChangePhone('phone', text)}
                maxLength={10} />
            <TextInput style={styles.input}
                placeholder='Email'
                value={author.email}
                onChangeText={text => setAuthor({ ...author, email: text })} />
            <Pressable style={styles.button} onPress={onAddAuthor}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    )
}
