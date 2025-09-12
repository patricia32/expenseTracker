import { Platform, Pressable, View, Text, StyleSheet, Alert, Keyboard } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

import Input from "./Input";

function ExpenseForm({expenseItem, onCancel, onSubmit, actionType}) {

    const [inputs, setInputs] = useState({
        amount: {
            value: expenseItem.amount !== undefined ? expenseItem.amount.toString() : '',
            isValid: true
        },
        date: {
            value: expenseItem.date !== undefined ? expenseItem.date : 'YYYY-MM-DD',
            isValid: true
        },
        description: {
            value: expenseItem.description !== undefined ? expenseItem.description : '',
            isValid: true
        }
    });

    function changedInputHandler(inputIdentifier, enteredValue){
        setInputs((curInputs) => {
            return{
                ...curInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        })
    }

    function submitHandler(){
        const expenceData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenceData.amount) && expenceData.amount > 0;
        const dateIsValid = expenceData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = (expenceData.description || '').trim().length > 0;
        
        if(amountIsValid && dateIsValid && descriptionIsValid)
            onSubmit(expenceData)
        else{            
            setInputs((curInputs) =>{
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid}
                }
            })
            return;
        }
    }
    const inputsValid = inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid

    function dismissKeyboard(){
        Keyboard.dismiss();
    }
    return(
        <Pressable onPress={dismissKeyboard} style={styles.mainContainer}>
            <View>
                <View style={styles.inputsContainer}>
                    <Input 
                        label="Amount" 
                        textInputConfig={{
                            backgroundColor: inputs.amount.isValid ?  GlobalStyles.colors.primary100 : GlobalStyles.colors.error50,
                            keyboardType: Platform.OS === 'ios' ? 'decimal-pad' : 'numeric',
                            onChangeText: changedInputHandler.bind(this, 'amount'),
                            value: inputs.amount.value,
                        }}
                    />
                    <Input 
                        label="Date" 
                        textInputConfig={{
                            backgroundColor: inputs.date.isValid ?  GlobalStyles.colors.primary100 : GlobalStyles.colors.error50,
                            onChangeText: changedInputHandler.bind(this, 'date'),
                            maxLength: 10,
                            value: inputs.date.value
                        }}
                        
                    />
                    <Input 
                        label="Description" 
                        textInputConfig={{
                            backgroundColor: inputs.description.isValid ?  GlobalStyles.colors.primary100 : GlobalStyles.colors.error50,
                            value: inputs.description.value,
                            onChangeText: changedInputHandler.bind(this, 'description'),
                            multiline: true,
                        }}
                    />
                    {!inputsValid && ( <Text style={styles.errorMessage}>Please check entered data</Text> )}
                </View>
            
                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.cancel} onPress={onCancel}>
                        <Text style={styles.text}>
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable style={styles.update} onPress={submitHandler}>
                        {actionType === 'update' ?
                            <Text style={styles.text}> Update </Text>
                            :
                            <Text style={styles.text}> Add </Text>
                        }
                    </Pressable>
                </View >
            </View>
        </Pressable>
    )
}
export default ExpenseForm;


const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
    },
    inputsContainer:{
        flex: 6,
    },
    buttonsContainer:{
        flex: 0.6,
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '70%',
        alignSelf: 'center',
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
    },
    errorMessage: {
        color: GlobalStyles.colors.error500,
        fontSize: 15,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})