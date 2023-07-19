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

const mapsKey =
  "AIzaSyA3kg7YWugGl1lTXmAmaBGPNhDW9pEh5bo&signature=GJnbP6sQrFY1ce8IsvG2WR2P0Jw=";

export function GetLocationPreview(lat, lng) {
  const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x300&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}
&key=${mapsKey}`;

  return "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1";
}

async function uploadImageToFirebaseStorage(imageFile, accessToken) {
  const firebaseStorageUrl =
    "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o";
  const storageRef = "/Expency/reciepts"; // Set the desired storage path

  const response = await fetch(`${firebaseStorageUrl}${storageRef}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "image/jpeg", // Set the appropriate content type for your image
    },
    body: imageFile,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Firebase Storage");
  }

  const responseData = await response.json();
  const downloadUrl = responseData.downloadTokens;

  // The downloadUrl contains the path of the uploaded file on Firebase Storage
  return downloadUrl;
}
