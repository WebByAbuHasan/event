import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import EventByCategory from "./component/eventByCatagory.jsx";
import EventDetails from "./component/eventDetils.jsx";
import CreateEvent from "./pages/createEvent.jsx";



const App = () => {
    return (
        <BrowserRouter>
           <Routes>
               <Route path="/" element={<Homepage/>} />
               <Route path="/login" element={<Login/>} />
               <Route path="/Register" element={<Register/>} />
               <Route path="/UserDashboard" element={<UserDashboard/>} />
               <Route path="/getEventById/:id" element={<EventDetails/>} />
               <Route path="/event/category/:id" element={<EventByCategory/>} />
               <Route path={"/createEvent"} element={<CreateEvent/>}/>
           </Routes>
        </BrowserRouter>
    );
};

export default App;