import React from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { countries } from "../Constants/Country";
import FormModel from './FormModel'

function Form() {
   
    
    const { forms,handleChange,handleSubmit,formError,modelSection } = useGlobalContext();
    const navigate = useNavigate()
    if(modelSection){
        navigate('/quiz')
    }
    return (
        <div className="form">
            <div className="form-title">Registration</div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="forms">
                        <div className="input-box">
                            <div className="form-sub">
                                <span className="form-detials">First Name</span>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    value={forms.firstname}
                                    onChange={handleChange}
                                    placeholder="Enter Your Name"
                                />
                            </div>
                        </div>
                            <p className="form-error">{formError.firstname}</p>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Last Name</span>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    value={forms.lastname}
                                    onChange={handleChange}
                                    placeholder="Enter Your Name"
                                />
                            </div>
                        </div>
                        <p className="form-error">{formError.lastname}</p>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Type</span>
                            </div>
                            <div>
                                <select name="type" id="type" value={forms.type} onChange={handleChange}>
                                    <option value="employee">Employee </option>
                                    <option value="student">Student</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Organization</span>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="organization"
                                    id="organization"
                                    value={forms.organization}
                                    onChange={handleChange}
                                    placeholder="Institution/Organization"
                                />
                            </div>
                        </div>
                        <p className="form-error">{formError.organization}</p>
                    </div>
                    <div>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Langauge Preference</span>
                            </div>
                            <div>
                                <select name="language" id="language" value={forms.language} onChange={handleChange}>
                                    <option value="English">English </option>
                                    <option value="Arabic">Arabic</option>
                                    <option value="French">French</option>
                                    <option value="Germen">Germen</option>
                                    <option value="Latin">Latin</option>
                                    <option value="Portuguese">Portuguese</option>
                                    <option value="Russian">Russian</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Malayalam">Malayalam</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Age</span>
                            </div>
                            <div>
                                <input type="number" name="age" id="age" min={10} value={forms.age} onChange={handleChange} placeholder="Age" />
                            </div>
                        </div>
                        <p className="form-error">{formError.age}</p>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Email</span>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={forms.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <p className="form-error">{formError.email}</p>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Phone</span>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={forms.phone}
                                    onChange={handleChange}
                                    placeholder="+91 9000000000"
                                />
                            </div>
                        </div>
                        <p className="form-error">{formError.phone}</p>
                    </div>
                    <div>
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Country</span>
                            </div>
                            <div>
                                <select name="country" id="country" value={forms.country} onChange={handleChange}>
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
                        <div className="input-box">
                            <div>
                                <span className="form-detials">Address</span>
                            </div>
                            <div>
                                <textarea name="address" id="address" value={forms.address} onChange={handleChange} cols="" rows=""></textarea>
                            </div>
                        </div>
                        <p className="form-error">{formError.address}</p>
                        <div className="gender-detilas">
                            <input type="radio" name="gender" value='male' checked={forms.gender === 'male'} onChange={handleChange} id="dot-1"  />
                            <input type="radio" name="gender" value='female' checked={forms.gender === 'female'} onChange={handleChange} id="dot-2" />
                            <input type="radio" name="gender" value='others' checked={forms.gender === 'others'} onChange={handleChange} id="dot-3" />
                            <span className="gender-title">Gender</span>
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
                                    <span className="gender">Otheres</span>
                                </label>
                            </div>
                        </div>
                        <p className="form-error">{formError.gender}</p>
                    </div>
                </div>
                <div className="submit-control">
                    <div className="form-submit">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
            <FormModel/>
        </div>
    );
}

export default Form;
