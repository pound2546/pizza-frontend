import React, { useState, useEffect } from "react";

const History = ({ his, setHis }) => {

    const [data, setData] = useState([]);

    async function fetchOrder() {
        const token = localStorage.getItem("token");
        if (!token) return
        await fetch(`${process.env.SERVER}/getorder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        })
        .then(res => res.json())
        .then(v => {
            if (v.status === 200) {
                setData(v.data);
            }
        })
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <div
            className={`fixed  overflow-scroll top-0 right-0 px-4 bg-white w-1/3 max-lg:w-2/3 h-screen ${his ? "translate-x-0" : "translate-x-[100%]"} shadow-xl`}>
            <div className="flex justify-between">
                <button onClick={() => setHis(false)} className="text-left text-[#e74c3c] text-2xl p-2 underline">Close</button>
                <button onClick={() => location.reload()} className="text-left text-[#e74c3c] text-2xl p-2 underline">Refresh</button>
            </div>
            <h1 className="mb-6 p-6 text-center bg-[#f5f5f5] text-[#e74c3c] text-4xl rounded-lg uppercase font-semibold max-md:text-2xl">order</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {
                    data.map((item, key) => (
                        <div key={key} className={`w-full p-4 bg-[#f5f5f5] text-[#666] text-xl rounded-lg border-4 relative ${item.status ? "border-green-400" : "border-[#e74c3c]"}`}>
                            <p className="text-xl">{item.address.name}</p>
                            <p className="text-xl">{item.name} ({item.size}) x{item.amount} ${item.amount * item.price}</p>
                            <p className="text-lg">{item.address.address} {item.address.pin} {item.address.phone}</p>
                            <p className={`text-lg absolute top-2 right-4 ${item.status ? "text-green-400" : "text-[#e74c3c]"}`}>{item.status ? "done" : "in progress"}</p>
                        </div>
                    ))
                }
                
            </div>
        </div>
    );
};

export default History;
