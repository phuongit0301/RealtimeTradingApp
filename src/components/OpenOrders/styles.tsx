import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: screenWidth - 120,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a2e',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    tabText: {
        color: '#8b9dc3',
        fontSize: 14,
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#3b82f6',
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        width: 8,
        height: 8,
        backgroundColor: '#3b82f6',
        borderRadius: 16,
    },
    ordersContainer: {
        flex: 1,
        paddingVertical: 16,
    },
    orderCard: {
        backgroundColor: '#16213e',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderType: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    orderTypeText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    buyText: {
        color: '#4ade80',
    },
    sellText: {
        color: '#f87171',
    },
    orderTime: {
        color: '#8b9dc3',
        fontSize: 10,
        marginBottom: 4,
    },
    orderDetails: {
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    detailLabel: {
        color: '#8b9dc3',
        fontSize: 12,
        marginBottom: 4,
    },
    detailValue: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '500',
    },
    pairInfo: {
        alignItems: 'flex-end',
    },
    pairText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: '#8b9dc3',
        fontSize: 14,
    },
});

export default styles;