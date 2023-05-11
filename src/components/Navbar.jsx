import React, { useState } from "react";
import Link from "next/link";

// comp
import Sign from "./Sign";
import History from "./History";

// icon
import { FaUser, FaBox } from "react-icons/fa"

const Navbar = () => {

    const [acc, setAcc] = useState(false);
    const [his, setHis] = useState(false);

    const menu = [
        {name: "Home"},
        {name: "Menu"},
        {name: "Order"},
        {name: "About"},
    ]

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-10">
            <section className="mx-12 flex items-center justify-between">
                <Link href="/" className="text-[3rem] text-[#666] hover:text-[#e74c3c]">Pizza.</Link>
                <nav>
                    {
                        menu.map((menu, key) => (
                            <Link key={key} href={`#${menu.name}`} className={`m-2 text-[2.2rem] hover:underline text-[#e74c3c] max-md:hidden`}>{menu.name}</Link>
                        ))
                    }
                </nav>
                <div className="flex items-center gap-6">
                    <FaUser onClick={() => setAcc(true)} id="user-btn" className="text-[2rem] text-[#666] cursor-pointer hover:text-[#e74c3c]" />
                    <FaBox onClick={() => setHis(true)} id="order-btn" className="text-[2rem] text-[#666] cursor-pointer hover:text-[#e74c3c]" />
                </div>
            </section>
            <Sign acc={acc} setAcc={setAcc} onClick={() => setHis(false)} />
            <History his={his} setHis={setHis} onClick={() => setAcc(false)} />
        </header>
    );
};

export default Navbar;
