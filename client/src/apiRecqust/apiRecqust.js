import axios from "axios";
const BaseUrl="https://event-nu-liard.vercel.app/api";

export async function getCategories(){
  let res =  await axios.get(`${BaseUrl}/getCategories`);
  if(res.status === 200){
    return res.data
  }else {
    return []
  }

}


export async function getEventByCategoryId(id){
    let res =  await axios.get(`${BaseUrl}/event/category/`+id);
    if(res.status === 200){
        return res.data
    }else {
        return []
    }

}




export async function getAllEvents(){
    let res =  await axios.get(`${BaseUrl}/getAllEvents`);
    if(res.status === 200){
        return res.data
    }else {
        return []
    }

}






export async function getEventById(id){
    const res = await axios.get(`${BaseUrl}/getEventById/${id}`);
    if(res.status === 200){
        return res.data
    }else {
        return []
    }

}


export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BaseUrl}/login`, { email, password });
        return response.data; // Return the data from the successful response
    } catch (error) {
        // Handle errors here (you might want to throw the error or return a specific error object)
        console.error('Login API Error:', error);
        throw error; // Re-throwing the error allows the component to handle it
    }
}

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${BaseUrl}/register`, { name, email, password });
        return response.data; // Or you might want to return the entire response
    } catch (error) {
        console.error('Register API Error:', error);
        throw error;
    }
}


export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${BaseUrl}/createEvent`, eventData);
        return response.data; // Or the entire response if needed
    } catch (error) {
        console.error('Create Event API Error:', error);
        throw error;
    }
}

export const updateEvent = async (id, eventData) => {
    try {
        const response = await axios.put(`${BaseUrl}/updateEvent/${id}`, eventData);
        return response.data; // Or the entire response if needed
    } catch (error) {
        console.error(`Update Event (${id}) API Error:`, error);
        throw error;
    }
};
