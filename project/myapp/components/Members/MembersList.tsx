import React, { useContext } from 'react'
import GlobalContext from '../context'
import { Pressable, SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native'

import { IMember } from '../../types/types'
import Member from './Member'

export default function MembersList({ navigation, route }: any) {
    const { members } = useContext(GlobalContext)
    const onMemberAdd = () => {
        navigation.navigate('add-member')
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable style={styles.button} onPress={onMemberAdd}>
                    <Text style={styles.buttonText}>Create Memeber </Text>
                </Pressable>

                {members.map((mem: IMember) => <Member key={mem.id} data={mem} />)}
            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    stickyHeader: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        zIndex: 10,
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
    input: {
        padding: 15,
        marginVertical: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        fontSize: 18,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
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




