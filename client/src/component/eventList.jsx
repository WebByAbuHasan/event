import React from 'react';
import {Link} from "react-router-dom";

const EventList = (props) => {
    return (
        <div>
            <div className="mb-5 grid gap-2">
                <div className="mb-2 flex justify-center">
                    <h1 className="text-2xl font-bold ">upcoming events</h1>
                </div>

                {
                    props.Events.map((event, index) => {
                        return (

                            <Link key={index.toString()} to={`/getEventById/${event?._id}`} className="card bg-primary text-primary-content ">
                                <div className="card-body">
                                    <h2 className="card-title">{event["title"]}</h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        <p>{event["date"]}</p>
                                        <p>{event["time"]}</p>
                                        <p>{event["location"]}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default EventList;