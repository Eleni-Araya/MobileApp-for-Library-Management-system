import React, { useContext } from 'react'
import { Button, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import GlobalContext from '../context'
import { IBook } from '../../types/types'
import Book from '../Books/Book'
import styles from '../styleSheet'
import BookTransaction from './BookTransaction'

export default function Transaction({ navigation, route }: any) {
    const { books, setBooks } = useContext(GlobalContext)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {books.map((bk: IBook) => <BookTransaction data={bk} />)}
            </ScrollView>
        </SafeAreaView>
    )
}
