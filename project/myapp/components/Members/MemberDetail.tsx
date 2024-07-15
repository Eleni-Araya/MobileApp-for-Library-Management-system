import React from 'react'
import { Text, View } from 'react-native'

export default function MemberDetail({ route }: any) {
    const { id, address, phone, residentID } = route.params
    return (
        <View>
            <Text>ID : {id}</Text>
            <Text>ResidentID : {residentID}</Text>
            <Text>Phone : {phone}</Text>
            <Text>Address : {address}</Text>
        </View>
    )
}
