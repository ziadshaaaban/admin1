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

export default function Confirm() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }


    }, [])
    const [data, setData] = useState([]);
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
        "web": "NAN", "fingers": [
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


    let token = localStorage.getItem("token")
    const fetchData = () => {
        setThird({ isThird: false });

        setIsLoading(true)
        fetch(`https://backendssh.vercel.app/admin/confirmation/transactions`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setThird({ isThird: true });

                setData(actualData.transactions);
                setIsLoading(false)
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [register, setRegister] = useState({
        isRegister: false
    });
    const [trconfirm, settrconfirm] = useState([]);

    const [confirmkey, setconfirmkey] = useState('');
    const [conkey, setConkey] = useState('')
    const [geender, setGeender] = useState('')
    async function take(key) {
        setconfirmkey(key)
    }
    async function search(confirmkey) {
        setIsLoading2(true)
        setSec({ isSec: false });

        fetch(`https://backendssh.vercel.app/admin/confirmation/transactions/` + confirmkey, {
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

                settrconfirm(userData.transaction)
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
                alert("User Not Found")
                let duta = {
                    "_id": "0",
                    "user": "NAN",
                    "userId": "0",
                    "transactionType": "NaN",
                    "transactionImagePath": "NaN",
                    "result": "NaN",

                }
                let gg = {

                    "gender": "NaN",
                    "male_percentage": 0,
                    "female_percentage": 0,
                    "hand_position": "NAN",
                    "right_percentage": 0,
                    "left_percentage": 0,
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
                setIsLoading2(false)
                setGeender(gg)
                settrconfirm(duta)
            });
        fetchData()

    }; function onClear() {
        setconfirmkey("")
        toggleShow(false)

    } const [id, setId] = useState("")

    function conf(_id) {
        setId(_id)

        search(_id)
        setConkey(_id)

    }
    function onClear() {
        setForg("")
        setMatchth(pers)
        setMatchtwo(mat)

    }
    async function dis(conkey) {
        setIsLoading3(true)

        if (window.confirm("Are you sure you want to reject ?")) {
            let item = { confirm: false };
            let result = await fetch("https://backendssh.vercel.app/admin/confirmation/transactions/" + conkey, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    'Authorization': token,
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            setForg(result.message)
            setRegister({ isRegister: false })
            fetchData()
            setIsLoading3(false)

        }


    } async function confirm(conkey) {
        setIsLoading3(true)
        if (window.confirm("Are you sure you want to confirm ?")) {


            let item = { confirm: true };
            let result = await fetch("https://backendssh.vercel.app/admin/confirmation/transactions/" + conkey, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    'Authorization': token,
                },
                body: JSON.stringify(item)
            });
            result = await result.json();

            setRegister({ isRegister: false })
            fetchData()
            setIsLoading3(false)
        }
    }
    function showForg() {
        toast.info("Done", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    const [forg, setForg] = useState("");
    const [show, toggleShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(false);
    const [isLoading4, setIsLoading4] = useState(false);
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
                                                    <th>Transition ID</th>
                                                    <th>Report</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    data.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="user-info">

                                                                    <div className="user-info__basic">
                                                                        <h5 className="mb-0 speacail">{item._id}</h5>
                                                                        <p className="text-muted mb-0 speacail">{item.user}</p>
                                                                    </div>
                                                                </div>
                                                            </td>



                                                            <td>
                                                                <button className="btn btn-primary btn-sm bu" onClick={() => {
                                                                    setRegister({ isRegister: true }); conf(item._id);
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


                        </div>}</div>
                :




                <div>


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
                                ) : null}</div>
                        </div>
                        :
                        <div className="split right">
                            <div className='fieldse' > <div>
                                <div className="bl"> </div><div className="app">
                                    {isLoading3 ? (<>
                                        <div className="loading-screen"></div>


                                        <div className="blending">
                                            <div className="blending-spinner"></div>
                                        </div>

                                    </>
                                    ) : null}</div>
                                <CloseButton aria-label="Hide" onClick={() => { onClear(); toggleShow(false); setRegister({ isRegister: false }) }} className="clos" />

                                <div className="table-responsive">

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Transition Type</th>

                                                <th>Confirm</th>
                                                {/* <th>More</th> */}




                                            </tr>
                                        </thead>
                                        <tbody>



                                            <tr >
                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0 speacail">{trconfirm.user}</h5>
                                                            <p className="text-muted mb-0 speacail">{trconfirm.userId}</p>
                                                        </div>
                                                    </div>
                                                </td>


                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0 speacail"> {trconfirm.transactionType}</h5>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="btn-group" role="group" aria-label="...">
                                                        <button className="btn btn-primary btn-success" onClick={() => { confirm(conkey); showForg(forg); onClear(); }} >Confirm</button>
                                                        <button className="btn btn-primary btn-danger" onClick={() => { dis(conkey); showForg(forg); onClear(); }} >Reject</button>

                                                    </div>

                                                </td><td>
                                                    {/* <button className="btn btn-secondary dropdown-toggle" onClick={() => { toggleShow(!show) }} ></button> */}


                                                </td>

                                            </tr>


                                        </tbody>
                                    </table>
                                    <div className="table-responsive">
                                        <table><tbody><tr><td>
                                            <>

                                                {((test === 'one{Compare with people have previous crimes}' || test === 'Three{Compare with global DB}') & notm === 'not matched') ? <div>
                                                    <div className='col'>     <img src={image1} alt=" image" className='photo' />

                                                    </div>
                                                    <span className=''> <h1 className="headingg">Result : Not Match</h1><br /></span>
                                                    <h1 className="headingg">Information</h1>

                                                    <span className=''> <p>{"Gender : "}{geender.gender}</p><br /></span>
                                                    <p>{"Male_percentage : "}{geender.male_percentage}</p><br />
                                                    <p>{"Female Percentage : "}{geender.female_percentage}</p><br />

                                                    <span className=''>  <p>{"Hand Position : "}{geender.hand_position}</p><br /></span>
                                                    <p>{"Right Percentage : "}{geender.right_percentage}</p><br />
                                                    <p>{"Left Percentage : "}{geender.left_percentage}</p><br />

                                                    <p>{"Finger Name : "}{geender.Finger_name}</p><br />
                                                    <p>{"Thumb Percentage : "}{geender.Thump_percentage}</p><br />
                                                    <p>{"Little Percentage : "}{geender.Little_percentage}</p><br />
                                                    <p>{"Ring Percentage : "}{geender.Ring_percentage}</p><br />
                                                    <p>{"Index Percentage : "}{geender.Index_percentage}</p><br />
                                                    <p>{"Middle Percentage : "}{geender.Middle_percentage}</p><br />


                                                </div> : null
                                                }
                                                <div>
                                                    {((test === 'one{Compare with people have previous crimes}') & notm === 'matched') ?
                                                        <div>
                                                            <div className=' '>     <img src={image1} alt=" image" className='photo ' />

                                                            </div>
                                                            <span className=''> <h1 className="headingg">Result :  Match</h1><br /></span>
                                                            <h1 className="headingg">Information</h1>

                                                            <span className=''> <p>{"Name : "}{matchth.first_name} {matchth.last_name}</p><br /></span>
                                                            <p>{"Gender  : "}{matchth.gender}</p><br />

                                                            <span className=''>  <p>{"Company Name : "}{matchth.company_name}</p><br /></span>
                                                            <p>{"Address : "}{matchth.address}</p><br />

                                                            <p>{"City : "}{matchth.city}</p><br />
                                                            <p>{"County : "}{matchth.county}</p><br />


                                                            <p>{"Phone1 : "}{matchth.phone1}</p><br />
                                                            <p>{"Phone2 : "}{matchth.phone2}</p><br />
                                                            <p>{"E-mail : "}{matchth.email}</p><br />
                                                            <p>{"Web : "}{matchth.web}</p><br />

                                                            <h1 className="headingg">Crimes</h1>

                                                            {matchth.previousCrimes.map((item, index) => (
                                                                <div key={index}>

                                                                    <p>{"ID : "}{item._id}</p><br />
                                                                    {item.Crimes.map((item, index) => (
                                                                        <div key={index}>


                                                                            <p>{"Crime1 : "}{item.crime1}</p><br />

                                                                            <p>{"Date of the crime: "}{item["Date of the crime"]}</p><br />

                                                                            <p>{"Country of the crime: "}{item["Country of the crime"]}</p><br />
                                                                            <p>{"Address of the crime: "}{item["Address of the crime"]}</p><br />
                                                                            <p>{"Years in prison: "}{item["Years in prison"]}</p><br />
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

                                                            <span className=''> <p>{"Name : "}{matchth.first_name} {matchth.last_name}</p><br /></span>
                                                            <p>{"Gender  : "}{matchth.gender}</p><br />

                                                            <span className=''>  <p>{"Company Name : "}{matchth.company_name}</p><br /></span>
                                                            <p>{"Address : "}{matchth.address}</p><br />

                                                            <p>{"City : "}{matchth.city}</p><br />
                                                            <p>{"County : "}{matchth.county}</p><br />


                                                            <p>{"Phone1 : "}{matchth.phone1}</p><br />
                                                            <p>{"Phone2 : "}{matchth.phone2}</p><br />
                                                            <p>{"E-mail : "}{matchth.email}</p><br />
                                                            <p>{"Web : "}{matchth.web}</p><br />

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
                                                    {(test === 'Two{compare image from crime scene with image of suspect person}' & matchtwo.result === 'matched') ? <div>
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
                                                        <h1 className="headingg">Information</h1>

                                                        <span className=''> <p>{"Gender : "}{geender.gender}</p><br /></span>
                                                        <p>{"Male_percentage : "}{geender.male_percentage}</p><br />
                                                        <p>{"Female Percentage : "}{geender.female_percentage}</p><br />

                                                        <span className=''>  <p>{"Hand Position : "}{geender.hand_position}</p><br /></span>
                                                        <p>{"Right Percentage : "}{geender.right_percentage}</p><br />
                                                        <p>{"Left Percentage : "}{geender.left_percentage}</p><br />

                                                        <p>{"Finger Name : "}{geender.Finger_name}</p><br />
                                                        <p>{"Thumb Percentage : "}{geender.Thump_percentage}</p><br />
                                                        <p>{"Little Percentage : "}{geender.Little_percentage}</p><br />
                                                        <p>{"Ring Percentage : "}{geender.Ring_percentage}</p><br />
                                                        <p>{"Index Percentage : "}{geender.Index_percentage}</p><br />
                                                        <p>{"Middle Percentage : "}{geender.Middle_percentage}</p><br />



                                                    </div> : null
                                                    }</div></></td></tr></tbody></table></div>
                                </div>
                            </div></div>     </div>
                    }


                </div>




            }

        </>
    );

}
