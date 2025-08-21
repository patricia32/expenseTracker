import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList ({ expenses }) {
    return(
        <FlatList
            data={expenses}
            renderItem={(expenseItem) => {
                return <ExpenseItem expenseItem={expenseItem}/>
            }}
            keyExtractor={(item) => {
                return item.id;
            }}
        />
    )
}
export default ExpensesList;