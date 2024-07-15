import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function BookDetail({ route }: any) {
    const { id, genre, authorIDs, publisherId } = route.params;
    return (
        <View style={BookStyle.listItem}>
            <Text style={BookStyle.itemText}>Id: {id}</Text>
            <Text style={BookStyle.itemText}>Genre: {genre}</Text>
            <Text style={BookStyle.itemText}>Authors: {authorIDs}</Text>
            <Text style={BookStyle.itemText}>Publisher: {publisherId}</Text>
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
    }
});