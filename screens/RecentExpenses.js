import ExpensesOutput from "../components/expenses/ExpensesOutput";

import { ExpensesContext } from "../store/expence-context";
import { useContext } from "react";

import { getDateMinusDays } from "../util/date";

function RecentExpenses() {

    const expensesCtx =  useContext(ExpensesContext);
    
    const recentExpenses = expensesCtx.expenses.filter(
        (expense) => {
            const today = new Date();
            const date7daysAgo = getDateMinusDays(today, 7);

            return expense.date > date7daysAgo;
        })

    return(
        <ExpensesOutput 
            expenses = {recentExpenses} 
            expensesPeriod="Last 7 Days"
            fallBackText={"No recent expenses"}/>
    );

}

export default RecentExpenses;

