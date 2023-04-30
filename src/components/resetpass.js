import './styles/admin.css'
import Side from './side';
import React, { useState, useEffect } from 'react';
import Header from "./header";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Restpass() {
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
    async function register() {
        setIsLoading(true)
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



                <div className='fieldse' >
                    <legend>Rest Password</legend>

                    {pass && <div><span className='mess'>{pass}</span></div>}
                    <br></br>

                    <input className='inpuu' value={username} type="search" placeholder="Enter User Name" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address" onChange={(e) => { setPass(""); setUsername(e.target.value) }} />
                    <input className='inpuu' value={newPassword} type="search" placeholder="Enter New Password" onChange={(e) => { setPass(""); setNewpassword(e.target.value) }} />

                    <input className='inpuu' type="button" value="Update" onClick={() => { forget(); showForg(forg); onClear(); }} disabled={!newPassword} />

                </div  >


            </div>




        </>
    )
}
export default Restpass