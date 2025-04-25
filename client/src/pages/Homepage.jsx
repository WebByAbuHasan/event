import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout.jsx";
import {getAllEvents, getCategories} from "../apiRecqust/apiRecqust.js";
import EventList from "../component/eventList.jsx";
import {Link} from "react-router-dom";

const Homepage = () => {

    const [categories, SetCategories] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getCategories();
            SetCategories(res);
        })();
    }, []);


    const [Events, SetEvents] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await getAllEvents();
            SetEvents(res);
        })();
    }, []);



    return (
        <Layout>
            <div className="mb-5">
                <div className="carousel w-full min-h-60">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                            className="w-full"/>
                        <div
                            className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-10">
                <div className="mb-10 flex justify-center">
                    <div className="grid grid-cols-5 gap-2">

                        {
                            categories.map((category, index) => {
                                return <Link className="btn btn-primary" to={`/event/category/${category._id}`} key={index}>{category.categoryName}</Link>
                            })
                        }
                    </div>
                </div>
                <EventList Events={Events}/>
            </div>
        </Layout>
    );
};

export default Homepage;