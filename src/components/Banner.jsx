import Image from "next/image";
import React, { useState } from "react";

import p1 from "../../public/images/home-img-1.png"
import p2 from "../../public/images/home-img-2.png"
import p3 from "../../public/images/home-img-3.png"

const Banner = () => {

    let [pz, setPz] = useState(0);

    const menu = [
        { img: p1, title: "Homemade Pepperoni Pizza" },
        { img: p2, title: "Pizza With Mushrooms" },
        { img: p3, title: "Mascarpone And Mushrooms" },
    ]

    function rPizza() {
        if (pz === 2) {
            setPz(0)
        } else {
            setPz(pz += 1)
        }
    }

    function lPizza() {
        if (pz === 0) {
            setPz(2)
        } else {
            setPz(pz -= 1)
        }
    }

    return (
        <div className="bg mb-12">
            <div className="w-1/2 mx-auto flex justify-center items-center gap-12 py-6">
                <Image src={menu[pz].img} width={750} height={750} alt={menu[pz].title} />
                <div>
                    <div className="text-4xl w-full flex justify-between items-center">
                        <button onClick={lPizza} className="mx-1 bg-white px-2 rounded-lg">{"<"}</button>
                        <h2 className="mx-1 text-6xl text-white text-center font-semibold max-md:text-2xl">{menu[pz].title}</h2>
                        <button onClick={rPizza} className="mx-1 bg-white px-2 rounded-lg">{">"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
