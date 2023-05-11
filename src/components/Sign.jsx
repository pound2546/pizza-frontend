import notify from "@/libs/notify";
import React, { useEffect, useState } from "react";

const Sign = ({ acc, setAcc }) => {

    const [user, setUser] = useState(false);
    const [data, setData] = useState();

    //####################################################################################################################################################################################

    const [login, setLogin] = useState({
        username: "",
        password: "",
    });

    function loginChange(e) {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    async function onLogin(e) {
        e.preventDefault();
        const { username, password } = login;
        await fetch(`${process.env.SERVER}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                notify(data.msg, "green")
                localStorage.setItem("token", data.token);
                setTimeout(() => {
                    location.reload();
                }, 3000);
                return
            }
            notify(data.msg, "red")
        });
    }

    //####################################################################################################################################################################################

    const [register, setRegister] = useState({
        user: "",
        pass1: "",
        pass2: "",
    });

    function registerChange(e) {
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    async function onRegister(e) {
        e.preventDefault();
        const { user, pass1, pass2 } = register;
        if (pass1 !== pass2) return alert("Password not match!");
        await fetch(`${process.env.SERVER}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user,
                password: pass1,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                return notify(data.msg, "green")
            }
            notify(data.msg, "red")
        });
    }

    //####################################################################################################################################################################################

    const [cPassword, setCpassword] = useState({
        nPass1: "",
        nPass2: "",
    })

    function passChange(e) {
        setCpassword({ ...cPassword, [e.target.name]: e.target.value });
    }

    async function changePassword(e) {
        e.preventDefault();
        const { nPass1, nPass2 } = cPassword;
        if (nPass1 !== nPass2) return alert("password not match!");
        fetchUser();
        await fetch(`${process.env.SERVER}/password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                nPass: nPass1,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                notify(data.msg, "green")
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
            return
        });
    }

    //####################################################################################################################################################################################

    async function fetchUser() {
        const token = localStorage.getItem("token");
        if (!token) return setUser(false);
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
            if (userData.status === 200) {
                setData(userData.data);
                setUser(true);
            }
        })
    }

    useEffect(() => {
        fetchUser();
    }, [user])

    //####################################################################################################################################################################################

    return user ? (
        <div
            className={`fixed top-0 right-0 px-4 bg-white w-1/3 max-lg:w-2/3 h-screen ${acc ? "translate-x-0" : "translate-x-[100%]"} shadow-xl`}>
            <div className="flex justify-between">
                <button onClick={() => setAcc(false)} className="text-left text-[#e74c3c] text-2xl p-2 underline">Close</button>
                <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }} className="text-left text-[#e74c3c] text-2xl p-2 underline">Logout</button>
            </div>
            <h1 className="mb-6 p-6 text-center bg-[#f5f5f5] text-[#e74c3c] text-4xl rounded-lg uppercase font-semibold max-md:text-2xl">account</h1>
            <div className="flex flex-wrap justify-center gap-6">
                <h2 className="w-full p-4 bg-[#f5f5f5] text-[#666] text-4xl rounded-lg font-semibold max-md:text-2xl">ID: {data.username}</h2>
                <h1 className="p-6 w-full text-center bg-[#f5f5f5] text-[#e74c3c] text-4xl rounded-lg uppercase font-semibold max-md:text-2xl">change password</h1>
                <form className="w-full" onSubmit={changePassword}>
                    <input type="password" onChange={passChange} name="nPass1" value={cPassword.nPass1} placeholder="new password" className="mb-4 p-4 rounded-lg bg-[#f5f5f5] w-full" />
                    <input type="password" onChange={passChange} name="nPass2" value={cPassword.nPass2} placeholder="confirm password" className="mb-4 p-4 rounded-lg bg-[#f5f5f5] w-full" />
                    <div className="w-full text-right">
                        <button type="submit" className="uppercase p-2 rounded-lg mb-4 text-lg text-white bg-[#e74c3c] hover:bg-[#333]">Change password</button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <div
            className={`fixed top-0 right-0 px-4 bg-white w-1/3 max-lg:w-2/3 h-screen ${acc ? "translate-x-0" : "translate-x-[100%]"} shadow-xl`}>
            <button onClick={() => setAcc(false)} className="text-left text-[#e74c3c] text-2xl p-2 underline">Close</button>
            <h1 className="mb-6 p-6 text-center bg-[#f5f5f5] text-[#e74c3c] text-4xl rounded-lg uppercase font-semibold max-md:text-2xl">account</h1>
            <div className="flex flex-wrap justify-center gap-6">
                <form onSubmit={onLogin} className="flex flex-col bg-[#f5f5f5] w-full rounded-xl h-fit">
                    <h2 className="uppercase text-center text-2xl py-6 font-semibold">login</h2>
                    <input
                        onChange={loginChange}
                        autoComplete="off"
                        name="username"
                        type="text"
                        placeholder="username"
                        className="mx-4 p-2 rounded-lg mb-4"
                    />
                    <input
                        onChange={loginChange}
                        name="password"
                        type="password"
                        placeholder="password"
                        className="mx-4 p-2 rounded-lg mb-4"
                    />
                    <button className="uppercase mx-4 p-2 rounded-lg mb-4 bg-[#e74c3c] text-lg text-white hover:bg-[#333]">login</button>
                </form>
                <form onSubmit={onRegister} className="flex flex-col bg-[#f5f5f5] w-full rounded-xl h-fit">
                    <h2 className="uppercase text-center text-2xl py-6 font-semibold">register</h2>
                    <input
                        onChange={registerChange}
                        autoComplete="off"
                        value={register.user}
                        name="user"
                        type="text"
                        placeholder="username"
                        className="mx-4 p-2 rounded-lg mb-4"
                    />
                    <input
                        onChange={registerChange}
                        value={register.pass1}
                        name="pass1"
                        type="password"
                        placeholder="password"
                        className="mx-4 p-2 rounded-lg mb-4"
                    />
                    <input
                        onChange={registerChange}
                        value={register.pass2}
                        name="pass2"
                        type="password"
                        placeholder="confirm password"
                        className="mx-4 p-2 rounded-lg mb-4"
                    />
                    <button className="uppercase mx-4 p-2 rounded-lg mb-4 bg-[#e74c3c] text-lg text-white hover:bg-[#333]">register</button>
                </form>
            </div>
        </div>
    );
};

export default Sign;
