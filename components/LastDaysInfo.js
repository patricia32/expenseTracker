import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function LastDaysInfo ({expenses, expensesPeriod}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0);

    return(
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.leftText}>{expensesPeriod}</Text>
            </View>
            <View >
                <Text style={styles.moneyText}>${expensesSum.toFixed(2)}</Text>
            </View>
        </View>
    )
}
export default LastDaysInfo;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: GlobalStyles.colors.primary50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        margin: 20,
    },
    leftText:{
        color: GlobalStyles.colors.primary200,
        fontSize: 15
    },
    moneyText:{
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
        fontSize: 17
    }
});