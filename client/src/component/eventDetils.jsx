import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getEventById} from "../apiRecqust/apiRecqust.js";
import Layout from "../layout/Layout.jsx";

const EventDetails = () => {


    const { id } = useParams();

    const [EventDetails, setEventDetails] = React.useState([]);
    useEffect(() => {
        (async () => {
            let res= await getEventById(id);
            setEventDetails(res);
        })()
    }, [id]);

    return (
        <Layout>
            <div className=" px-10 my-10 grid gap-2">
                {EventDetails && (
                    <div className="card bg-primary text-primary-content ">
                        <div className="card-body">
                            <h2 className="card-title text-[20px]">{EventDetails.title}</h2>
                            <div className="grid grid-cols-4 gap-4">
                                <p className="text-[14px]">{EventDetails.date}</p>
                                <p>{EventDetails.time}</p>
                                <p>{EventDetails.location}</p>
                                <p>{EventDetails.category}</p>
                            </div>
                            <p>{EventDetails.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EventDetails;