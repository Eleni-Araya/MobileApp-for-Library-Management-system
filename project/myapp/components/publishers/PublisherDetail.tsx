import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function PublisherDetail({ route }: any) {
    const { phone, email, address } = route.params
    return (
        <View style={Publishertyles.listItem}>
            <Text style={Publishertyles.itemText}>Phone: {phone}</Text>
            <Text style={Publishertyles.itemText}>Email: {email}</Text>
            <Text style={Publishertyles.itemText}>Address: {address}</Text>
        </View>
    )
}

const Publishertyles = StyleSheet.create({
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