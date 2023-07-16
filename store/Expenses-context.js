import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpenses: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});
const DUMMY_DATA = [
  {
    id: "1",
    description: "shirt and pants",
    amount: 22.3,
    date: new Date("2023-07-10"),
  },
  {
    id: "2",
    description: "lowers",
    amount: 32,
    date: new Date("2021-12-13"),
  },
  {
    id: "3",
    description: "Tshirt",
    amount: 424,
    date: new Date("2023-07-13"),
  },
  {
    id: "4",
    description: "burger",
    amount: 54,
    date: new Date("2021-12-13"),
  },
];
function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
      case "UPDATE":
        const updatableIndex = state.findIndex(
          (expense) => expense.id === action.payload.id
        );
        const updatableExpense = state[updatableIndex];
        const updatedItem = { ...updatableExpense, ...action.payload.data };
        const updatedExpenses = [...state];
        updatedExpenses[updatableIndex] = updatedItem;
        return updatedExpenses; // Corrected return value
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
export default function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_DATA);
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
