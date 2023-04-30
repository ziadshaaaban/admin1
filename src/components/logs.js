import './styles/admin.css'
import Side from './side';
import React, { useEffect, useState } from 'react';
import Header from "./header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Logs() {
    const [data, setData] = useState([]);
    let token = localStorage.getItem("token")
    const [five, setFive] = useState({
        isFive: false
    });
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
        if (!localStorage.getItem('token')) {
            navigate("/")
        }
    }, []);
    async function getData() {
        setFive({ isFive: false });

        fetch(`https://backendssh.vercel.app/admin/login/logs`, {
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

                setData(actualData.loginLogs);
            })
            .catch((err) => {
                console.log(err.message);
            });

    };


    return (



        <>


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
                        <div className='fieldse' >

                            <div className="table-responsive">

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>

                                            <th>UserName</th>

                                            <th>Date</th>
                                            <th>Status</th>


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



                                                    <td>
                                                        <div className="user-info">
                                                            <div className="user-info__basic">
                                                                <h5 className="mb-0 speacail">{item.date}</h5>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="user-info">
                                                            <div className="user-info__basic">
                                                                <h5 className="mb-0 speacail">{item.status}</h5>

                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>))}



                                    </tbody>

                                </table>

                            </div>



                        </div  >
                    </div>}</div>

        </>
    )
}
export default Logs;