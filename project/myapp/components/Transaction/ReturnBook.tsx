import React, { useContext, useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet, Alert } from 'react-native'
import GlobalContext from '../context';
import styles from '../styleSheet';
import { IBook, ICatalog, IMember, ITransaction } from '../../types/types';
import Member from '../Members/Member';
import { Picker } from '@react-native-picker/picker';
import { createTransaction, getCatalog, returnTransaction, updateCatalog } from '../../apis/api';

interface BookProps {
    data: IBook
}

export default function ReturnBook({ route, navigation }: any) {
    const { books, setBooks, members, setMembers, transactions, setTransactions } = useContext(GlobalContext)
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedMemeber, setSelectedMemeber] = useState('');
    const [transaction, setTransaction] = useState<ITransaction>({ id: "", bookId: "", memberId: "", borrowedDate: "", returnedDate: "" })
    const [catalog, setCatalog] = useState<ICatalog[]>([])
    const { id } = route.params


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

    const returnBook = async () => {

        try {
            const getTheCatalog = catalog.find((cat) => cat.bookId === id)
            console.log("id....", id)
            if (getTheCatalog && getTheCatalog.availableCopies >= 0) {

                // getTheCatalog.availableCopies += 1

                const res = await updateCatalog(getTheCatalog.id, { ...getTheCatalog, availableCopies: getTheCatalog.availableCopies + 1 })
                navigation.goBack()
            } else {
                Alert.alert("book does not exist")
            }
        } catch (error) {

        }

    }


    const onTransaction = async () => {
        try {
            const date = new Date()
            const newRecord: any = {
                years: "" + date.getFullYear(),
                month: "" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)),
                day: "" + date.getDate()
            }
            const getTheTransaction = transactions.findIndex((trans) => trans.bookId === selectedBook)
            if (getTheTransaction !== -1) {
                transactions[getTheTransaction].returnedDate = newRecord;
                const update = transactions[getTheTransaction];
                const newTransaction = [...transactions];
                newTransaction[getTheTransaction].returnedDate = newRecord;
                setTransactions(newTransaction)
                console.log("...", update.id)
                const res = await returnTransaction(update.id, { ...update, returnedDate: newRecord })
            }

        } catch (error) {
            Alert.alert('Error', 'Failed to return');
        }
    }

    return (
        <SafeAreaView style={Pickerstyles.container}>

            <Picker
                selectedValue={selectedBook}
                onValueChange={(itemValue) => {
                    setSelectedBook(itemValue);
                    setTransaction({ ...transaction, bookId: itemValue })
                }}
                style={Pickerstyles.picker}>

                <Picker.Item label="Select Book" value="" />
                {books.map((bk) => (
                    <Picker.Item key={bk.id} label={bk.id} value={bk.id} />
                ))}
            </Picker>
            <Picker
                selectedValue={selectedMemeber}

                onValueChange={(itemValue) => {
                    setSelectedMemeber(itemValue);
                    setTransaction({ ...transaction, memberId: itemValue })
                }}
                style={Pickerstyles.picker}
            >
                <Picker.Item label="Select Memeber" value="" />
                {members.map((member) => (
                    <Picker.Item key={member.id} label={member.id} value={member.id} />
                ))}
            </Picker>
            <View style={Pickerstyles.buttonContainer}>

                <Pressable style={Pickerstyles.button} onPress={onTransaction}>
                    <Text style={Pickerstyles.buttonText}>Create Transaction</Text>
                </Pressable>
                <Pressable style={Pickerstyles.button} onPress={returnBook}>
                    <Text style={Pickerstyles.buttonText}>Return Book</Text>
                </Pressable>

            </View>

        </SafeAreaView>

    )
}

const Pickerstyles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 12,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
});
