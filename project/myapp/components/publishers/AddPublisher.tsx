import React from 'react'
import { useContext, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import styles from '../styleSheet'
import GlobalContext from '../context'
import { IPublisher } from '../../types/types'
import { createPublisher } from '../../apis/api'

export default function AddPublisher({ navigation }: any) {
    const { publishers, setPublishers } = useContext(GlobalContext)
    const [publisher, setPublisher] = useState<IPublisher>({ id: '', name: '', phone: '', email: '', address: '' })

    const onChangePhone = (fieldName: string, text: string) => {
        if (fieldName === 'phone') {
            const numericInput = text.replace(/\D/g, '');
            if (numericInput.length <= 10) {
                setPublisher({ ...publisher, phone: text });
            }
        } else {
            setPublisher({ ...publisher, phone: text });
        }
    }
    const onAddAuthor = async () => {
        try {

            if (publisher.id !== '' || publisher.name !== '' || publisher.phone !== '' || publisher.email !== '' || publisher.address !== '') {
                const res = await createPublisher(publisher)
                if (res !== null) {
                    const newData = [...publishers, res]
                    setPublishers(newData)
                    navigation.goBack()
                }
            }

        } catch (error) {
            throw new Error("unable to add author")
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Id'
                value={publisher.id}
                onChangeText={text => setPublisher({ ...publisher, id: text })} />
            <TextInput style={styles.input}
                placeholder='Name'
                value={publisher.name}
                onChangeText={text => setPublisher({ ...publisher, name: text })} />
            <TextInput style={styles.input}
                placeholder='Phone'
                value={publisher.phone}
                onChangeText={(text: string) => onChangePhone('phone', text)}
                maxLength={10} />
            <TextInput style={styles.input}
                placeholder='Email'
                value={publisher.email}
                onChangeText={text => setPublisher({ ...publisher, email: text })} />
            <TextInput style={styles.input}
                placeholder='Address'
                value={publisher.address}
                onChangeText={text => setPublisher({ ...publisher, address: text })} />
            <Pressable style={styles.button} onPress={onAddAuthor}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    )
}
