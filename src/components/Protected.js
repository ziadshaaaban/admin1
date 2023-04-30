import React from "react";


function Protected(props) {
    const Cmp = props.cmp
    var token = JSON.parse(localStorage.getItem('token'))
    console.warn(token)
    return <div>{token ? <Cmp /> : <redirect to="/login"> </redirect>} </div>

}
export default Protected;
