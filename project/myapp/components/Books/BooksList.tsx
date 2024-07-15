import React, { useContext, useEffect, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';


import { Button, Pressable, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../context';
import { IBook } from '../../types/types';

import Book from './Book';

const { Screen, Navigator } = createBottomTabNavigator();
export default function BooksList({ navigation, route }: any) {
    const { books } = useContext(GlobalContext)
    const [displayData, setDisplayData] = useState<IBook[]>(books)
    const [book, setBook] = useState<IBook>({ id: "", title: "", genre: "", category: "", authorIDs: [], publisherId: '' })
    const [searchText, setSearchText] = useState("")
    const [filterData, setFilterData] = useState("")
    const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending')

    const onSearch = (text: string) => {
        const arr = books.filter((bk) => bk.title.toLowerCase().includes(text.trim().toLowerCase()))
        setDisplayData(arr)
        setSearchText(text)
    }
    useEffect(() => {
        setDisplayData(books)
    }, [books])
    const onSortByTitle = () => {
        const sortData = [...books].sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase()
            if (sortOrder === 'ascending') {
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            } else {
                if (titleA < titleB) return 1;
                if (titleA > titleB) return -1;
                return 0
            }
        })
        console.log("sorted Data...", sortData)
        setDisplayData(sortData)
        setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending')

    }
    const onFilterByCategory = (category: string) => {
        const filteredData = [...books].filter((bk: IBook) => bk.category.toLowerCase().includes(category.trim().toLowerCase()))
        console.log("this is filter...", filteredData)
        setDisplayData(filteredData);
        setFilterData(category)
    }

    const onAddBook = () => {
        navigation.navigate('add-book')
    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={onAddBook}>
                    <Text style={styles.buttonText}>Create Book</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={onSortByTitle}>
                    <Text style={styles.buttonText}>{sortOrder === 'ascending' ? 'Sort Descending' : 'Sort Ascending'}</Text>
                </Pressable>
            </View>
            <View style={styles.stickyHeader}>
                <TextInput
                    style={styles.input}
                    value={searchText}
                    onChangeText={onSearch}
                    placeholder='Search' />

                <TextInput
                    style={styles.input}
                    value={filterData}
                    onChangeText={onFilterByCategory}
                    placeholder='type category' />

                {/* <Button title={sortOrder === 'ascending' ? 'Sort Descending' : 'Sort Ascending'} onPress={onSortByTitle} /> */}
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {displayData.map((bk: IBook) => <Book key={bk.id} data={bk} />)}
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


