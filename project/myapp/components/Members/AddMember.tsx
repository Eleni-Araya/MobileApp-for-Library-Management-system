import React, { useContext, useState } from 'react'
import { createMemeber } from '../../apis/api'
import GlobalContext from '../context'
import { IMember } from '../../types/types'
import { Pressable, Text, TextInput, View, StyleSheet, ScrollView, Alert } from 'react-native'
// import styles from '../styleSheet'

export default function AddMembers({ navigation }: any) {
    const { members, setMembers } = useContext(GlobalContext)
    const [member, setMember] = useState<IMember>({ id: '', firstname: '', lastname: '', address: '', phone: '', email: '', residentID: '' })

    const onAddMemeber = async () => {
        try {
            if (member.id !== "", member.firstname !== "", member.lastname !== "", member.address !== "", member.phone !== "", member.email !== "", member.residentID !== "") {
                const res = await createMemeber(member)
                if (res !== null) {
                    const newData = [...members, res]
                    setMembers(newData)
                    navigation.goBack()
                }
            } else {
                Alert.alert("fill all the fields")
            }

        } catch (error) {
            throw new Error("Unable to add Member")
        }
    }

    return (
        <View style={MemberFormStyles.container}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TextInput style={MemberFormStyles.input}
                    placeholder='Id'
                    value={member.id}
                    onChangeText={text => setMember({ ...member, id: text })}
                />

                <TextInput style={MemberFormStyles.input}
                    placeholder='First Name'
                    value={member.firstname}
                    onChangeText={text => setMember({ ...member, firstname: text })} />
                <TextInput style={MemberFormStyles.input}
                    placeholder='Last Name'
                    value={member.lastname}
                    onChangeText={text => setMember({ ...member, lastname: text })} />
                <TextInput style={MemberFormStyles.input}
                    placeholder='Resident Id'
                    value={member.residentID}
                    onChangeText={text => setMember({ ...member, residentID: text })} />
                <TextInput style={MemberFormStyles.input}
                    placeholder='Address'
                    value={member.address}
                    onChangeText={text => setMember({ ...member, address: text })} />
                <TextInput style={MemberFormStyles.input}
                    placeholder='email'
                    value={member.email}
                    onChangeText={text => setMember({ ...member, email: text })} />
                <TextInput style={MemberFormStyles.input}
                    placeholder='Phone Number'
                    value={member.phone}
                    onChangeText={text => setMember({ ...member, phone: text })}
                    maxLength={10} />
                <Pressable style={MemberFormStyles.button} onPress={onAddMemeber}>
                    <Text style={MemberFormStyles.buttonText}>Submit</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const MemberFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        width: '100%', // Set width to 100% of the parent container
    },
    button: {
        paddingVertical: 15,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginTop: 20,
        width: '100%', // Set width to 100% of the parent container
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});