import "./styles/users.css"
import image1 from './Images/1.jpg'
import image2 from './Images/2.jpg'

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import CloseButton from 'react-bootstrap/CloseButton';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./header";

import Side from "./side";

export default function Users() {

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }


    }, [])
    const [id, setId] = useState("")
    function know(_id, username, firstname, lastname, age, phone, address) {
        setId(_id)
        sessionStorage.setItem("idt", _id)
        setAge(age)
        setFirstname(firstname)
        setLastname(lastname)
        setUsername(username)
        setPhone(phone)
        setAdress(address)
        search(_id)


    }
    let tr = "Active";

    let fal = "Locked";
    let act = "Activate";
    let lock = "lock";
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");

    const [age, setAge] = useState("");

    const [up, setUp] = useState("");


    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [updated, setUpdated] = useState('');

    const handleClick = () => {
        setUpdated(inputRef.current.value);
    };
    const [data, setData] = useState([]);
    const [usersd, setUserd] = useState([]);
    const [userkey, setUserkey] = useState('');

    async function takekey(key) {
        setUserkey(key)
    }
    let token = localStorage.getItem("token")


    useEffect(() => {
        getData();
    }, []);


    async function getData() {
        setFive({ isFive: false });
        setIsLoading(true);
        setIsLoading4(true);


        fetch(`https://backendssh.vercel.app/admin/users`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setFive({ isFive: true });

                setIsLoading(false);
                setIsLoading4(false);

                setData(actualData.users);
            })
            .catch((err) => {
                console.log(err.message);
            });

    };

    async function search(userkey) {

        setIsLoading(true)
        setIsLoading2(true)
        setIsLoading3(true)
        setIsLoading4(true)



        setSeven({ isSeven: false })

        fetch(`https://backendssh.vercel.app/admin/users/` + userkey, {
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
                setFour({ isfour: true });

                setUserd(userData.user)
                setIsLoading7(false)
                setIsLoading(false)
                setIsLoading2(false)
                setIsLoading3(false)
                setIsLoading4(false)



            })
            .catch((err) => {
                alert("User Not Found")
                let duta = {
                    "_id": "NaN",
                    "username": "NaN",
                    "password": "NaN",
                    "firstname": "NaN",
                    "lastname": "NaN",
                    "age": "0",
                    "gender": "NaN",
                    "address": "NaN",
                    "phone": "NaN",
                    "isActive": false,
                    "isAdmin": false
                }
                setUserd(duta)
            });
        getData();
        setIsLoading6(false)
        setIsLoading7(false)
        setSeven({ isSeven: true })


    };



    async function deleteOperation(_id) {
        setFive({ isFive: false });
        setIsLoading(true);
        if (window.confirm("Are you sure you want to delete this user?")) {
            // setIsLoading4(true)

            let result = await fetch("https://backendssh.vercel.app/admin/users/" + _id, {
                method: "DELETE", headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    'Authorization': token,

                }
            });
            result = await result.json();
            getData();

        } else { getData() }
    }

    async function updateOperation(_id) {
        setFive({ isFive: false });
        setIsLoading(true);

        let result = await fetch("https://backendssh.vercel.app/admin/status/users/" + _id, {
            method: "PUT", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        });
        result = await result.json();
        setUp(result.message)
        search(id)
        getData()


    }

    async function updateuser(id) {
        setSex({ isSex: false })
        getData()
        let item = { firstname, username, lastname, phone, age, address };


        let result = await fetch("https://backendssh.vercel.app/admin/users/" + id, {
            method: "PUT", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            },
            body: JSON.stringify(item)


        });
        result = await result.json();
        setNot(result.message)
        getData()




    } function showUpdateuser(not) {
        toast.info(not, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    function showUpdate() {
        toast.success("User Status Changed", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    const [not, setNot] = useState("");


    const showToastMessage = () => {
        toast.success('User Deleted', {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };

    const dtr = [
        {
            "_id": "NAN",
            "user": "NAN",
            "userId": "NAN",
            "transactionType": "NAN",
            "result": " NAN",

        }]
    const [tran, setTran] = useState(dtr)
    function viewtransction(id) {
        setFour({ isfour: true });
        setIsLoading6(true)
        toggleShowtrans(!showtrans);
        fetch(`https://backendssh.vercel.app/admin/transactions/user/` + id, {
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
            .then((transaction) => {


                if (transaction.transaction) {
                    setTran(transaction.transaction)
                }
                setIsLoading3(false)
            })
            .catch((err) => {
                alert("Transction Not Found")
                let trann = {
                    "_id": "NAN",
                    "user": "NAN",
                    "userId": "NAN",
                    "transactionType": "NAN",
                    "transactionImagePath": "NAN",
                    "result": "NAN",
                    "informationEstimated": {
                        "gender": "NAN",
                        "male_percentage": 0.0,
                        "female_percentage": 0.0,
                        "hand_position": "Left",
                        "right_percentage": 0.0,
                        "left_percentage": 0.0
                    }

                }
                setTran(trann)


            });
    };

    const [show, toggleShow] = useState(false);
    const [showtrans, toggleShowtrans] = useState(false);
    const [info, toggleInfo] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);

    const [isLoading4, setIsLoading4] = useState(false);
    const [isLoading6, setIsLoading6] = useState(true);
    const [isLoading7, setIsLoading7] = useState(true)
    const [register, setRegister] = useState({
        isRegister: false

    });
    const [sec, setSec] = useState({
        isSec: true
    });

    const [third, setThird] = useState({
        isthird: false
    });

    const [four, setFour] = useState({
        isfour: false
    });

    const [five, setFive] = useState({
        isFive: false
    });

    const [sex, setSex] = useState({
        isSex: false
    });

    const [seven, setSeven] = useState({ isSeven: false })









    const [test, setTest] = useState('')
    const [notm, setNotm] = useState('')
    const pers = {
        "_idtwo": "NAN",
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
        "web": "NAN",
        "fingers": [
            "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN",]
        , "previousCrimes": [
            {
                "Crimes": [
                    {
                        "crime1": "NAN",
                        "Date of the crime": "NAN",
                        "Country of the crime": "NAN",
                        "Address of the crime": "NAN",
                        "Years in prison": "NAN"
                    }
                ]
            }
        ]

    }
    const mat = { "result": "NAN" }

    const [matchth, setMatchth] = useState(pers)
    const [matchtwo, setMatchtwo] = useState(mat)




    const [usersdtwo, setUserdtwo] = useState([]);

    const [userkeytwo, setuserkeytwo] = useState('');
    const [geender, setGeendertwo] = useState('')
    async function takekey(key) {
        setuserkeytwo(key)
    } const [isLoading5, setIsLoading5] = useState(true);


    function onClear() {
        setFirstname("")
        setAge("")
        setLastname("")
        setPhone("")
        setAdress("")
        setUsername("")
        setUserkey("")
        setUserd([])
        toggleShow(false)
        toggleShowtrans(false)
        setTran(dtr)
        setIsLoading3(false)
        setIsLoading(false)
        setIsLoading2(false)
        setIsLoading4(false)

        setMatchth(pers)
        setMatchtwo(mat)




    };
    async function searchtwo(userkeytwo) {
        setIsLoading5(true)
        setSec({ isSec: false });
        fetch(`https://backendssh.vercel.app/admin/transactions/` + userkeytwo, {
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
            .then((userDatatwo) => {
                setSec({ isSec: true });

                setUserdtwo(userDatatwo.transaction)
                setGeendertwo(userDatatwo.transaction.informationEstimated)
                setTest(userDatatwo.transaction.transactionType)
                setNotm(userDatatwo.transaction.result)
                setIsLoading5(false)

                if (userDatatwo.transaction.isMatched) {
                    setMatchtwo(userDatatwo.transaction.isMatched)

                }


                if (userDatatwo.transaction.PersonMatched) {
                    setMatchth(userDatatwo.transaction.PersonMatched);
                }

            })
            .catch((err) => {
                alert("Transction Not Found")
                let duta = {
                    "_idtwo": "NAN",
                    "user": "NAN",
                    "userIdtwo": "NAN",
                    "transactionType": "NAN",
                    "transactionImagePath": "NAN",
                    "result": "NAN",

                }
                let gg = {
                    "gender": "NaN",
                    "male_percentage": 0,
                    "female_percentage": 0,
                    "hand_position": "NAN",
                    "right_percentage": 0,
                    "left_percentage": 0,
                    "Finger_name": "NAN",
                    "Thump_percentage": 0,
                    "Little_percentage": 0,
                    "Ring_percentage": 0,
                    "Index_percentage": 0,
                    "Middle_percentage": 0

                }
                setGeendertwo(gg)
                setUserdtwo(duta)
            });

    }; const [idtwo, setIdtwo] = useState("")

    function knowtwo(_id) {
        setIdtwo(_id)

        searchtwo(_id)

    }
    const [showtwo, toggleShowtwo] = useState(false);

    return (
        <>


            {third.isthird ?

                <div>

                    {!sec.isSec ?
                        <>
                            <div className="">
                                {isLoading5 ? (<>
                                    <div className="blncen">
                                        <div className="blending-spinnerr"></div>

                                    </div>
                                    <div className="blncen2">

                                        <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                    </div>

                                </>
                                ) : null}</div></>
                        : <div className="split right">
                            <div className='fieldse' >

                                <div className="">
                                    {isLoading ? (<>
                                        <div className="blncen">
                                            <div className="blending-spinnerr"></div>

                                        </div>
                                        <div className="blncen2">

                                            <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                        </div>

                                    </>
                                    ) : null}</div>

                                <CloseButton aria-label="Hide" onClick={() => {
                                    setThird({ isthird: false }); setRegister({ isRegister: true }); toggleShowtrans(showtrans); know(id);
                                }} className="clos" />
                                <div className="table-responsive">

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Transition Type</th>


                                            </tr>
                                        </thead>
                                        <tbody>



                                            <tr >
                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0 speacail">{usersdtwo.user}</h5>
                                                            <p className="text-muted mb-0 speacail">{usersdtwo.userId}</p>
                                                        </div>
                                                    </div>
                                                </td>


                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0 speacail"> {usersdtwo.transactionType}</h5>
                                                        </div>
                                                    </div>
                                                </td>



                                            </tr>




                                        </tbody>
                                    </table>
                                    <table><tbody><tr><td><>

                                        {((test === 'one{Compare with people have previous crimes}' || test === 'Three{Compare with global DB}') & notm === 'not matched') ? <div>
                                            <div className='col'>     <img src={image1} alt=" image" className='photo' />

                                            </div>
                                            <span className=''> <h1 className="headingg">Result : Not Match</h1><br /></span>
                                            <h1 className="headingg">Information </h1>
                                            <span className=''> <p className="paragraph">{"Gender : "}{geender.gender}</p><br /></span>
                                            <p className="paragraph">{"Male_percentage : "}{geender.male_percentage}</p><br />
                                            <p className="paragraph">{"Female Percentage : "}{geender.female_percentage}</p><br />

                                            <span className=''>  <p className="paragraph">{"Hand Position : "}{geender.hand_position}</p><br /></span>
                                            <p className="paragraph">{"Right Percentage : "}{geender.right_percentage}</p><br />
                                            <p className="paragraph">{"Left Percentage : "}{geender.left_percentage}</p><br />

                                            <p className="paragraph">{"Finger Name : "}{geender.Finger_name}</p><br />
                                            <p className="paragraph">{"Thumb Percentage : "}{geender.Thump_percentage}</p><br />
                                            <p className="paragraph">{"Little Percentage : "}{geender.Little_percentage}</p><br />
                                            <p className="paragraph">{"Ring Percentage : "}{geender.Ring_percentage}</p><br />
                                            <p className="paragraph">{"Index Percentage : "}{geender.Index_percentage}</p><br />
                                            <p className="paragraph">{"Middle Percentage : "}{geender.Middle_percentage}</p><br />


                                        </div> : null
                                        }
                                        <div>
                                            {((test === 'one{Compare with people have previous crimes}') & notm === 'matched') ?
                                                <div>
                                                    <div className=' '>     <img src={image1} alt=" image" className='photo ' />

                                                    </div>
                                                    <span className=''> <h1 className="headingg">Result :  Match</h1><br /></span>
                                                    <h1 className="headingg">Information</h1>

                                                    <span className=''> <p className="paragraph">{"Name : "}{matchth.first_name} {matchth.last_name}</p><br /></span>
                                                    <p className="paragraph">{"Gender  : "}{matchth.gender}</p><br />

                                                    <span className=''>  <p className="paragraph">{"Company Name : "}{matchth.company_name}</p><br /></span>
                                                    <p className="paragraph">{"Address : "}{matchth.address}</p><br />

                                                    <p className="paragraph">{"City : "}{matchth.city}</p><br />
                                                    <p className="paragraph">{"County : "}{matchth.county}</p><br />


                                                    <p className="paragraph">{"Phone1 : "}{matchth.phone1}</p><br />
                                                    <p className="paragraph">{"Phone2 : "}{matchth.phone2}</p><br />
                                                    <p className="paragraph">{"E-mail : "}{matchth.email}</p><br />
                                                    <p className="paragraph">{"Web : "}{matchth.web}</p><br />
                                                    <h1 className="headingg">Crimes</h1>

                                                    {matchth.previousCrimes.map((item, index) => (
                                                        <div key={index}>

                                                            <p className="paragraph">{"ID : "}{item._id}</p><br />

                                                            {item.Crimes.map((item, index) => (
                                                                <div key={index}>

                                                                    <p className="paragraph">{"Crimes : "}{item.crime1}</p><br />

                                                                    <p className="paragraph">{"Date of the crime: "}{item["Date of the crime"]}</p><br />

                                                                    <p className="paragraph">{"Country of the crime: "}{item["Country of the crime"]}</p><br />
                                                                    <p className="paragraph">{"Address of the crime: "}{item["Address of the crime"]}</p><br />
                                                                    <p className="paragraph">{"Years in prison: "}{item["Years in prison"]}</p><br />
                                                                </div>))}




                                                        </div>))}


                                                    <h1 className="headingg">Fingers</h1>
                                                    <div className="image-wrapper">

                                                        {matchth.fingers.map((item, index) => (
                                                            <div key={index}>

                                                                <div className="media">
                                                                    <div className="overlay"></div>
                                                                    <img src={item} alt="" />
                                                                    <div className="image-details">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>




                                                </div>


                                                : null
                                            }</div>


                                        <div>
                                            {((test === 'Three{Compare with global DB}') & notm === 'matched') ?
                                                <div>
                                                    <div className=' '>     <img src={image1} alt=" image" className='photo ' />

                                                    </div>
                                                    <span className=''> <h1 className="headingg">Result :  Match</h1><br /></span>
                                                    <h1 className="headingg">Information</h1>

                                                    <span className=''> <p className="paragraph">{"Name : "}{matchth.first_name} {matchth.last_name}</p><br /></span>
                                                    <p className="paragraph">{"Gender  : "}{matchth.gender}</p><br />

                                                    <span className=''>  <p className="paragraph">{"Company Name : "}{matchth.company_name}</p><br /></span>
                                                    <p className="paragraph">{"Address : "}{matchth.address}</p><br />

                                                    <p className="paragraph">{"City : "}{matchth.city}</p><br />
                                                    <p className="paragraph">{"County : "}{matchth.county}</p><br />


                                                    <p className="paragraph">{"Phone1 : "}{matchth.phone1}</p><br />
                                                    <p className="paragraph">{"Phone2 : "}{matchth.phone2}</p><br />
                                                    <p className="paragraph">{"E-mail : "}{matchth.email}</p><br />
                                                    <p className="paragraph">{"Web : "}{matchth.web}</p><br />

                                                    <h1 className="headingg">Fingers</h1>
                                                    <div className="image-wrapper">

                                                        {matchth.fingers.map((item, index) => (
                                                            <div key={index}>

                                                                <div className="media">
                                                                    <div className="overlay"></div>
                                                                    <img src={item} alt="" />
                                                                    <div className="image-details">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>


                                                : null
                                            }</div>


                                        <div>
                                            {(test === 'Two{compare image from crime scene with image of suspect person}' & matchtwo.result === 'Not match') ? <div>
                                                <div className='col'>   <img src={image1} alt=" image" className='photo' />
                                                    <img src={image2} alt=" image" className='photo' />
                                                </div>
                                                <span className=''> <h1 className="headingg">Result : Not Match</h1><br /></span>
                                            </div> : null
                                            }</div>
                                        <div>
                                            {(test === 'Two{compare image from crime scene with image of suspect person}' & matchtwo.result === 'Match') ? <div>
                                                <div className='col'>   <img src={image1} alt=" image" className='photo' />
                                                    <img src={image2} alt=" image" className='photo' />
                                                </div>
                                                <span className=''> <h1 className="headingg">Result :  Match</h1><br /></span>
                                            </div> : null
                                            }</div>


                                        <div>

                                            {(test === "Four{Get Estimated Information's From FingerPrint Like (GENDER , HAND, FINGER)}") ? <div>
                                                <div className='col'>     <img src={image1} alt=" image" className='photo' />

                                                </div>
                                                <h1 className="headingg">Information </h1>

                                                <span className=''> <p className="paragraph">{"Gender : "}{geender.gender}</p><br /></span>
                                                <p className="paragraph">{"Male_percentage : "}{geender.male_percentage}</p><br />
                                                <p className="paragraph">{"Female Percentage : "}{geender.female_percentage}</p><br />

                                                <span className=''>  <p className="paragraph">{"Hand Position : "}{geender.hand_position}</p><br /></span>
                                                <p className="paragraph">{"Right Percentage : "}{geender.right_percentage}</p><br />
                                                <p className="paragraph">{"Left Percentage : "}{geender.left_percentage}</p><br />

                                                <p className="paragraph">{"Finger Name : "}{geender.Finger_name}</p><br />
                                                <p className="paragraph">{"Thumb Percentage : "}{geender.Thump_percentage}</p><br />
                                                <p className="paragraph">{"Little Percentage : "}{geender.Little_percentage}</p><br />
                                                <p className="paragraph">{"Ring Percentage : "}{geender.Ring_percentage}</p><br />
                                                <p className="paragraph">{"Index Percentage : "}{geender.Index_percentage}</p><br />
                                                <p className="paragraph">{"Middle Percentage : "}{geender.Middle_percentage}</p><br />


                                            </div> : null
                                            }</div></>


                                    </td></tr></tbody></table>
                                </div>



                            </div></div>}</div>

                :

                <div>
                    {!register.isRegister ?
                        <div>
                            {!five.isFive ?
                                <div>
                                    <div className="">
                                        {isLoading ? (<>
                                            <div className="blncen">
                                                <div className="blending-spinnerr"></div>

                                            </div>
                                            <div className="blncen2">

                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                            </div>

                                        </>
                                        ) : null}</div>
                                </div> :



                                <div className="split right">

                                    {data.length === 0 ?
                                        <div className="alertt warning-alert alrt">
                                            <h3 className="headingg">NO Users Found</h3>
                                        </div> :
                                        <div>
                                            {!sex.isSex ?

                                                <div className='fieldse' >
                                                    <div className="">
                                                        {isLoading ? (<>
                                                            <div className="blncen">
                                                                <div className="blending-spinnerr"></div>

                                                            </div>
                                                            <div className="blncen2">

                                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                                            </div>
                                                        </>
                                                        ) : null}

                                                    </div>

                                                    <div className="">
                                                        {isLoading ? (<>
                                                            <div className="blncen">
                                                                <div className="blending-spinnerr"></div>

                                                            </div>
                                                            <div className="blncen2">

                                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                                            </div>

                                                        </>
                                                        ) : null}</div>
                                                    <div className=""> </div>
                                                    <div></div><div className="">
                                                        {isLoading4 ? (<>
                                                            <div className="blncen">
                                                                <div className="blending-spinnerr"></div>

                                                            </div>
                                                            <div className="blncen2">

                                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                                            </div>
                                                        </>
                                                        ) : null}</div>




                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>UserName</th>

                                                                    <th>Status</th>
                                                                    <th>View</th>
                                                                    <th>Delete</th>
                                                                    <th>Update</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {
                                                                    data.map((item, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="user-info">
                                                                                    <div className="user-info__basic">
                                                                                        <h5 className="mb-0 speacail">{item.firstname + item.lastname}</h5>

                                                                                        <h6 className="text-muted mb-0 speacail">{item._id}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="user-info">
                                                                                    <div className="user-info__basic">
                                                                                        <h5 className="mb-0 speacail">{item.username}</h5>

                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            {!item.isActive ?

                                                                                <td>
                                                                                    <span className="active-circle bg-danger"></span>
                                                                                    {fal}
                                                                                </td>
                                                                                :
                                                                                <td>
                                                                                    <span className="active-circle bg-success"></span>
                                                                                    {tr}
                                                                                </td>
                                                                            }

                                                                            <td>
                                                                                <button className="btn btn-primary btn-sm  bu" onClick={() => {
                                                                                    setRegister({ isRegister: true }); setIsLoading2(true)
                                                                                        ; know(item._id, item.username,
                                                                                            item.firstname, item.lastname, item.age, item.phone, item.address);
                                                                                }}>View User</button>
                                                                            </td>
                                                                            <td>
                                                                                <button className="btn btn-primary btn-danger bu" onClick={() => { deleteOperation(item._id); showToastMessage(); }}>Delete</button>
                                                                            </td>
                                                                            <td>
                                                                                <button className="btn btn-info btn-sm bu" onClick={() => {
                                                                                    know(item._id, item.username,
                                                                                        item.firstname, item.lastname, item.age, item.address, item.phone); setSex({ isSex: true })
                                                                                }}>Update</button>
                                                                            </td>
                                                                            {!item.isActive ?

                                                                                <td>
                                                                                    <button className="btn btn-primary btn-dark bu" onClick={() => { updateOperation(item._id); showUpdate(up); }}>{act}</button>
                                                                                </td> :
                                                                                <td>
                                                                                    <button className="btn btn-primary btn-dark  bu" onClick={() => { updateOperation(item._id); showUpdate(up); }}>{lock}</button>
                                                                                </td>}

                                                                        </tr>))}



                                                            </tbody>

                                                        </table>

                                                    </div>                                        </div  >

                                                :

                                                <div>
                                                    {!seven.isSeven ?
                                                        <div>
                                                            <div className="app">
                                                                {isLoading7 ? (<>
                                                                    <div className="blncen">
                                                                        <div className="blending-spinnerr"></div>

                                                                    </div>
                                                                    <div className="blncen2">

                                                                        <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                                                    </div>

                                                                </>
                                                                ) : null}</div>
                                                        </div> :
                                                        <div >
                                                            <div className='fieldse' >

                                                                <CloseButton aria-label="Hide" onClick={() => {
                                                                    setSex({ isSex: false })
                                                                }} className="clos" />
                                                                <form id="form">
                                                                    <h1 className="headingg">Update User : <span>{firstname}{lastname}</span></h1>

                                                                    <div className='fi'>
                                                                        <div className="form-row">
                                                                            <div className="col">
                                                                                <input type="text" className="form-control" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                                            </div>
                                                                            <div className="col">
                                                                                <input type="text" className="form-control" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                                            </div>
                                                                            <div className="col">
                                                                                <input type="text" className="form-control" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                                            </div>
                                                                            <div className="col">
                                                                                <input type="text" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                                                            </div>
                                                                            <div className="col">
                                                                                <input type="text" className="form-control" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                                            </div>
                                                                            <div className="col">
                                                                                <input type="text" className="form-control" placeholder="Address" value={address} onChange={(e) => setAdress(e.target.value)} />
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    <button type="button" className="btn btn-primary btn-danger fil" onClick={() => { updateuser(id); }}>Update</button>
                                                                    <br></br>
                                                                </form>
                                                            </div>
                                                        </div>}</div>

                                            }

                                        </div>

                                    }
                                </div>}




                        </div>




                        :



                        <div>
                            {!four.isfour ?
                                <div>

                                    <div className="">
                                        {isLoading2 ? (<>
                                            <div className="blncen">
                                                <div className="blending-spinnerr"></div>

                                            </div>
                                            <div className="blncen2">

                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                            </div>

                                        </>
                                        ) : null}</div>

                                    <div></div><div className="">
                                        {isLoading6 ? (<>
                                            <div className="blncen">
                                                <div className="blending-spinnerr"></div>

                                            </div>
                                            <div className="blncen2">

                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                            </div>

                                        </>
                                        ) : null}</div>
                                </div>
                                :
                                <div>

                                    <div></div><div className="">
                                        {isLoading4 ? (<>
                                            <div className="blncen">
                                                <div className="blending-spinnerr"></div>

                                            </div>
                                            <div className="blncen2">

                                                <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                            </div>
                                        </>
                                        ) : null}</div>


                                    <div className="split right">
                                        <div className='fieldse' >
                                            <CloseButton aria-label="Hide" onClick={() => { onClear(); toggleInfo(false); setRegister({ isRegister: false }); }} className="clos" />


                                            <div className="table-responsive">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>User</th>
                                                            <th>Status</th>
                                                            <th>Transitions</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>


                                                        <tr >
                                                            <td>
                                                                <div className="user-info">
                                                                    <div className="user-info__basic">
                                                                        <h5 className="mb-0 speacail">{usersd.firstname + usersd.lastname}</h5>

                                                                        <p className="text-muted mb-0 speacail">{usersd.username}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {!usersd.isActive ?

                                                                <td>
                                                                    <span className="active-circle bg-danger"></span>
                                                                    {fal}
                                                                </td>
                                                                :
                                                                <td>
                                                                    <span className="active-circle bg-success"></span>
                                                                    {tr}
                                                                </td>
                                                            }
                                                            <td>
                                                                <button className="btn btn-info btn-sm bu" onClick={() => {
                                                                    know(usersd._id, usersd.username,
                                                                        usersd.firstname, usersd.lastname, usersd.age, usersd.phone); navigate("/tranuser")
                                                                }}> View Transition</button>

                                                            </td>

                                                        </tr>


                                                    </tbody>

                                                </table>

                                            </div>

                                            <div>
                                                <span className="">  <h1 className="headingg" >{" Name : "}{usersd.firstname} {usersd.lastname}</h1><br /></span>
                                                <p className="paragraph" >{"Username : "}{usersd.username}</p><br />
                                                <p className="paragraph" >{"ID : "}{usersd._id}</p><br />

                                                <p className="paragraph" >{"Gender : "}{usersd.gender}</p><br />
                                                <p className="paragraph" >{"Age : "}{usersd.age}</p><br />

                                                <p className="paragraph" >{"Address : "}{usersd.address}</p><br />
                                                <p className="paragraph" >{"Phone Number : "}{usersd.phone}</p><br />
                                                <div>{usersd.isAdmin == true ?
                                                    <p className="paragraph">IsAdmin : True</p> : <p className="paragraph">Is Admin : False</p>}</div><br />

                                            </div>



                                            {showtrans &&
                                                <div>


                                                    {tran.length === 0 ?

                                                        <h1 className="headingg" >No Transction Found</h1>

                                                        :
                                                        <div className="table-responsive">


                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">User Name</th>
                                                                        <th scope="col">Type</th>
                                                                        <th scope="col">more</th>


                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {
                                                                        tran.map((item, index) => (
                                                                            <tr key={index}>
                                                                                <td>{item.user}</td>
                                                                                <td>{item.transactionType}</td>
                                                                                <td> <button className="btn btn-primary btn-sm bu" onClick={() => { toggleShowtwo(false); knowtwo(item._id); setThird({ isthird: true }); }} >View Report</button>
                                                                                </td>
                                                                            </tr>))}
                                                                </tbody>

                                                            </table>

                                                            <div className="">
                                                                {isLoading3 ? (<>
                                                                    <div className="blncen">
                                                                        <div className="blending-spinnerr"></div>

                                                                    </div>
                                                                    <div className="blncen2">

                                                                        <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                                                    </div>

                                                                </>
                                                                ) : null}
                                                            </div>
                                                        </div>}
                                                </div>
                                            }
                                        </div>    </div  >
                                </div>}
                        </div>



                    }</div>}
        </>
    )
}





