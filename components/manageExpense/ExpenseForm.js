import { Platform, Pressable, View, Text, StyleSheet, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

import Input from "./Input";

function ExpenseForm({expenseItem, onCancel, onSubmit, actionType}) {

    const [inputValues, setInputValues] = useState({
        amount: expenseItem.amount,
        date: expenseItem.date,
        description: expenseItem.description
    });

    function changedInputHandler(inputIdentifier, enteredValue){
        setInputValues((curInputValues) => {
            return{
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }

    function submitHandler(){
        const expenceData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        const amountIsValid = !isNaN(expenceData.amount) && expenceData.amount > 0;
        const dateIsValid = expenceData.date.toString() !== 'Invalid Date';
        const isDescriptionValid = (expenceData.description || '').trim().length > 0;
        
        if(amountIsValid && dateIsValid && dateIsValid)
            onSubmit(expenceData)
        else{
            Alert.alert('Invalid input', 'Please check your input values')
            return;
        }
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputsContainer}>
                <Input 
                    label="Amount" 
                    textInputConfig={{
                        value: inputValues.amount !== undefined ? inputValues.amount.toString() : '',
                        keyboardType: Platform.OS === 'ios' ? 'decimal-pad' : 'numeric',
                        onChangeText: changedInputHandler.bind(this, 'amount'),
                        
                    }}
                />
                <Input 
                    label="Date" 
                    textInputConfig={{
                        onChangeText: changedInputHandler.bind(this, 'date'),
                        value: inputValues.date !== undefined ? inputValues.date : 'YYYY-MM-DD',
                        maxLength: 10,
                    }}
                    
                />
                <Input 
                    label="Description" 
                    textInputConfig={{
                        value: inputValues.description !== undefined ? inputValues.description : '',
                        onChangeText: changedInputHandler.bind(this, 'description'),
                        multiline: true,
                    }}
                />
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
    }
})