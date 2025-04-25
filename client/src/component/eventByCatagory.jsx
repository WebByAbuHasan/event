import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Layout from "../layout/Layout.jsx";
import {getEventByCategoryId} from "../apiRecqust/apiRecqust.js";

const EventByCategory = () => {
    const { id } = useParams();
    const [ByCategory, setByCategory] = React.useState([]);
    useEffect(() => {
        (async () => {
            let res= await getEventByCategoryId(id);
            setByCategory(res);
        })()
    }, [id]);

    return (
        <Layout>
            <div className=" px-10 my-10 grid gap-2">
                {
                    ByCategory.map((category, index) => (
                        <Link key={index.toString()} to={`/getEventById/${category?._id}`}  className="card bg-primary text-primary-content " >
                            <div className="card-body">
                                <h2 className="card-title">{category["title"]}</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <p>{category["date"]}</p>
                                    <p>{category["time"]}</p>
                                    <p>{category["location"]}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </Layout>
    );
};

export default EventByCategory;