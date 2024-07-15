import React, { useContext, useState } from 'react'
import { Alert, Text, TextInput, View, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import GlobalContext from '../context';
import { IBook } from '../../types/types';
import { updateBook } from '../../apis/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styleSheet';

export default function UpdateBook({ navigation, route }: any) {
    const data = route.params;
    const { books, setBooks, authors, publishers } = useContext(GlobalContext);
    const [book, setBook] = useState<IBook>(data);
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedPublisherId, setSelectedPublisherId] = useState('');

    const onSubmit = async () => {
        try {
            const res = await updateBook(book.id, book);

            if (res) {
                setBooks(books.map((bk) => {
                    if (bk.id == book.id) {
                        return res
                    }
                    return bk
                }));


                navigation.goBack();

            }
        } catch (error) {
            Alert.alert("unable to edit book")
        }
    }
    return (
        <SafeAreaView style={Pickerstyles.container}>
            <ScrollView>
                <TextInput style={styles.input}
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
                <Pressable style={Pickerstyles.button} onPress={onSubmit}>
                    <Text style={Pickerstyles.buttonText}>Submit</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

const Pickerstyles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
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
        elevation: 2,
    },
    picker: {
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
        elevation: 2,
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#0066cc',
        width: "38%",
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
});
