import React, { useContext } from 'react'
import { IMember } from '../../types/types'
import GlobalContext from '../context';
import { ScrollView, Text, TouchableHighlight, TouchableOpacity, View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteMemeber } from '../../apis/api';

interface MemberProps {
    data: IMember
}
export default function Member({ data }: MemberProps) {
    const { id, residentID, firstname, lastname, address, phone, email } = data;
    const { members, setMembers } = useContext(GlobalContext)
    const navigation = useNavigation();
    const onDetails = () => {
        navigation.navigate('memeber-detail', data)
    }
    const onUpdateMember = () => {
        navigation.navigate('update-memeber', data)
    }
    const onDelete = async () => {
        try {
            const res = await deleteMemeber(id);
            if (res) {
                const arr = members.filter(mb => mb.id !== data.id)
                setMembers(arr)

            }
        } catch (error) {
            throw new Error("unable to delete this memeber")
        }

    }
    const onDeleteMemeber = () => {
        try {
            Alert.alert('Information', 'Do you want to delete this memeber', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
                {
                    text: 'OK',
                    onPress: onDelete
                },
            ]);
        } catch (error) {

        }
    }
    return (
        <SafeAreaView>
            <View style={Memberstyles.listItem}>
                <Text style={Memberstyles.itemText}>{firstname}-{lastname}</Text>
                <Text style={Memberstyles.itemText}>email: {email}</Text>
                <View style={Memberstyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onDetails}
                        style={Memberstyles.button}
                    >
                        <Text style={Memberstyles.buttonText}>Detail</Text>
                    </TouchableOpacity>
                    <TouchableHighlight
                        onPress={onUpdateMember}
                        style={Memberstyles.button}
                        underlayColor="#5398DC">
                        <Text style={Memberstyles.buttonText}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={onDeleteMemeber}
                        style={Memberstyles.deletebutton}
                        underlayColor="#DC3545">
                        <Text style={Memberstyles.buttonText}>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}

const Memberstyles = StyleSheet.create({
    listItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
});
