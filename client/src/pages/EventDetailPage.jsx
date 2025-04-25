import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout.jsx";
import {Link, useParams} from "react-router-dom";
import {getEventById} from "../apiRecqust/apiRecqust.js";
import EventDetails from "../component/eventDetils.jsx";



const EventDetailPage = () => {
    let {id}=useParams();
    const [Events, SetEvents] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getEventById(id);
            SetEvents(res);
        })();
    }, [id]);




    return (
        <Layout>
           <EventDetails Events={Events}/>
        </Layout>
    );
};

export default EventDetailPage;