import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#fff",
        // paddingTop: 20
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        // backgroundColor: '#0066cc',
        width: "50%",
        margin: 5
    },
    input: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        width: "50%",
        margin: 5,
        fontSize: 24
    },
    text: {
        fontSize: 30,
        marginLeft: 40,
        padding: 50

    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonLogin: {
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#0066cc',
        width: "27%"
    },
    deletebutton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#FF0000',
        borderRadius: 15,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 50,
    },
})

export default styles;