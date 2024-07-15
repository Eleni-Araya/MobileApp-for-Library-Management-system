import React from 'react'
import { Text, View } from 'react-native'
import Author from './Author'

export default function AuthorDetail({ route }: any) {
    const { id, phone, email } = route.params
    return (
        <View>
            <Text>{id}-{email}</Text>
        </View>
    )
}
