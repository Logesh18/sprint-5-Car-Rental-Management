import axios from "axios";
import react,{useState} from "react";

const CardDetails=()=>{

    const [resultantData, setResultantData]=useState([]);
    const [carId,setCarId]=useState("");
    const [carModel,setCarModel]=useState("");
    const [carNo,setCarNo]=useState("");
    const [status,setStatus]=useState("");

    const addDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'post',
            url: 'http://localhost:8000/savecar',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                carId:carId,
                carModel:carModel,
                carNo:carNo,
                status:status
            })
        }).then((response)=>{
            const newData = response.data.map(object => ({
                carId: object.carId,
                carModel: object.carModel,
                carNo: object.carNo,
                status: object.status,
            }));
            setResultantData(newData);
        });
    }

    const editDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'post',
            url: `http://localhost:8000/editCar?id=${carId}`,
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                carModel:carModel,
                carNo:carNo,
                status:status
            })
        }).then((response)=>{
            const newData = response.data.map(object => ({
                carId: object.carId,
                carModel: object.carModel,
                carNo: object.carNo,
                status: object.status,
            }));
            setResultantData(newData);
        });
    }

    const deleteDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/deleteCar?id=${carId}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                carId: object.carId,
                carModel: object.carModel,
                carNo: object.carNo,
                status: object.status,
            }));
            setResultantData(newData);
        });   
    }

    const showDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: 'http://localhost:8000/getCars'
        }).then((response)=>{
            const newData = response.data.map(object => ({
                carId: object.carId,
                carModel: object.carModel,
                carNo: object.carNo,
                status: object.status,
            }));
            setResultantData(newData);
        });  
    }

    const findDetails=()=>{
        document.getElementById("result").style.display="block";
        axios({
            method: 'get',
            url: `http://localhost:8000/getCars?id=${carId}`
        }).then((response)=>{
            const newData = response.data.map(object => ({
                carId: object.carId,
                carModel: object.carModel,
                carNo: object.carNo,
                status: object.status,
            }));
            setResultantData(newData);
        });  
    }

    return(
        <div>
            <center>
            <h1 className="heading">Car-Rental-Management</h1>
            <div className="formContainer">
                <input type="text" id="carId" placeholder="Enter Car ID" onChange={(e)=>setCarId(e.target.value)} /><br/>
                <input type="text" id="carModel" placeholder="Enter Car Model" onChange={(e)=>setCarModel(e.target.value)} /><br/>
                <input type="text" id="carNo" placeholder="Enter Car No" onChange={(e)=>setCarNo(e.target.value)} /><br/>
                <input type="text" id="status" placeholder="Enter Car Status" onChange={(e)=>setStatus(e.target.value)}/><br/>
            </div>
            </center>
            <div className="actionContainer">
                <div>
                    <button onClick={()=>{addDetails()}} className="add-button">Add</button>
                </div>
                <div>
                    <button onClick={()=>{editDetails()}} className="update-button">Update</button>
                </div>
                <div>
                    <button onClick={()=>{deleteDetails()}} className="delete-button">Delete</button>
                </div>
                <div>
                    <button onClick={()=>{showDetails()}} className="show-button">Show</button>
                </div>
                <div>
                    <button onClick={()=>{findDetails()}} className="find-button">Find</button>
                </div>  
            </div>
            <div id="result">
                <h2>Car Details</h2>
                <div className="detailsContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Car Id</th>
                                <th>Car Model</th>
                                <th>Car No</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultantData.map((data,index)=>{
                                return (
                                    <tr key={index.toString()}>
                                        <td>{data.carId}</td>
                                        <td>{data.carModel}</td>
                                        <td>{data.carNo}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                ) 
                            })}
                        </tbody>    
                    </table>
                </div>
            </div>
            
        </div>
    )
}
export default CardDetails;