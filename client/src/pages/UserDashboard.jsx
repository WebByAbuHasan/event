import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout.jsx";
import {Link} from "react-router-dom";
import EventList from "../component/eventList.jsx";
import {getAllEvents} from "../apiRecqust/apiRecqust.js";

const UserDashboard = () => {
    const [Events, SetEvents] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getAllEvents();
            SetEvents(res);
        })();
    }, []);
    return (
        <Layout>
            <div className="px-10">
                <div className="container min-h-20 flex justify-start items-center gap-3 ">
                    <Link to={"/createEvent"} className="btn btn-primary">CREATE EVENT</Link>
                </div>
                <EventList Events={Events}/>
            </div>
        </Layout>
    );
};

export default UserDashboard;