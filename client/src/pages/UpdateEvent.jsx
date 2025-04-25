import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../layout/Layout.jsx";
import { getEventById, updateEvent } from '../apiRecqust/apiRecqust.js'; // Import API functions

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true); // Initial loading state

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventData = await getEventById(id);
                if (eventData) {
                    setTitle(eventData.title);
                    setDate(eventData.date);
                    setTime(eventData.time);
                    setLocation(eventData.location);
                    setCategory(eventData.category);
                    setDescription(eventData.description);
                    setCategoryId(eventData.categoryId);
                } else {
                    setError('Event not found.');
                }
            } catch (error) {
                setError('Failed to fetch event details.');
                console.error('Fetch Event Details Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const updatedEventData = {
                title,
                date,
                time,
                location,
                category,
                description,
                categoryId,
            };
            await updateEvent(id, updatedEventData);
            setLoading(false);
            setSuccessMessage('Event updated successfully!');
            // Optionally redirect
            setTimeout(() => {
                navigate('/events'); // Redirect to events list page
            }, 2000);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to update event. Please try again.');
                console.error('Update Event Error:', error);
            }
        }
    };

    if (loading) {
        return <Layout><div>Loading event details...</div></Layout>;
    }

    if (error) {
        return <Layout><div>Error: {error}</div></Layout>;
    }

    return (
        <Layout>
            <div className="update-event-container">
                <h2>Update Event</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    {/* ... other form fields (date, time, location, category, description, categoryId) ... */}
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input
                            type="time"
                            id="time"
                            className="form-control"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            className="form-control"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryId">Category ID:</label>
                        <input
                            type="text"
                            id="categoryId"
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Event'}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default UpdateEvent;