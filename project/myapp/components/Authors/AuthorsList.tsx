import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context'
import { Pressable, SafeAreaView, ScrollView, Text } from 'react-native'
import { IAuthor } from '../../types/types'
import Author from './Author'
import styles from '../styleSheet'

export default function AuthorsList({ navigation, route }: any) {
    const { authors } = useContext(GlobalContext)
    const [displayData, setDisplayData] = useState<IAuthor[]>(authors)
    const [author, setAuthor] = useState<IAuthor>({ id: '', name: '', phone: '', email: '' })

    useEffect(() => {
        setDisplayData(authors)
    }, [])

    const onAuthorAdd = () => {
        navigation.navigate('add-author')
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Pressable style={styles.button} onPress={onAuthorAdd}>
                    <Text style={styles.buttonText}>Create Author </Text>
                </Pressable>

                {authors.map((author: IAuthor) => <Author key={author.id} data={author} />)}
            </ScrollView>
        </SafeAreaView>

    )
}
