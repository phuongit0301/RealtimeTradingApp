import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#16213e',
        borderRadius: 12,
        paddingVertical: 16,
        marginHorizontal: 8,
        marginVertical: 8,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metric: {
        flex: 1,
        alignItems: 'center',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    label2: {
        color: '#CCCCCC',
        fontSize: 12,
        fontWeight: '500',
    },
    value: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    valueGreen: {
        color: '#4ade80',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    valueRed: {
        color: '#f87171',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
    },
    borderLine: {
        height: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginVertical: 12,
    }
});

export default styles;