import React, { useEffect, useState } from "react";
import Link from "next/link";

import { BiRefresh } from "react-icons/bi"
import notify from "@/libs/notify";

const index = () => {

    const [order, setOrder] = useState([]);

    async function fetchUser() {
        const token = localStorage.getItem("token");
        if (!token) return window.location.href = "/";
        await fetch(`${process.env.SERVER}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        })
        .then(res => res.json())
        .then(userData => {
            if (userData.data.role === "admin") return;
            window.location.href = "/"
        })
    }

    async function fetchOrder() {
        await fetch(`${process.env.SERVER}/todoorder`)
        .then(res => res.json())
        .then(v => {
            if (v.status === 200) {
                console.log(v.order);
                setOrder(v.order);
            }
        })
    }

    async function update(id, status) {
        await fetch(`${process.env.SERVER}/updateorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                status,
            }),
        })
        .then(res => res.json())
        .then(test => {
            notify("update order", "green");
            setTimeout(() => {
                return location.reload();
            }, 1000);
        })
    }

    useEffect(() => {
        fetchUser();
        fetchOrder();
    }, [])

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-10">
                <section className="mx-12 flex items-center justify-between">
                    <Link href="/" className="text-[3rem] text-[#666] hover:text-[#e74c3c]">Pizza.</Link>
                    <nav className="flex gap-4 justify-center items-center">
                        <h1 className={`uppercase m-2 text-[2.2rem] font-semibold text-[#e74c3c] max-md:hidden`}>service</h1>
                        <h1 className={`uppercase m-2 text-[2.2rem] font-semibold text-[#e74c3c] max-md:hidden`}><BiRefresh size={54} className="cursor-pointer" onClick={() => location.reload()} /></h1>
                    </nav>
                </section>
            </header>
            <div className="mt-24 w-full flex flex-col justify-center items-center">
                <h1 className="mb-6 p-6 text-center text-[#e74c3c] text-4xl rounded-lg uppercase font-semibold max-md:text-2xl">order</h1>
                {
                    order.map((item, key) => (
                        <div key={key} onClick={() => update(item.id, item.status)} className={`w-1/2 cursor-pointer mb-4 p-4 bg-[#f5f5f5] text-[#666] text-xl rounded-lg relative border-4 ${item.status ? "border-green-400" : "border-[#e74c3c]"}`}>
                            <p className="text-xl">{item.address.name}</p>
                            <p className="text-xl">{item.name} ({item.size}) x{item.amount} ${item.amount * item.price}</p>
                            <p className="text-lg">{item.address.address} {item.address.pin} {item.address.phone}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default index;
