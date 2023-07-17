import axios from "axios";
const baseURL = "https://expensy-83820-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  const response =await axios.post(baseURL + "espenses.json", expenseData);
  const id  = response.data.name;
  return id;
}
export async function fetchExpenses(expenseData) {
    const response = await axios.get(baseURL + "espenses.json");
    const expenses = [];
    for(const key in response.data){
        const expenseobj = {
            id:key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description
        };
        expenses.push(expenseobj);
    }
    return expenses;
  }
  export async function updateExpense(id,expenseData) {
    return axios.put(baseURL + `espenses/${id}.json`, expenseData);
  }
  export function deleteExpense(id) {
    return axios.delete(baseURL + `espenses/${id}.json`);
    
    
  }