import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { GlobalStyles } from './constants/styles';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import AddExpense from './screens/AddExpense';

import ExpensesContextProvider from './store/expence-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function ExpensesOverview() {
  
  const navigation = useNavigation();
  function addExpenseHandler(){
    navigation.navigate('ManageExpense', {
      actionType: 'add'
    })
  }

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,        
      }}>
      <BottomTabs.Screen 
        name = "RecentExpenses" 
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarLabelStyle: {fontSize: 18},
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="hourglass-1" size={22} color="white" />        
          },
          headerRight: () => (
            <Pressable 
              android_ripple={{color: GlobalStyles.colors.primary100}}
              style={{marginRight: '15'}}
              onPress={addExpenseHandler}
            >
              <AntDesign name="plus" size={24} color="white" />
            </Pressable>
          ),
        }}
        
      />
      <BottomTabs.Screen 
        name = "AllExpenses" 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarLabelStyle: {fontSize: 18},
          tabBarIcon: ({color, size}) => {
            return <Feather name="calendar" size={24} color="white" />
          },
          headerRight: () => (
            <Pressable 
              android_ripple={{color: GlobalStyles.colors.primary100}}
              style={{marginRight: '15'}}
              onPress={addExpenseHandler}
            >
              <AntDesign name="plus" size={24} color="white" />
            </Pressable>
          ),
        }}
      />
    </BottomTabs.Navigator> 
  );
}

export default function App() {
  
  return (
    <>
      <StatusBar style='light'/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{contentStyle: { backgroundColor: GlobalStyles.colors.primary500}}}
          >
            <Stack.Screen 
              name = "ExpensesOverview" 
              component = {ExpensesOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name = "ManageExpense" 
              component={ManageExpense}
              options={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white',
                title: 'Manage Expense'
              }}
            />
            <Stack.Screen
              name = "AddExpense"
              component={AddExpense}
              options={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: 'white',
                title: 'Add Expense'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
