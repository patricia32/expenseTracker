import ExpensesOutput from "../components/expenses/ExpensesOutput";

import { ExpensesContext } from "../store/expence-context";
import { useContext, useEffect, useState } from "react";

import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
    
        // FIREBASE AND AXIOS

    const expensesCtx =  useContext(ExpensesContext);

   // const [fetchedExpenses, setFetchedExpenses] =  useState([]);
    useEffect(() => {

        async function getExpenses(){
            const expences = await fetchExpenses();
            //setFetchedExpenses(expences);
            expensesCtx.setExpenses(expences)
        }

        getExpenses();
    }, []);

    const recentExpenses = expensesCtx.expenses.filter(
        (expense) => {
            const today = new Date();
            const date7daysAgo = getDateMinusDays(today, 7);

            return expense.date > date7daysAgo;
        })


        // CONTEXT AND REDUX


    // const recentExpenses = expensesCtx.expenses.filter(
    //     (expense) => {
    //         const today = new Date();
    //         const date7daysAgo = getDateMinusDays(today, 7);

    //         return expense.date > date7daysAgo;
    //     })


    return(
        <ExpensesOutput 
            expenses = {recentExpenses} 
            expensesPeriod="Last 7 Days"
            fallBackText={"No recent expenses"}/>
    );

}

export default RecentExpenses;

