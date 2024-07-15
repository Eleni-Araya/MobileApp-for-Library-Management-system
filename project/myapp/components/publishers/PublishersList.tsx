import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context'
import { IPublisher } from '../../types/types'
import { Pressable, SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native'

import Publisher from './Publisher'

export default function PublishersList({ navigation, route }: any) {
    const { publishers } = useContext(GlobalContext)
    const [displayData, setDisplayData] = useState<IPublisher[]>(publishers)
    const [publisher, setPublisher] = useState<IPublisher>({ id: "", name: "", phone: "", email: "", address: "" })

    useEffect(() => {
        setDisplayData(publishers)
    }, [])

    const onPublisherAdd = () => {
        navigation.navigate('add-publisher')
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable style={styles.button} onPress={onPublisherAdd}>
                    <Text style={styles.buttonText}>Create Publisher </Text>
                </Pressable>

                {publishers.map((publi: IPublisher) => <Publisher key={publi.id} data={publi} />)}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#0066cc',
        width: "48%",
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    text: {
        fontSize: 24,
        marginLeft: 40,
        padding: 20,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    deletebutton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#FF0000',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 50,
    },
});