import { Platform, TextInput, View } from "react-native";
import Input from "./Input";

function ExpenseForm({expenseItem}) {

    console.log(expenseItem)
    function changedAmountHandler(){

    }

    function changedDateHandler(){

    }

    function changedDescriptionHandler(){

    }

    return(
        <View >
            <Input 
                label="Amount" 
                textInputConfig={{
                    onChangeText: changedAmountHandler,
                    keyboardType: Platform.OS === 'ios' ? 'decimal-pad' : 'numeric',
                    placeholder: expenseItem.amount !== undefined ? expenseItem.amount.toString() : ''
                }}
            />
            <Input 
                label="Date" 
                textInputConfig={{
                    onChangeText: changedAmountHandler,
                    placeholder: expenseItem.date !== undefined ? expenseItem.date : 'YYYT-MM-DD',
                    maxLength: 10,
                }}
            />
            <Input 
                label="Description" 
                textInputConfig={{
                    onChangeText: changedAmountHandler,
                    placeholder: expenseItem.description !== undefined ? expenseItem.description : '',
                    multiline: true,
                }}
            />
        </View>
    )
}
export default ExpenseForm;