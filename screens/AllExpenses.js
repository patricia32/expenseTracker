import ExpensesOutput from "../components/expenses/ExpensesOutput";

import { ExpensesContext } from "../store/expence-context";
import { useContext } from "react";

function AllExpenses() {

   const expensesCtx =  useContext(ExpensesContext);
   
   return(
        <ExpensesOutput 
            expenses={expensesCtx.expenses} 
            expensesPeriod='Total'
            fallBackText={'No expenses so far'}/>
    );
}

export default AllExpenses;
