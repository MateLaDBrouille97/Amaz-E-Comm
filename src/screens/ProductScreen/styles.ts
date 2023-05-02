import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 20,
        marginTop: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems: "center"
    },
    description: {
        marginVertical: 10,
        lineHeight: 20,
    },
});

export default styles;