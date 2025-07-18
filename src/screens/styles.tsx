import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f172a',
    },
    scrollView: {
      flex: 1,
    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flex: 1,
      paddingVertical: 8,
    },
    middleSection: {
      flexDirection: 'row',
    },
    chartContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    chartInfoContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 16,
    },
    columns: {
      display: 'flex',
      flexDirection: 'column',
    }
});

export default styles;