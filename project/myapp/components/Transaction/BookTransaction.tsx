import React, { useContext, useEffect, useState } from 'react'
import { Alert, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, View } from 'react-native'
import { IBook, ICatalog } from '../../types/types';
import GlobalContext from '../context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styleSheet';
import { deleteBook, getCatalog, updateCatalog } from '../../apis/api';


interface BooksProps {
    data: IBook;
}
export default function BookTransaction({ data }: BooksProps) {
    const { books, setBooks } = useContext(GlobalContext)
    const [catalog, setCatalog] = useState<ICatalog[]>([])
    const { id, title, genre, category, authorIDs: [], publisherId } = data
    const navigation = useNavigation();

    useEffect(() => {
        async function loadCatalogData() {
            try {
                const data = await getCatalog()
                setCatalog(data)
            } catch (error) {
                throw new Error("unable to get catalogs")
            }
        }
        loadCatalogData()
    }, [])

    const findBook = books.find((bk) => bk.id === id)
    const value1 = books.map((bk) => bk.id)
    const value2 = catalog.map((bk) => bk.bookId)
    const commonBooks = value1.filter((value) => value2.includes(value))

    console.log("The common ....", commonBooks)
    const catalogBook = catalog.find((bk) => bk.bookId === id)
    const bookInCatalog = catalog.filter((bk) => bk.bookId == id)
    console.log("books in cat...", bookInCatalog)
    const onBorrow = () => {
        navigation.navigate('borrow-book', data)
    }
    const onReturn = () => {
        navigation.navigate('return-book', data)
    }
    return (
        <ScrollView>
            <View style={BookStyle.listItem}>
                <Text style={BookStyle.itemText}>Title: {findBook?.title}</Text>
                <Text style={BookStyle.itemText}>BookId: {catalogBook?.bookId}</Text>
                <Text style={BookStyle.itemText}>Available Copies: {catalogBook?.availableCopies}</Text>
                <View style={BookStyle.buttonContainer}>
                    <Pressable style={styles.button} onPress={onBorrow}>
                        <Text style={styles.buttonText}>Borrow</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={onReturn}>
                        <Text style={styles.buttonText}>Return</Text>
                    </Pressable>

                </View>
            </View>
        </ScrollView>
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