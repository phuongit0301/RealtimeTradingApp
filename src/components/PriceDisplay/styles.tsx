import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: '100%',
        justifyContent: 'space-between',
    },
    priceSection: {
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    price: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 4,
    },
    change: {
        fontSize: 14,
        fontWeight: '500',
    },
    changeGreen: {
        color: '#4ade80',
    },
    changeRed: {
        color: '#f87171',
    },
    currencySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#16213e',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    currencyText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
});

export default styles;