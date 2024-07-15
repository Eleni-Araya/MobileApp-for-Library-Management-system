import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet, Alert } from 'react-native'
import GlobalContext from '../context';
import styles from '../styleSheet';
import { IBook, ICatalog, IMember, ITransaction } from '../../types/types';
import Member from '../Members/Member';
import { Picker } from '@react-native-picker/picker';
import { createTransaction, getCatalog, updateCatalog } from '../../apis/api';
import uuid from 'react-native-uuid';

// interface BookProps {
//     data: IBook
// }

export default function BorrowBook({ route, navigation }: any) {
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
    }, [catalog])



    // const borrowDate = () => {
    //     const date = new Date()
    //     const newRecord: any = {
    //         years: "" + date.getFullYear(),
    //         month: "" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)),
    //         day: "" + date.getDate()
    //     }

    //     const uniqueId = uuid.v4() as string;

    //     const arr = { ...transaction, borrowedDate: newRecord, id: uniqueId }
    //     setTransaction(arr)
    // }
    const onTransaction = async () => {
        try {
            const date = new Date()
            const newRecord: any = {
                years: "" + date.getFullYear(),
                month: "" + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)),
                day: "" + date.getDate()
            }

            const uniqueId = uuid.v4() as string;

            const arr = { ...transaction, borrowedDate: newRecord, id: uniqueId }
            // setTransaction(arr)
            const res = await createTransaction(arr)
            if (res !== null) {
                const newData = [...transactions, res]
                setTransactions(newData)
                // navigation.goBack()

            }
        } catch (error) {
            Alert.alert('Error', 'Failed to borrow');
        }
        try {
            const getTheCatalog = catalog.find((cat) => cat.bookId === id)

            if (getTheCatalog && getTheCatalog.availableCopies > 0) {
                const res = await updateCatalog(getTheCatalog.id, { ...getTheCatalog, availableCopies: getTheCatalog.availableCopies - 1 })
                console.log("this is now...", res)
                setCatalog([...catalog, res])
                navigation.goBack()
            } else {
                Alert.alert("book does not exist")
            }
        } catch (error) {

        }
        console.log("Gelila", React.memo(BorrowBook))
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
                <Text style={{ fontSize: 20 }}>The selected book is : {selectedBook}</Text>
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
                {/* <Pressable style={Pickerstyles.button} onPress={borrowDate}>
                    <Text style={Pickerstyles.buttonText}>Borrow-Date</Text>
                </Pressable> */}
                <Pressable style={Pickerstyles.button} onPress={onTransaction}>
                    <Text style={Pickerstyles.buttonText}>Create Transaction</Text>
                </Pressable>
                {/* <Pressable style={Pickerstyles.button} onPress={borrowBook}>
                    <Text style={Pickerstyles.buttonText}>Borrow Book</Text>
                </Pressable> */}

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
