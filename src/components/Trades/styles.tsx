import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    tradeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    priceGreen: {
        color: '#4ade80',
        fontSize: 12,
        fontWeight: '500',
    },
    priceRed: {
        color: '#f87171',
        fontSize: 12,
        fontWeight: '500',
    },
    amount: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
    time: {
        color: '#8b9dc3',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'right',
    },
});

export default styles;