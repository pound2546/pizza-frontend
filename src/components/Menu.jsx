import React, { useState } from "react";
import Image from "next/image";

import p1 from "../../public/images/pizza-1.jpg"
import p2 from "../../public/images/pizza-2.jpg"
import p3 from "../../public/images/pizza-3.jpg"
import p4 from "../../public/images/pizza-4.jpg"
import p5 from "../../public/images/pizza-5.jpg"
import p6 from "../../public/images/pizza-6.jpg"
import p7 from "../../public/images/pizza-7.jpg"
import p8 from "../../public/images/pizza-8.jpg"
import p9 from "../../public/images/pizza-9.jpg"
import notify from "@/libs/notify";

const Menu = () => {

    const menu = [
        { img: p1, name: "pizza-1", price: "2/4/6" },
        { img: p2, name: "pizza-2", price: "4/8/12" },
        { img: p3, name: "pizza-3", price: "2/4/6" },
        { img: p4, name: "pizza-4", price: "3/6/9" },
        { img: p5, name: "pizza-5", price: "2/4/6" },
        { img: p6, name: "pizza-6", price: "4/8/12" },
        { img: p7, name: "pizza-7", price: "2/4/6" },
        { img: p8, name: "pizza-8", price: "3/6/9" },
        { img: p9, name: "pizza-9", price: "4/8/12" },
    ]

    //####################################################################################################################################################################################

    let order = {};
    const [bill, setBill] = useState({});
    
    async function getOrder(e, name, price, img, k) {
        e.preventDefault();
        const size = document.getElementById(name).value
        const amount = document.getElementById(`n${k}`).value
        if (size === "S") {
            price = price.split("/")[0]
        } else if (size === "M") {
            price = price.split("/")[1]
        } else if (size === "L") {
            price = price.split("/")[2]
        } else {
            return
        }
        order = {
            name,
            size,
            price,
            img,
            amount
        }
        setBill(order);
    }

    //####################################################################################################################################################################################

    const [pay, setPay] = useState("Cash");

    const [detail, setDetail] = useState({
        name: "",
        address: "",
        address2: "",
        pin: "",
        phone: "",
    })

    function onDetail(e) {
        setDetail({ ...detail, [e.target.name]: e.target.value })
    }

    //####################################################################################################################################################################################

    async function orderNow(e) {
        e.preventDefault();
        const token = localStorage.getItem("token")
        if (!token) {
            return notify("Please login!", "red")
        }
        const { name, size, price, amount } = bill;
        if (name === undefined || size === undefined || price === undefined || amount === undefined) {
            return alert("select pizza")
        }
        if (detail.name === "" || detail.address === "" || detail.pin === "" || detail.phone === "") {
            return alert("data is null")
        }
        await fetch(`${process.env.SERVER}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                order: {
                    name,
                    size,
                    amount,
                    price,
                    status: false,
                },
                address: {
                    name: detail.name,
                    address: detail.address,
                    address2: detail.address2,
                    pin: detail.pin,
                    phone: detail.phone,
                    payment: pay
                }
            }),
        })
        .then(res => res.json())
        .then(data => {
            notify("Order success", "green");
            setTimeout(() => {
                window.location.href = "/"
            }, 3000);
        });
    }

    //####################################################################################################################################################################################

    return (
        <div id="Menu" className="pb-12">
            <h1 className="text-4xl font-semibold text-center bg-transparent text-[#666] mb-4">OUR MENU</h1>
            <div className="grid grid-cols-3 max-md:grid-cols-1 w-3/5 mx-auto gap-6">
                {
                    menu.map((i, k) => (
                        <div key={k} className="p-4 bg-white rounded-xl relative">
                            <h2 className="absolute text-lg top-0 left-0 m-2">${i.price}</h2>
                            <Image src={i.img} width={300} height={300} alt={i.name} />
                            <h2 className="my-4 text-2xl font-semibold text-center">{i.name}</h2>
                            <div className="flex gap-4 px-2">
                                <div className="flex flex-col gap-2 w-1/3">
                                    <select name="size" id={i.name} className="bg-[#f5f5f5] p-1 rounded-lg">
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select>
                                    <input type="number" defaultValue={1} min={1} id={`n${k}`} className="bg-[#f5f5f5] p-1 rounded-lg" />
                                </div>
                                <button onClick={e => getOrder(e, i.name, i.price, i.img, k)} className="w-full bg-[#e74c3c] text-white text-xl rounded-xl hover:bg-[#666]">Select</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                bill.name ? (
                    <div className="mt-12 w-1/2 mx-auto">
                        <h1 className="text-4xl font-semibold text-center bg-transparent text-[#666]">ORDER</h1>
                        {
                            <div className="bg-white p-4 rounded-xl mt-4 flex">
                                <Image src={bill.img} height={200} width={200} alt={bill.name} />
                                <div className="px-4">
                                    <h1 className="text-2xl p-2">Name: {bill.name}</h1>
                                    <h1 className="text-2xl p-2">Size: {bill.size}</h1>
                                    <h1 className="text-2xl p-2">Amount: x{bill.amount}</h1>
                                    <h1 className="text-2xl p-2">Price: ${bill.amount * bill.price}</h1>
                                </div>
                            </div>
                        }
                    </div>
                ) : (
                    <></>
                )
            }
            <div id="Order" className="pb-12 my-12">
                <h1 className="text-4xl font-semibold text-center bg-transparent text-[#666] mb-4">DETAIL</h1>
                <div className="flex w-2/3 bg-white mx-auto p-4 rounded-xl text-[#666] relative">
                    <div className="w-full text-xl px-2">
                        <p>Name:</p>
                        <input type="text" autoComplete="off" onChange={onDetail} value={detail.name} name="name"  className="mb-4 p-2 bg-[#f5f5f5] rounded-xl w-full" />
                        <p>Address 1:</p>
                        <input type="text" autoComplete="off" onChange={onDetail} value={detail.address} name="address"  className="mb-4 p-2 bg-[#f5f5f5] rounded-xl w-full" />
                        <p>Address 2:</p>
                        <input type="text" autoComplete="off" onChange={onDetail} value={detail.address2} name="address2"  className="mb-4 p-2 bg-[#f5f5f5] rounded-xl w-full" />
                    </div>
                    <div className="w-full text-xl px-2">
                        <p>Pin code:</p>
                        <input type="text" autoComplete="off" onChange={onDetail} value={detail.pin} name="pin"  className="mb-4 p-2 bg-[#f5f5f5] rounded-xl w-full" />
                        <p>Phone number:</p>
                        <input type="text" autoComplete="off" onChange={onDetail} value={detail.phone} name="phone"  className="mb-4 p-2 bg-[#f5f5f5] rounded-xl w-full" />
                        <p>Payment:</p>
                        <select onChange={e => setPay(e.target.value)} className="mb-4 p-[10px] bg-[#f5f5f5] rounded-xl w-full">
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>
                    <button onClick={orderNow} className="absolute -bottom-14 right-0 py-2 px-4 bg-[#e74c3c] text-white text-xl w-full rounded-xl hover:bg-[#666]">Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
