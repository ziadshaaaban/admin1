import Side from './side';
import './styles/database.css'
import Header from "./header";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CloseButton from 'react-bootstrap/CloseButton';
import image1 from './Images/1.jpg'
import image2 from './Images/2.jpg'
import { useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';


function Tranuser() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }


    }, [])
    const [test, setTest] = useState('')
    const [notm, setNotm] = useState('')
    const pers = {
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
        "web": "NAN",
        "fingers": [
            "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN",]

        , "previousCrimes": [
            {
                "_id": "NAN",
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

    const [data, setData] = useState([]);

    let token = localStorage.getItem("token")
    let idt = sessionStorage.getItem("idt")

    const fetchData = (idt) => {
        setThird({ isThird: false });
        setIsLoading(true)
        fetch(`https://backendssh.vercel.app/admin/transactions/user/` + idt, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setThird({ isThird: true });
                setData(actualData.transaction);
                setIsLoading(false)
            })
            .catch((err) => {

            });
    };

    useEffect(() => {
        fetchData(idt);
    }, []);

    const [register, setRegister] = useState({
        isRegister: false
    });
    const [usersd, setUserd] = useState([]);

    const [userkey, setUserkey] = useState('');
    const [geender, setGeender] = useState('')
    async function takekey(key) {
        setUserkey(key)
    }
    async function search(userkey) {
        setIsLoading2(true)
        setSec({ isSec: false });

        fetch(`https://backendssh.vercel.app/admin/transactions/` + userkey, {
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
                setSec({ isSec: true });

                setUserd(userData.transaction)
                setGeender(userData.transaction.informationEstimated)
                setTest(userData.transaction.transactionType)
                setNotm(userData.transaction.result)

                if (userData.transaction.isMatched) {
                    setMatchtwo(userData.transaction.isMatched)

                }


                if (userData.transaction.PersonMatched) {
                    setMatchth(userData.transaction.PersonMatched);
                }
                setIsLoading2(false)
            })
            .catch((err) => {
                alert("Transction Not Found")
                let duta = {
                    "_id": "NAN",
                    "user": "NAN",
                    "userId": "NAN",
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
                setGeender(gg)
                setUserd(duta)
            });
        fetchData(idt)

    }; function onClear() {
        setUserkey("")
        toggleShow(false)
        setMatchth(pers)
        setMatchtwo(mat)
    } const [id, setId] = useState("")

    function know(_id) {
        setId(_id)

        search(_id)

    }
    const [show, toggleShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [sec, setSec] = useState({
        isSec: false
    });
    const [third, setThird] = useState({
        isThird: false
    });
    return (
        <>





            {!register.isRegister ?
                <div>
                    {!third.isThird ?
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

                        <div>
                            <div className="split right">
                                {data.length === 0 ?

                                    <div className="alertt warning-alert alrt">
                                        <h3 className="headingg">NO transaction found</h3>
                                    </div>
                                    :
                                    <div className='fieldse' >



                                        <div className="table-responsive">

                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>User</th>
                                                        <th>Transition Type</th>

                                                        {/* <th>Transition Type</th> */}
                                                        <th> Report</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        data.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="user-info">

                                                                        <div className="user-info__basic">
                                                                            <h5 className="mb-0 speacail">{item.user}</h5>
                                                                            <p className="text-muted mb-0 speacail">{item._id}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td>
                                                                    <div className="user-info">

                                                                        <div className="user-info__basic">
                                                                            <h5 className="mb-0 speacail"> {item.transactionType}</h5>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-primary btn-sm bu" onClick={() => {
                                                                        setRegister({ isRegister: true }); know(item._id);
                                                                    }}>View Report</button>
                                                                </td><td>
                                                                </td>

                                                            </tr>))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>

                                    </div  >

                                }
                            </div>
                        </div>

                    }
                </div>
                :


                <>
                    {!sec.isSec ?
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
                                ) : null}</div></div>
                        :
                        <>
                            <div><div className="split right">
                                <div className='fieldse' >
                                    <CloseButton aria-label="Hide" onClick={() => { onClear(); setRegister({ isRegister: false }) }} className="clos" />


                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th>Transition Type</th>


                                                </tr>
                                            </thead>
                                            <><tbody>



                                                <tr >
                                                    <td>
                                                        <div className="user-info">

                                                            <div className="user-info__basic">
                                                                <h5 className="mb-0 speacail">{usersd.user}</h5>
                                                                <p className="text-muted mb-0 speacail">{usersd.userId}</p>
                                                            </div>
                                                        </div>
                                                    </td>


                                                    <td>
                                                        <div className="user-info">

                                                            <div className="user-info__basic">
                                                                <h5 className="mb-0 speacail"> {usersd.transactionType}</h5>
                                                            </div>
                                                        </div>
                                                    </td>


                                                </tr>






                                            </tbody></>

                                        </table>
                                        <table>
                                            <tbody><tr><td> <>

                                                {((test === 'one{Compare with people have previous crimes}' || test === 'Three{Compare with global DB}') & notm === 'not matched') ? <div>
                                                    <div className='col'>     <img src={image1} alt=" image" className='photo' />

                                                    </div>
                                                    <span className=''> <h1>Result : Not Match</h1><br /></span>
                                                    <h1 className="headingg">Information</h1>
                                                    <p className="paragraph">{"Gender : "}{geender.gender}</p><br />
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
                                                            <span className=''> <h1>Result :  Match</h1><br /></span>
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
                                                            <span className=''> <h1>Result :  Match</h1><br /></span>
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

                                                        <span className=''> <h1>Result : Not Match</h1><br /></span>


                                                    </div> : null
                                                    }</div>
                                                <div>
                                                    {(test === 'Two{compare image from crime scene with image of suspect person}' & matchtwo.result === 'Match') ? <div>
                                                        <div className='col'>   <img src={image1} alt=" image" className='photo' />
                                                            <img src={image2} alt=" image" className='photo' />
                                                        </div>
                                                        <span className=''> <h1>Result :  Match</h1><br /></span>




                                                    </div> : null
                                                    }</div>


                                                <div>

                                                    {(test === "Four{Get Estimated Information's From FingerPrint Like (GENDER , HAND, FINGER)}") ? <div>
                                                        <div className='col'> <img src={image1} alt=" image" className='photo' />
                                                        </div>
                                                        <h1 className="headingg">Information</h1>

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
                                                    }</div></></td></tr></tbody>
                                        </table>

                                    </div>
                                </div></div>
                            </div></>}
                </>
            }

        </>
    )
}
export default Tranuser;