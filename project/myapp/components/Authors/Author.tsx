import React, { useContext } from 'react'
import { ScrollView, Text, TouchableHighlight, View, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native'
import styles from '../styleSheet'
import { IAuthor } from '../../types/types';
import { deleteAuthor } from '../../apis/api';
import GlobalContext from '../context';
import { useNavigation } from '@react-navigation/native';


interface AuthorProps {
    data: IAuthor;
}
export default function Author({ data }: AuthorProps) {
    const { authors, setAuthors } = useContext(GlobalContext)
    const { id, name, phone, email } = data;

    const navigation = useNavigation();
    const onDetails = () => {
        navigation.navigate('author-detail', data)

    }
    const onUpdateAuthor = () => {
        navigation.navigate('update-author', data)
    }
    const onDelete = async () => {
        try {
            const res = await deleteAuthor(id);
            if (res) {
                const arr = authors.filter(author => author.id !== data.id)
                setAuthors(arr)
            }
        } catch (error) {
            throw new Error("unable to delete this auhtor")
        }

    }

    const onDeleteAuthor = () => {
        try {
            Alert.alert('Information', 'Do you want to delete this author', [
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

        <ScrollView  >
            <View style={Authorstyles.listItem}>
                <Text style={Authorstyles.itemText}>{name}</Text>
                <Text style={Authorstyles.itemText}>phone : {phone} </Text>
                <Text style={Authorstyles.itemText}>email: {email}</Text>

                <View style={Authorstyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onDetails}
                        style={Authorstyles.button}
                    >
                        <Text style={Authorstyles.buttonText}>Detail</Text>
                    </TouchableOpacity>
                    <TouchableHighlight
                        onPress={onUpdateAuthor}
                        style={Authorstyles.button}
                        underlayColor="#5398DC">
                        <Text style={Authorstyles.buttonText}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={onDeleteAuthor}
                        style={Authorstyles.deletebutton}
                        underlayColor="#5398DC">
                        <Text style={Authorstyles.buttonText}>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    )
}

const Authorstyles = StyleSheet.create({
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    itemText: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    deletebutton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#FF0000',
        borderRadius: 15,
        alignItems: 'center',
    }
});