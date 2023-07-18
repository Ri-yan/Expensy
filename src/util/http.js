import axios from "axios";
import { ExpensesContext } from "../../store/Expenses-context";

const baseURL = "https://expensy-83820-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  const response = await axios.post(baseURL + "espenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses(token) {
  const response = await axios.get(baseURL + "espenses.json");
  const expenses = [];
  // debugger
  for (const key in response.data) {
    const expenseobj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      userId: response.data[key].userId,
    };
    if (token === expenseobj.userId) {
      expenses.push(expenseobj);
    }
  }
  return expenses;
}

export async function updateExpense(id, expenseData) {
  return axios.put(baseURL + `espenses/${id}.json`, expenseData);
}

export function deleteExpenseFromFB(id) {
  return axios.delete(baseURL + `espenses/${id}.json`);
}

const API_KEY = "AIzaSyCvwiEWacO1z1ibGkuMyW5Jq5K_VSBzmAw";
export async function SignUp(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      retutrnSecureToken: true,
    }
  );
  const token = response.data.localId;
  return token;
}

export async function Login(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      API_KEY,
    {
      email: email,
      password: password,
      retutrnSecureToken: true,
    }
  );
  console.log(response.data);
  const token = response.data.localId;
  return token;
}
