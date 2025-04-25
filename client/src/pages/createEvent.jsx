import React, { useState } from 'react';
import Layout from "../layout/Layout.jsx";
import { createEvent } from '../apiRecqust/apiRecqust.js';
import {Link} from "react-router-dom"; // Import the API function

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(''); // Corrected variable name
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const data = await createEvent({
                title,
                date,
                time,
                location,
                category,
                description,
                categoryId, // Corrected variable name
            });
            setLoading(false);
            setSuccessMessage('Event created successfully!');
            // Optionally, you could clear the form fields here
            setTitle('');
            setDate('');
            setTime('');
            setLocation('');
            setCategory('');
            setDescription('');
            setCategoryId('');

            // Optionally redirect
            // setTimeout(() => {
            //     window.location.href = '/events'; // Redirect to events page
            // }, 2000);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to create event. Please try again.');
                console.error('Create Event error:', error);
            }
        }
    };

    return (
        <Layout>
            <div className="create-event-container min-h-90 flex flex-col justify-center items-center gap-4">
                <div className="flex justify-center items-center">
                    <h2 className={"text-[30px] font-bold "}>Create Event</h2>
                </div>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit} className={"flex flex-col gap-3 py-10 min-w-80"}>
                    <input type="text" placeholder="Title here" className="input" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    <input type="date" id="date" placeholder="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} required/>
                    <input type="time" id="time" placeholder="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} required/>
                    <input type="text" id="location" placeholder="location" className="input" value={location} onChange={(e) => setLocation(e.target.value)} required/>
                    <input type="text" id="category" placeholder="category" className="input" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                    <input id="description" placeholder="description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    <input type="text" id="categoryId" placeholder="categoryId" className="input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required/>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                    <Link to={"/UserDashboard"} className="btn btn-">Dashboard</Link>
                </form>
            </div>
        </Layout>
    );
};

export default CreateEvent;