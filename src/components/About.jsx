import React from "react";
import Image from "next/image";

import a1 from "../../public/images/about-1.png"
import a2 from "../../public/images/about-2.png"
import a3 from "../../public/images/about-3.png"

const About = () => {

    const menu = [
        { img: a1, title: "made with love", desc: "", },
        { img: a2, title: "30 minutes delivery", desc: "", },
        { img: a3, title: "share with friends", desc: " ", },
    ]

    return (
        <div id="About" className="pb-12">
            <h1 className="text-4xl font-semibold text-center bg-transparent text-[#666] mb-4">ABOUT US</h1>
            <div className="grid grid-cols-3 max-md:grid-cols-1 w-3/5 mx-auto gap-6">
                {
                    menu.map((i, k) => (
                        <div key={k} className="p-4 bg-white rounded-xl">
                            <Image src={i.img} width={300} height={300} alt={i.title} />
                            <h2 className="my-4 text-2xl font-semibold text-center">{i.title}</h2>
                            <p className="text-[#666] px-2">{i.desc}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default About;
