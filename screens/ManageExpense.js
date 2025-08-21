import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expence-context";
import { useContext } from "react";
import ExpenseForm from "../components/manageExpense/ExpenseForm";

function ManageExpense({navigation, route}) {

    const expensesCtx = useContext(ExpensesContext);
    const expenseItem = {
        id: route.params.id,
        description: route.params.description,
        amount: route.params.amount,
        date: route.params.date
    }

    const actionType = route.params.actionType;

//    console.log(expenseItem.id)
//    console.log(expenseItem.description)
//    console.log(getFormattedDate(e))
//    console.log(expenseItem.amount)

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

    function updateHandler() {
        expensesCtx.updateExpense(expenseItem.id,
            {
                description: 'Test',
                amount: 23.42,
                date: new Date('2025-08-17')
            });
        navigation.goBack();
    }

    function deleteHandler() {
        expensesCtx.deleteExpense(expenseItem.id);
        navigation.goBack();
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputsContainer}>
                <ExpenseForm expenseItem={expenseItem}/>
            </View>
                

            <View style={styles.buttonsContainer}>
                <Pressable style={styles.cancel} onPress={cancelHandler}>
                    <Text style={styles.text}>
                        Cancel
                    </Text>
                </Pressable>
               
                {actionType === 'update' ? 
                    <Pressable style={styles.update} onPress={updateHandler}>
                        <Text style={styles.text}> Update </Text>
                    </Pressable>
                    :
                    <Pressable style={styles.update} onPress={addHandler}>
                        <Text style={styles.text}> Add </Text>
                    </Pressable>
                }
            </View >
            
            <View style={styles.deleteContainer}>
                {actionType === 'update' ? 
                    <Pressable>
                        <MaterialIcons 
                            style={{alignSelf:'center'}}
                            onPress={deleteHandler}
                            color="#e88484ff" 
                            name="delete" 
                            size={35} 
                        />     
                    </Pressable>
                    :
                    <></>
                }
            </View>
            
       </View>
        
    )
}
export default ManageExpense;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    inputsContainer: { 
        flex: 6,
    },
    deleteContainer:{
        flex: 1,
    },
    buttonsContainer:{
        flex: 0.7,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '70%',
        marginTop: 20,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: GlobalStyles.colors.primary100,
    },
    cancel:{
        borderRadius: 6,
        height: 50

    },
    update:{
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 6,
        height: 50
    },
    text:{
        fontSize: 18,
        color: 'white',
        paddingHorizontal: 30,
        padding: 10
    }
})