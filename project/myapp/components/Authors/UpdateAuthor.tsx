import React, { useContext, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import styles from '../styleSheet'
import GlobalContext from '../context'
import { IAuthor } from '../../types/types';
import { updateAuthor } from '../../apis/api';

export default function UpdateAuthor({ navigation, route }: any) {
    const data = route.params;
    const { authors, setAuthors } = useContext(GlobalContext);
    const [author, setAuthor] = useState<IAuthor>(data)

    const onSubmit = async () => {
        try {
            const res = await updateAuthor(author.id, author);
            if (res) {
                const index = authors.findIndex(a => a.id === author.id)
                if (index !== -1) {
                    const arr = [...authors]
                    arr[index] = res;
                    setAuthors(arr);
                    navigation.goBack();
                }
            }
        } catch (error) {
            throw new Error("unable to update author")
        }
    }

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
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Id'
                value={author.id}
                onChangeText={text => setAuthor({ ...author, id: text })}
                editable={false} />
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
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    )
}
