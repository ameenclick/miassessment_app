import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { countries } from "../Constants/Country";
import { GrRevert } from "react-icons/gr";
import axios from "axios";

function Form() {  
    const { forms,code,handleChange,handleSubmit,verified, setVerfied,host, page, setPage } = useGlobalContext();
    const navigate = useNavigate()
    const [genCode, setNewCode]= useState(undefined);
    const [verification, setCheckverification] = useState("");
    const [message, setMessage] = useState("")
    const [countrycode, setCountryCode]=useState([])

    useEffect(() => {
         //If no code then go back to home
        if(code === ""){
          setPage({}); // Navigatin
        }
        //API to access the contry codes for telephone number
        axios.get("https://miassessment.s3.ap-south-1.amazonaws.com/static/allcontrytel.json")
        .then((res)=>{
            setCountryCode(res.data)
        })
      },[])

    //Navigate when page state changes
    useEffect(() => {
        if(page.quiz && localStorage.getItem('user')!= null)
        {
            navigate("/quiz");
        }
        else if(!page)
        {
            navigate("/");
        }
    }, [page])

    //Checking the verification code to proceed when ever value changes
    useEffect(async () => {
        if(Number(verification) === genCode)
        {
            console.log("Email Verified")
            setVerfied(true)
            await handleSubmit(); // Register the user details
        }
        else if(verification.length === 4)  verificationFailed();
    },[verification])

    //Making API call to create and send a otp to verfy email
    async function EmailVerification(email, userName){
        try{
        const response = await axios.post(host+"api/verify/user", {email: email, name: userName}, { headers :{
            token: process.env.REACT_APP_TOKEN
        }});
        if(response.status === 200) return response.data.verificationCode
        else{
            setMessage("Something went wrong ,Try gain...");
            //setVerfied(false);
        }
        }
        catch(err){
            alert(err.message)
            return false
        }
    }

    //Verifying email based on user input otp recived with server created
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
            if(navigator.onLine)
            {
                setPage({"quiz" :true })
            }
            else
            {
                alert("Check your internet connection!..")
            }
        }  

    }

    //Funtion to make failed changes in UI if wrong OTP is entered
    const verificationFailed = () => {
        if(!forms.gender){
            alert("Choose a gender");
            return
        }
        setMessage("Incorrect code ,Try gain...");
        //setVerfied(false);
        alert("Verification failed...");
        return
    }
    
    return (
        <div className="container px-5">
            { !genCode ?
                <form onSubmit={verifyEmail}>
                <h2 className="form-title">Registration</h2>
                <div className="row">
                    <div className="col-lg-4 p-2">
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
                    </div>
                    <div className="col-lg-4 p-2">
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
                    </div>
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Type</label><span className="text-danger">*</span>
                        <select className="form-select" name="type" id="type" defaultValue={forms.type} onChange={handleChange}>
                            <option value="student">Student</option>
                            <option value="employee">Employee </option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-2">
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
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Designation/Class/Course</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="level"
                            id="level"
                            value={forms.level}
                            onChange={handleChange}
                            placeholder="Designation/Class/Grade/Major"
                        required/>
                    </div>
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Age</label><span className="text-danger">*</span>
                        <input className="form-control" type="number" name="age" id="age" min={10} value={forms.age} onChange={handleChange} placeholder="Age" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Email</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            value={forms.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                            title="Follow pattern: username@mailer.com, You will recive report in email."
                            required/>
                    </div>
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Phone</label><span className="text-danger">*</span>
                        <input
                            className="form-control"
                            type="text"
                            name="phone"
                            id="phone"
                            value={forms.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            title="+91 9000000000"
                            required/>
                    </div>
                    <div className="col-lg-4 p-2">
                    <label className="form-detials">Whats App</label><span className="text-danger">*</span>
                        <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{forms.countrycode}</button>
                        <ul className="dropdown-menu country-menu">
                            {
                                Object.keys(countrycode).map((country,i) => 
                                    <li key={i}><button type="button" className="dropdown-item" href="#country" name="countrycode" onClick={handleChange} value={countrycode[country].split("-")[1]}>{country} - <span className='text-black-50'>{countrycode[country].split("-")[1]}</span></button></li>
                                )
                            }
                        </ul>
                        <input
                            className="form-control"
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            value={forms.whatsapp}
                            onChange={handleChange}
                            placeholder="Whats App Number"
                            title="+91 9000000000"
                            required/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Country</label><span className="text-danger">*</span>
                        <select className="form-select" name="country" id="country" defaultValue={forms.country} onChange={handleChange} required>
                                {countries.map((item) => {
                                    return (
                                        <option value={item.country} key={item.country}>
                                            {item.country}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Assessment Langauge</label><span className="text-danger">*</span>
                        <select className="form-select" name="language" id="language" defaultValue={forms.language} onChange={handleChange} required>
                            <option value={""}>Choose a language</option>
                            <option value="english">English</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="malayalam">Kannada</option>
                            <option value="malayalam">Arabic</option>
                        </select>
                        <div className="gender-detilas my-2">
                            <input className="form-control" type="radio" name="gender" value='male' checked={forms.gender === 'male'} onChange={handleChange} title="Choose Gender" id="dot-1" required/>
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
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Address</label><span className="text-danger">*</span>
                        <textarea className="form-control" name="address" id="address" onChange={handleChange} defaultValue={forms.address} placeholder="Enter Address"  rows="3" required></textarea>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">
                            Current Courses &nbsp;
                        </label><span className="text-danger">*</span>
                        <input className="form-control" name="course_studing" id="studing" 
                        onChange={handleChange} defaultValue={forms.course_studing} 
                        placeholder="Eg: Phyiscs,Chemistry,Maths,Engineering" 
                        title="If you have opted many subjects, please mention a few of them. 
                        If you are a student now write the Subject(s) in the present class/course.
                        If you have completed your studies write the Subject(s) in the last class/course  of your study"
                        required/>
                        <p style={{fontSize: 12}}>Tell us about your current study or the last course you have completed.</p>
                    </div>
                    <div className="col-lg-4 p-2">
                        <label className="form-detials">Aspired Courses</label><span className="text-danger">*</span>
                        <input className="form-control" 
                                name="course_aspiration" id="studing" 
                                onChange={handleChange} defaultValue={forms.course_aspiration} 
                                placeholder="Fill your aspiration" 
                                title="Write the name of the courses or careers which you would like to take in the future (This will help us to provide you with the right information about your dream course/career)"
                                required/>
                        <p style={{fontSize: 12}}>Tell us about your future plans of studies / career.</p>
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
                        <div className="card m-5 p-2 justify-content-center w3-animate-right">
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
                                        <input 
                                            className="form-control form-control-lg" 
                                            type="number" 
                                            onChange={(e) => setCheckverification(e.target.value)} 
                                            value={verification}  
                                            pattern="\d{4}"
                                            maxLength="4" required/>
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
