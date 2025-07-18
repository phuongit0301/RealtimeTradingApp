import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    chartWithGrid: {
        position: 'relative',
    },
    container: {
        backgroundColor: '#16213e',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginVertical: 8,
        paddingVertical: 16,
        width: screenWidth - 120,
        overflow: 'hidden',
    },
    priceInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    priceMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    currentPrice: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
    },
    priceChange: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    pricePositive: {
        backgroundColor: 'rgba(74, 222, 128, 0.2)',
    },
    priceNegative: {
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
    },
    priceChangeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4ade80',
    },
    priceDetails: {
        alignItems: 'flex-end',
    },
    priceDetailText: {
        color: '#8b9dc3',
        fontSize: 12,
        fontWeight: '500',
    },
    chartContainer: {
        height: 380,
        width: '100%',
        marginBottom: 8,
        position: 'relative',
    },
    gridContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    gridLine: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: '90%'
    },
    priceLabelsContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        paddingRight: 4,
        zIndex: 2,
    },
    priceLabel: {
        color: '#ccc',
        fontSize: 10,
        textAlign: 'right',
    },
    volumeContainer: {
        height: 80,
        width: '100%',
        marginBottom: 16,
    },
    priceText: {
        color: '#8b9dc3',
        fontSize: 12,
        fontWeight: '600',
    },
    dateText: {
        color: '#8b9dc3',
        fontSize: 10,
        marginTop: 4,
    },
    timeRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    timeRangeButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'transparent',
    },
    timeRangeButtonActive: {
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderColor: '#3b82f6',
    },
    timeRangeText: {
        color: '#8b9dc3',
        fontSize: 12,
        fontWeight: '500',
    },
    timeRangeTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    chartControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    controlButton: {
        backgroundColor: '#1a1a2e',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    controlButtonActive: {
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
    },
    controlButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    controlButtonTextActive: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 32, // tránh chồng lên label giá
        justifyContent: 'space-between',
        zIndex: 1,
    },
    gridRow: {
        height: 1,
        width: '100%',
    },
    verticalGridOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 64, // tránh đè lên price label bên phải
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default styles;