import React, { useContext, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import GlobalContext from '../context';
import { IPublisher } from '../../types/types';
import { updatePublisher } from '../../apis/api';
import styles from '../styleSheet';

export default function UpdatePublisher({ navigation, route }: any) {
    const data = route.params;
    const { publishers, setPublishers } = useContext(GlobalContext);
    const [publisher, setPublisher] = useState<IPublisher>(data)

    const onSubmit = async () => {
        try {
            const res = await updatePublisher(publisher.id, publisher);
            if (res) {
                const index = publishers.findIndex(pub => pub.id === publisher.id)
                if (index !== -1) {
                    const arr = [...publishers]
                    arr[index] = res;
                    setPublishers(arr);
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
                setPublisher({ ...publisher, phone: text });
            }
        } else {
            setPublisher({ ...publisher, phone: text });
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Id'
                value={publisher.id}
                onChangeText={text => setPublisher({ ...publisher, id: text })}
                editable={false} />
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
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    )
}
