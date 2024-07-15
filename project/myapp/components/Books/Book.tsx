import React, { useContext } from 'react'
import { Alert, Text, TouchableHighlight, TouchableOpacity, View, StyleSheet } from 'react-native'
import { IBook } from '../../types/types';
import GlobalContext from '../context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styleSheet';
import { deleteBook } from '../../apis/api';


interface BooksProps {
    data: IBook;
}
export default function Book({ data }: BooksProps) {
    const { books, setBooks } = useContext(GlobalContext)
    const { id, title, genre, category, authorIDs: [], publisherId } = data
    const navigation = useNavigation();
    const onDetails = () => {
        navigation.navigate('book-detail', data);

    }
    const onUpdateBook = () => {
        navigation.navigate('update-book', data);
    }
    const onDelete = async () => {
        try {
            const res = await deleteBook(id);
            if (res) {
                const index = books.findIndex(bk => bk.id === data.id)
                if (index !== -1) {
                    const arr = books.splice(index, 1)
                    setBooks(arr)
                }
            }
        } catch (error) {
            throw new Error("unable to delete this Book")
        }

    }

    const onDeleteBook = () => {
        try {
            Alert.alert('Information', 'Do you want to delete this Book', [
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
        <View style={BookStyle.listItem}>
            <Text style={BookStyle.itemText}>Title: {title}</Text>
            <Text style={BookStyle.itemText}>Category: {category}</Text>
            <View style={BookStyle.buttonContainer}>
                <TouchableOpacity
                    onPress={onDetails}
                    style={BookStyle.button}>
                    <Text style={styles.buttonText}>Detail</Text>
                </TouchableOpacity>
                <TouchableHighlight
                    onPress={onUpdateBook}
                    style={BookStyle.button}
                    underlayColor="#5398DC">
                    <Text style={BookStyle.buttonText}>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={onDelete}
                    style={BookStyle.deletebutton}
                    underlayColor="#5398DC">
                    <Text style={BookStyle.buttonText}>Delete</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const BookStyle = StyleSheet.create({
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

})