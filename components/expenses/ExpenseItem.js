import { View, Text, StyleSheet, Pressable, Date } from "react-native";
import { GlobalStyles} from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../../util/date";

function ExpenseItem({expenseItem}) {
    const navigation = useNavigation();
    function manageExpenseHandler(){
        navigation.navigate("ManageExpense", {
            id: expenseItem.item.id,
            description: expenseItem.item.description,
            amount: expenseItem.item.amount,
            date: getFormattedDate(expenseItem.item.date),
            actionType: 'update',
        });
    }

    return (
        <Pressable 
            style={ ({pressed}) => [
                styles.mainContainer,
                pressed ? styles.pressed : null
            ]}
            onPress={manageExpenseHandler}
            //android_ripple={{color:GlobalStyles.colors.primary200}}
        >
            <View>
                <Text style={styles.itemTitleText}>
                    {expenseItem.item.description}
                </Text>
                <Text style={styles.dateText}>
                    {getFormattedDate(expenseItem.item.date)}
                </Text>
            </View>
            <View style={styles.priceContainer}>
                 <Text style={styles.priceText}>
                    {expenseItem.item.amount.toFixed(2)}
                </Text>
            </View>
        </Pressable>
    );
}
export default ExpenseItem;

const styles = StyleSheet.create({
    mainContainer:{
            backgroundColor: GlobalStyles.colors.primary500,
            justifyContent: 'space-between',
            alignSelf: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            padding: 15,
            width: '90%',
            margin: 8,
        },
        itemTitleText:{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 16
        },
        dateText: {
            color: 'white',
        },
        priceContainer:{
            backgroundColor: 'white',
            paddingHorizontal: 25,
            borderRadius: 4,
            minWidth: '25%',
            padding: 10,
        },
        priceText:{
            color: GlobalStyles.colors.primary500,
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 17,
        },
        pressed:{
            opacity: 0.75
        }
})