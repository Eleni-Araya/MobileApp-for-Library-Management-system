import React, { useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Alert, SafeAreaView } from 'react-native'
import { IPublisher } from '../../types/types'
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../context';
import { deletePublisher } from '../../apis/api';

interface PublisherProps {
    data: IPublisher;
}
export default function Publisher({ data }: PublisherProps) {
    const { publishers, setPublishers } = useContext(GlobalContext)
    const { id, name, phone, email, address } = data
    const navigation = useNavigation();
    const onDetails = () => {
        navigation.navigate('publisher-detail', data);

    }
    const onUpdatePublisher = () => {
        navigation.navigate('update-publisher', data);
    }
    const onDelete = async () => {
        try {
            const res = await deletePublisher(id);
            if (res) {
                const arr = publishers.filter(publis => publis.id !== data.id)

                setPublishers(arr)

            }
        } catch (error) {
            throw new Error("unable to delete this auhtor")
        }

    }

    const onDeletePublisher = () => {
        try {
            Alert.alert('Information', 'Do you want to delete this publisher', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
                {
                    text: 'OK',
                    onPress: onDelete
                },
            ]);
        } catch (error) {

        }
    }
    return (
        <SafeAreaView>
            <View style={Publishertyles.listItem}>
                <Text style={Publishertyles.itemText}>ID: {id}</Text>
                <Text style={Publishertyles.itemText}>Name: {name}</Text>
                <View style={Publishertyles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onDetails}
                        style={Publishertyles.button}>
                        <Text style={Publishertyles.buttonText}>Detail</Text>
                    </TouchableOpacity>
                    <TouchableHighlight
                        onPress={onUpdatePublisher}
                        style={Publishertyles.button}
                        underlayColor="#5398DC">
                        <Text style={Publishertyles.buttonText}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={onDeletePublisher}
                        style={Publishertyles.deletebutton}
                        underlayColor="#5398DC">
                        <Text style={Publishertyles.buttonText}>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
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

});