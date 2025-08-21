import { View, Text, StyleSheet, Pressable } from "react-native";

import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expence-context";
import { useContext } from "react";

function AddExpense({navigation}) {

    const expensesCtx = useContext(ExpensesContext);
    function cancelHandler() {
        navigation.goBack();
    }

    function addHandler() {
        expensesCtx.addExpense( {
            expenseData:{
                 description: 'Test add',
                amount: 52.13,
                date: new Date('2025-08-19')
            }           
        });
        navigation.goBack()
    }
    return(
        <View style={styles.mainContainer}>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.cancel} onPress={cancelHandler}>
                    <Text style={styles.text}>
                        Cancel
                    </Text>
                </Pressable>
                <Pressable style={styles.update} onPress={addHandler}>
                    <Text style={styles.text}>
                        Add
                    </Text>
                </Pressable>
            </View >
           
       </View>
        
    )
}
export default AddExpense;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttonsContainer:{
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 20,
        width: '70%',
        padding: 10,
        
    },
    cancel:{
        borderRadius: 4
    },
    update:{
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 4
    },
    text:{
        fontSize: 18,
        color: 'white',
        paddingHorizontal: 30,
        padding: 10
    }
})