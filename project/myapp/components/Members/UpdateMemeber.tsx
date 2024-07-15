import React, { useContext, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import GlobalContext from '../context';
import { IMember } from '../../types/types';
import styles from '../styleSheet';
import { updateMember } from '../../apis/api';

export default function UpdateMemeber({ navigation, route }: any) {
    const data = route.params;
    const { members, setMembers } = useContext(GlobalContext);
    const [member, setMember] = useState<IMember>(data)

    const onSubmit = async () => {
        try {
            const res = await updateMember(member.id, member);
            if (res) {
                const index = members.findIndex(m => m.id === member.id)
                if (index !== -1) {
                    const arr = [...members]
                    arr[index] = res;
                    setMembers(arr);
                    navigation.goBack();
                }
            }
        } catch (error) {
            throw new Error("unable to update memeber")
        }
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder='Id'
                value={member.id}
                onChangeText={text => setMember({ ...member, id: text })}
                editable={false} />

            <TextInput style={styles.input}
                placeholder='First Name'
                value={member.firstname}
                onChangeText={text => setMember({ ...member, firstname: text })} />
            <TextInput style={styles.input}
                placeholder='Last Name'
                value={member.lastname}
                onChangeText={text => setMember({ ...member, lastname: text })} />
            <TextInput style={styles.input}
                placeholder='Resident Id'
                value={member.residentID}
                onChangeText={text => setMember({ ...member, residentID: text })} />
            <TextInput style={styles.input}
                placeholder='Address'
                value={member.address}
                onChangeText={text => setMember({ ...member, address: text })} />
            <TextInput style={styles.input}
                placeholder='email'
                value={member.email}
                onChangeText={text => setMember({ ...member, email: text })} />
            <TextInput style={styles.input}
                placeholder='Phone Number'
                value={member.phone}
                onChangeText={text => setMember({ ...member, phone: text })} />
            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
        </View>
    )
}
