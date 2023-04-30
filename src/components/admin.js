import './styles/admin.css'
import Side from './side';
import React, { useState, useEffect } from 'react';
import Header from "./header";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    let token = localStorage.getItem("token")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewpassword] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [not, setNot] = useState("");
    const [forg, setForg] = useState("");
    const [userkey, setUserkey] = useState('');
    const [usersd, setUserd] = useState([]);

    const [show, toggleShow] = useState(false);
    async function takekey(key) {
        setUserkey(key)
    }
    const [addnew, setAddnew] = useState('')
    const [erorem, setErorem] = useState('')

    async function register() {
        if (username.includes('@')) {
            setIsLoading(true)
            onClear();
            let item = { username, password, firstname, lastname, gender, address, phone, age }
            let token = localStorage.getItem("token")


            let result = await fetch("https://backendssh.vercel.app/admin/users", {
                method: "POST",
                body: JSON.stringify(item),

                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    'Authorization': token,

                },
            });
            result = await result.json();
            setNot(result)
            setAddnew(result.message)
            setIsLoading(false)
        }
        else { setErorem("Please Include @") }
    }
    function showToastMessage(not) {
        toast.info(not.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    function showForg(forg) {
        toast.success(" Password reset successfully", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    function onClear() {
        setAge("")
        setAddress("")
        setUsername("")
        setFirstname("")
        setGender("")
        setLastname("")
        setPassword("")
        setPhone("")
        setNewpassword("")
        setForg("")
        setNot("")

    };
    const [pass, setPass] = useState('')
    const [find, setFind] = useState('')
    async function forget() {
        setIsLoading2(true)
        let item = { username, newPassword };
        let result = await fetch("https://backendssh.vercel.app/admin/forgetPassword", {
            method: "put",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,
            },
            body: JSON.stringify(item)
        });
        result = await result.json();

        setPass(result.message)
        setIsLoading2(false)
    }
    async function search(userkey) {
        fetch(`https://backendssh.vercel.app/admin/citizen/` + userkey, {
            method: "get", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();

            })
            .then((userData) => {
                setUserd(userData.user)

            })
            .catch((err) => {
                alert("User Not Found")
                let cit = {
                    "_id": "NAN",
                    "first_name": "NAN",
                    "last_name": "NAN",
                    "gender": "NAN",
                    "company_name": "NAN",
                    "address": "NAN",
                    "city": "NAN",
                    "county": "NAN",
                    "phone1": "NAN",
                    "phone2": "NAN",
                    "email": "NAN",

                }
                setUserd(cit)
                setFind("Not Found")

            });

    };
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }


    }, [])


    return (
        <>


            <div className="split right">
                <div className='fieldse' >
                    <div className="bl"> </div><div className="app">
                        {isLoading ? (<>
                            <div className="loading-screen"></div>

                            <div className="blending">
                                <div className="blending-spinner"></div>
                            </div>

                        </>
                        ) : null}</div>
                    <div className="bl"> </div><div className="app">
                        {isLoading2 ? (<>
                            <div className="loading-screen"></div>

                            <div className="blending">
                                <div className="blending-spinner"></div>
                            </div>

                        </>
                        ) : null}</div>
                    <legend>Add User</legend>
                    {addnew && <div> <span className='sp'>{addnew}</span> </div>}
                    <div className='formmm' >
                        <div className="na">

                            <input className='inputtt' type="email" required value={username} placeholder="User name" onChange={(e) => { setErorem(""); setAddnew(""); setUsername(e.target.value) }} />

                            {erorem && <div> <span className=''>{erorem}</span> </div>}

                        </div>
                        <div className="na">
                            <input className='inputtt' value={firstname} placeholder=" First name" onChange={(e) => { setAddnew(""); setFirstname(e.target.value) }} />

                        </div>
                        <div className="na">
                            <input className='inputtt' value={lastname} placeholder="Last name" onChange={(e) => { setAddnew(""); setLastname(e.target.value) }} />


                        </div>
                        <div className="na">
                            <input className='inputtt' value={password} placeholder=" Password" type="password" onChange={(e) => { setAddnew(""); setPassword(e.target.value) }} />
                        </div>

                        <div className="na">
                            <input className='inputtt' value={gender} placeholder=" Gender" type="gender" onChange={(e) => { setAddnew(""); setGender(e.target.value) }} />
                        </div>
                        <div className="na">
                            <input className='inputtt' value={address} placeholder=" Address" type="address" onChange={(e) => { setAddnew(""); setAddress(e.target.value) }} />
                        </div>
                        <div className="na">
                            <input className='inputtt' value={phone} placeholder=" Phone" type="phone" onChange={(e) => { setAddnew(""); setPhone(e.target.value) }} />
                        </div>
                        <div className="na">
                            <input className='inputtt' value={age} placeholder=" Age" type="age" onChange={(e) => { setAddnew(""); setAge(e.target.value) }} />
                        </div>


                    </div><br />
                    <button className='sum' onClick={() => { register(); }} disabled={!username}>Add</button>


                </div >



            </div>

        </>
    );
}


export default Admin;