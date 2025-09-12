import { View, StyleSheet, Pressable, Keyboard } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expence-context";
import { useContext } from "react";
import { storeExpense } from "../util/http";

function ManageExpense({navigation, route}) {

    const expensesCtx = useContext(ExpensesContext);

    const expenseItem = {
        id: route.params.id,
        description: route.params.description,
        amount: route.params.amount,
        date: route.params.date
    }

    const actionType = route.params.actionType;

    function cancelHandler() {
        navigation.goBack();
    }
    async function submitHandler(expenceData) {
        
        if(actionType === 'update'){
            expensesCtx.updateExpense(expenseItem.id, expenceData);
        }
        else{

            // Store data using Firebase and axios

            const id = await storeExpense(expenceData)
            //expensesCtx.addExpense({...expenceData, id: id})


            // Store data using Context and Redux

            expensesCtx.addExpense( {
                expenseData:{
                    description: expenceData.description,
                    amount: expenceData.amount,
                    date: new Date(expenceData.date),
                    id: id
                }           
            });
        }

        navigation.goBack()
    }

    function deleteHandler() {
        expensesCtx.deleteExpense(expenseItem.id);
        navigation.goBack();
    }

    function dismissKeyboard(){
        Keyboard.dismiss();
    }
    return(
    <Pressable onPress={dismissKeyboard} style={styles.mainContainer}>
        <View >
            <View style={styles.inputsContainer}>
                <ExpenseForm 
                    expenseItem={expenseItem} 
                    actionType={actionType} 
                    onCancel={cancelHandler} 
                    onSubmit={submitHandler}
                />
            </View>
            
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
       </Pressable>
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