import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { countries } from "../Constants/Country";
import { GrRevert } from "react-icons/gr";
import axios from "axios";

function Form() {  
    const { forms,code,handleChange,handleSubmit,verified, setVerfied,host } = useGlobalContext();
    const navigate = useNavigate()
    const [genCode, setNewCode]= useState(undefined);
    const [verification, setCheckverification] = useState("");
    const [message, setMessage] = useState("")

    useEffect(() => {
         //If no code then go back to home
         //console.log(verified)
        if(code === ""){
          navigate("/");
        }
      },[])

    useEffect(() => {
        //console.log(localStorage.getItem('user'))
        if(localStorage.getItem('user')!= null && verified)
        {
            console.log("Cached")
            navigate("/quiz");
        }
    }, [verified])

    useEffect(() => {
        if(Number(verification) === genCode)
        {
            console.log("Email Verified")
            setVerfied(true)
            handleSubmit();
            navigate("/quiz");
        }
        else if(verification.length === 4)  verificationFailed();
    },[verification])

    async function EmailVerification(email, userName){
        const response = await axios.post(host, {email: email, name: userName}, { headers :{
            token: process.env.REACT_APP_TOKEN
        }}).catch((err) => { console.error(err);   });
        return response.data.verificationCode
    }

    const verifyEmail = async (e) => {
        e.preventDefault();
        localStorage.setItem("user",JSON.stringify(forms));
        if(!verified)
        {
            const verificationCode = await EmailVerification(forms.email,forms.firstname)
            if(verificationCode) setNewCode(verificationCode)
            else verificationFailed()
        }
        else
        {
            console.log(verified)
            navigate("/quiz");
        }  
    }

    const verificationFailed = () => {
        setMessage("Incorrect code ,Try gain...");
        setVerfied(false);
        alert("Verification failed...");
        return
    }
    return (
        <div className="container p-5">
            { !genCode ?
                <form onSubmit={verifyEmail}>
                <h2 className="form-title">Registration</h2>
                <div className="row">
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">First Name</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={forms.firstname}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            required/>
                        {/* <p className="form-error">{formError.firstname}</p> */}
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Last Name</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={forms.lastname}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            required/>
                        {/* <p className="form-error">{formError.lastname}</p> */}
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Type</label><span className="text-danger">*</span>
                        <select className="form-control" name="type" id="type" value={forms.type} onChange={handleChange}>
                            <option value="student">Student</option>
                            <option value="employee">Employee </option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Organization</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="organization"
                            id="organization"
                            value={forms.organization}
                            onChange={handleChange}
                            placeholder="Institution/Organization"
                        required/>
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Class/Designation</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="level"
                            id="level"
                            value={forms.level}
                            onChange={handleChange}
                            placeholder="Designation/Class/Grade"
                        required/>
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Age</label><span className="text-danger">*</span>
                        <input className="form-control" type="number" name="age" id="age" min={10} value={forms.age} onChange={handleChange} placeholder="Age" required/>
                        {/* <p className="form-error">{formError.age}</p> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Email</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            value={forms.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Follow pattern: username@mailer.com, You will recive report in email."
                            required/>
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Phone</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="phone"
                            id="phone"
                            value={forms.phone}
                            onChange={handleChange}
                            placeholder="+91 9000000000"
                            title="+91 9000000000"
                            required/>
                        {/* <p className="form-error">{formError.phone}</p> */}
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Country</label><span className="text-danger">*</span>
                        <select className="form-control" name="country" id="country" value={forms.country} onChange={handleChange} required>
                                {countries.map((item) => {
                                    return (
                                        <option value={item.country} key={item.country}>
                                            {item.country}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Langauge Preference</label><span className="text-danger">*</span>
                        <select className="form-control" name="language" id="language" value={forms.language} onChange={handleChange}>
                            <option value="English">English </option>
                        </select>
                    </div>
                    <div className="col-lg-4 p-3">
                        <div className="gender-detilas">
                        <input className="form-control" type="radio" name="gender" value='male' checked={forms.gender === 'male'} onChange={handleChange} id="dot-1"/>
                        <input className="form-control" type="radio" name="gender" value='female' checked={forms.gender === 'female'} onChange={handleChange} id="dot-2" />
                        <input className="form-control" type="radio" name="gender" value='others' checked={forms.gender === 'others'} onChange={handleChange} id="dot-3" />
                        <span className="gender-title">Gender</span><span className="text-danger">*</span>
                        <div className="gender-category">
                        <label htmlFor="dot-1">
                            <span className="dot one"></span>
                            <span className="gender">Male</span>
                        </label>
                        <label htmlFor="dot-2">
                            <span className="dot two"></span>
                            <span className="gender">Female</span>
                        </label>
                        <label htmlFor="dot-3">
                            <span className="dot three"></span>
                            <span className="gender">Others</span>
                        </label>
                    </div>
                    </div>
                    </div>
                    <div className="col-lg-4 p-3">
                        <label className="form-detials">Address</label><span className="text-danger">*</span>
                        <textarea className="form-control" name="address" id="address" onChange={handleChange} defaultValue={forms.address} placeholder="Enter Address"  rows="3" required></textarea>  
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col mb-5 me-5">
                        <button className="btn btn-primary float-end px-5" type="submit">Submit</button>
                    </div>
                </div>
                </form>
                :
                <form className="row justify-content-center text-center needs-validation">
                    <div className="col-lg-6 align-self-center">
                        <div className="card m-5 p-3 justify-content-center w3-animate-right">
                            <div className="card-header">
                                <h2><span onClick={() => setNewCode("")}>
                                  <GrRevert />
                                </span>  Email Verification</h2>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Enter verification code</h3>
                                <p className="card-text">Verification code is sent to your email</p>
                                <div className="row justify-content-center">
                                    <div className="col-sm-4">
                                        <input className="form-control form-control-lg" type="number" onChange={(e) => setCheckverification(e.target.value)} value={verification} maxLength="4" required/>
                                    </div>
                                    <div className="text-danger">{message}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            }
            
        </div>
        
    );
}

export default Form;