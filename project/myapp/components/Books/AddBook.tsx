import React, { useContext, useState } from 'react'
import { Pressable, Text, TextInput, View, StyleSheet, Alert, SafeAreaView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import GlobalContext from '../context'
import { IBook } from '../../types/types';
import { createBook } from '../../apis/api';
import styles from '../styleSheet';

export default function AddBook({ navigation }: any) {
    const { books, setBooks, authors, publishers } = useContext(GlobalContext);
    const [book, setBook] = useState<IBook>({ id: "", title: "", genre: "", category: "", authorIDs: [], publisherId: '' })
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedPublisherId, setSelectedPublisherId] = useState('');

    const onAddBook = async () => {
        if (!book.title || !book.genre || !book.category || !selectedAuthor || !selectedPublisherId) {
            Alert.alert('Validation Error', 'Please fill out all fields');
            return;
        }
        try {
            const res = await createBook(book)
            if (res !== null) {
                const newData = [...books, res]
                setBooks(newData)
                // setBooks((prevBooks) => [...prevBooks, res])
                navigation.goBack()
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add book');
        }
    }

    return (
        <SafeAreaView style={Pickerstyles.container}>
            <TextInput style={Pickerstyles.input}
                placeholder='Id'
                value={book.id}
                onChangeText={text => setBook({ ...book, id: text })} />
            <TextInput style={Pickerstyles.input}
                placeholder='Title'
                value={book.title}
                onChangeText={text => setBook({ ...book, title: text })} />
            <TextInput style={Pickerstyles.input}
                placeholder='Genre'
                value={book.genre}
                onChangeText={text => setBook({ ...book, genre: text })} />
            <TextInput style={Pickerstyles.input}
                placeholder='Category'
                value={book.category}
                onChangeText={text => setBook({ ...book, category: text })} />

            <Picker
                selectedValue={selectedAuthor}
                onValueChange={(itemValue) => {
                    setSelectedAuthor(itemValue);
                    setBook({ ...book, authorIDs: [itemValue] })
                }}
                style={Pickerstyles.picker}>

                <Picker.Item label="Select an author" value="" />
                {authors.map((author) => (
                    <Picker.Item key={author.id} label={author.id} value={author.id} />
                ))}
            </Picker>


            <Picker
                selectedValue={selectedPublisherId}

                onValueChange={(itemValue) => {
                    setSelectedPublisherId(itemValue);
                    setBook({ ...book, publisherId: itemValue })
                }}

                style={Pickerstyles.picker}
            >
                <Picker.Item label="Select a publisher" value="" />
                {publishers.map((publisher) => (
                    <Picker.Item key={publisher.id} label={publisher.name} value={publisher.id} />
                ))}
            </Picker>


            <Pressable style={Pickerstyles.button} onPress={onAddBook}>
                <Text style={Pickerstyles.buttonText}>Submit</Text>
            </Pressable>
        </SafeAreaView>
    )
}
// 
const Pickerstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        height: 45,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingLeft: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    picker: {
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
