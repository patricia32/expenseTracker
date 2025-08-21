import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import LastDaysInfo from "../LastDaysInfo";
import ExpensesList from "./ExpensesList";
  

function ExpensesOutput({expenses, expensesPeriod, fallBackText}) {

    let content  = <Text style={styles.text}> {fallBackText} </Text>;

    if(expenses.length > 0)
        content = <ExpensesList expenses={expenses}/>;

    return(
        <View style={styles.mainContainer}>
            <LastDaysInfo expenses={expenses} expensesPeriod={expensesPeriod}/>
            {content}
        </View>
    );
}
export default ExpensesOutput;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: GlobalStyles.colors.primary800,
        flex: 1,
        // paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
    },
    text: {
        color: GlobalStyles.colors.primary100,
        textAlign: 'center',
        marginTop: 32,
        fontSize: 17,
    }
})