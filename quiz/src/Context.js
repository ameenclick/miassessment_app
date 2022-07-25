import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const url = " http://ec2-3-111-37-72.ap-south-1.compute.amazonaws.com/api/quiz/english/junior";
const urlEnd = "http://ec2-3-111-37-72.ap-south-1.compute.amazonaws.com/api/validate";


const AppProvider = ({ children }) => {
    /*Home*/
   /* const navigate =useNavigate()*/
    const [code, setCode] = useState("");
    const [nextSection,setNextSection] = useState(false)

    /*Quiz*/
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [answer,setAnswer] = useState('')
    const [error, setError] = useState(false);
    const [answers,setAnswers] = useState([])
    const [isModel,setIsModel] = useState(false)
    const [isActive,setIsActive] = useState(false)
    const [finalSection,setFinalSection] = useState(false)
    
    var    options = {
        id:'',
        choice:''
    }
   
  

    /*Form*/
    const [forms, setForms] = useState({
        firstname: "",
        lastname: "",
        type: "Employee",
        organization: "",
        language: "English",
        age: "",
        email: "",
        phone: "",
        country: "India",
        address: "",
        gender: "",
    });
    const [formError,setFormError] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [modelSection,setModelSection] = useState(false)
    

    /* Home*/
    const fetchValid = async (url_1) => {
        const headers = {
            "Content-Type": "application.json",
            token:
                "029f46cd2eee78a34d42eee79d44723dbcfb4d2f27956fc97d1920db7ac3644b39345f5c92007eeeabf0ecbeab506b36e9e2b4671dfefd8b874827479a9781e5",
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEFVTFNJUiIsImlhdCI6MTY0OTY0NjgyNX0.BEx1Xz-yEl-0jWzQY0ROvCTL07C7XqHLitJPpupsup0",
        };

        const response = await axios(url_1, { headers }).catch(() => setError(true));
        
        if (response) {
            setNextSection(true)
            /*navigate("/registration");*/
        }
    };

    const codeChange = (e) =>{
        setCode(e.target.value)
        
    }
    const codeSubmit = async (e) => {
        e.preventDefault();
        const url_1 = `${urlEnd}/${code}`;
        fetchValid(url_1);
       /* setCode("");*/
    };



    /*quiz*/
    const fetchQuestions = async (url) => {
        const headers = {
            "Content-Type": "application.json",

            token:
                "029f46cd2eee78a34d42eee79d44723dbcfb4d2f27956fc97d1920db7ac3644b39345f5c92007eeeabf0ecbeab506b36e9e2b4671dfefd8b874827479a9781e5",
            authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEFVTFNJUiIsImlhdCI6MTY0OTY0NjgyNX0.BEx1Xz-yEl-0jWzQY0ROvCTL07C7XqHLitJPpupsup0",
        };
        const response = await axios(url, { headers }).catch((err) => console.log(err));

        const data = response.data;
        setQuestions(data);
    };

    const nextQuestion = () => {
        
       
        const savedOptions = localStorage.getItem('answers')
       
        const savedDetials = savedOptions ? JSON.parse(savedOptions):[]
        localStorage.setItem('answers',JSON.stringify([...savedDetials,options]) );
        
        
        setAnswers((prev)=>[...prev,options.choice])
        
        setIsActive(false)
        setAnswer('')
        setIndex((oldIndex) => {
            
            const index = oldIndex + 1;
            if (index > questions.length - 1) {
               openModel()
                
                return questions.length-1;
                
            } else {
                return index;
            } 
            
        });
    };

    const previousQuestion = () => {
        
        setIndex((oldIndex) => {
            const index = oldIndex - 1;
            if (index < 0) {
                return 0;
            } else {
                return index;
            }
        });
    };

  
    const ansrSub1 = (e) =>{
    
        options.choice =e.target.value
        options.id =index+1
        console.log(options);
        
       
        
       
        
    }
    const ansrSub2 =() =>{
       
    }
    const ansrSub3 =() =>{
        
    }
    const openModel=() =>{
       
        setIsModel(true)
    }

    const closeModel = () =>{
        setIsModel(false)
    }

    const submitAnswer =async ()=>{
        
        var data = JSON.stringify({
          "userCode": code,
          "userResponse":[
            {
                "No": "1",
                "Choice": answers[1]
              },
              {
                "No": "2",
                "Choice": answers[2]
              },
              {
                "No": "3",
                "Choice": answers[3]
              },
              {
                "No": "4",
                "Choice": answers[4]
              },
              {
                "No": "5",
                "Choice": answers[5]
              },
              {
                "No": "6",
                "Choice": answers[6]
              },
              {
                "No": "7",
                "Choice": answers[7]
              },
              {
                "No": "8",
                "Choice": answers[8]
              },
              {
                "No": "9",
                "Choice": answers[9]
              },
              {
                "No": "10",
                "Choice": answers[10]
              },
              {
                "No": "11",
                "Choice": answers[11]
              },
              {
                "No": "12",
                "Choice": answers[12]
              },
              {
                "No": "13",
                "Choice": answers[13]
              },
              {
                "No": "14",
                "Choice": answers[14]
              },
              {
                "No": "15",
                "Choice": answers[15]
              },
              {
                "No": "16",
                "Choice": answers[16]
              },
              {
                "No": "17",
                "Choice": answers[17]
              },
              {
                "No": "18",
                "Choice": answers[18]
              },
              {
                "No": "19",
                "Choice": answers[18]
              },
              {
                "No": "20",
                "Choice": answers[19]
              },
              {
                "No": "21",
                "Choice": answers[20]
              },
              {
                "No": "22",
                "Choice": answers[21]
              },
              {
                "No": "23",
                "Choice": answers[22]
              },
              {
                "No": "24",
                "Choice": answers[23]
              },
              {
                "No": "25",
                "Choice": answers[24]
              },
              {
                "No": "26",
                "Choice": answers[25]
              },
              {
                "No": "27",
                "Choice": answers[26]
              },
              {
                "No": "28",
                "Choice": answers[27]
              },
              {
                "No": "29",
                "Choice": answers[28]
              },
              {
                "No": "30",
                "Choice": answers[29]
              },
              {
                "No": "31",
                "Choice": answers[30]
              },
              {
                "No": "32",
                "Choice": answers[31]
              },
              {
                "No": "33",
                "Choice": answers[32]
              },
              {
                "No": "34",
                "Choice": answers[33]
              },
              {
                "No": "35",
                "Choice":answers[34]
              },
              {
                "No": "36",
                "Choice": answers[35]
              },
              {
                "No": "37",
                "Choice":answers[36]
              },
              {
                "No": "38",
                "Choice": answers[37]
              },
              {
                "No": "39",
                "Choice": answers[38]
              },
              {
                "No": "40",
                "Choice": answers[39]
              },
              {
                "No": "41",
                "Choice": answers[40]
              },
              {
                "No": "42",
                "Choice":answers[41]
              },
              {
                "No": "43",
                "Choice": answers[42]
              },
              {
                "No": "44",
                "Choice": answers[43]
              },
              {
                "No": "45",
                "Choice": answers[44]
              },
              {
                "No": "46",
                "Choice": answers[45]
              },
              {
                "No": "47",
                "Choice": answers[46]
              },
              {
                "No": "48",
                "Choice":answers[47]
              },
              {
                "No": "49",
                "Choice": answers[48]
              },
              {
                "No": "50",
                "Choice": answers[49]
              },
              {
                "No": "51",
                "Choice": answers[50]
              },
              {
                "No": "52",
                "Choice": answers[51]
              },
              {
                "No": "53",
                "Choice": answers[52]
              },
              {
                "No": "54",
                "Choice": answers[53]
              },
              {
                "No": "55",
                "Choice": answers[54]
              },
              {
                "No": "56",
                "Choice": answers[55]
              },
              {
                "No": "57",
                "Choice": answers[56]
              },
              {
                "No": "58",
                "Choice": answers[57]
              },
              {
                "No": "59",
                "Choice": answers[58]
              },
              {
                "No": "60",
                "Choice": answers[59]
              },
              {
                "No": "61",
                "Choice": answers[60]
              },
              {
                "No": "62",
                "Choice": answers[61]
              },
              {
                "No": "63",
                "Choice":answers[62]
              },
              {
                "No": "64",
                "Choice":answers[63]
              },
              {
                "No": "65",
                "Choice": answers[64]
              },
              {
                "No": "66",
                "Choice": answers[65]
              },
              {
                "No": "67",
                "Choice": answers[66]
              },
              {
                "No": "68",
                "Choice": answers[67]
              },
              {
                "No": "69",
                "Choice": answers[68]
              },
              {
                "No": "70",
                "Choice": answers[69]
              },
              {
                "No": "71",
                "Choice": answers[70]
              },
              {
                "No": "72",
                "Choice": answers[71]
              },
              {
                "No": "73",
                "Choice": answers[72]
              },
              {
                "No": "74",
                "Choice": answers[73]
              },
              {
                "No": "75",
                "Choice": answers[74]
              },
              {
                "No": "76",
                "Choice": answers[75]
              },
              {
                "No": "77",
                "Choice": answers[76]
              },
              {
                "No": "78",
                "Choice": answers[77]
              },
              {
                "No": "79",
                "Choice": answers[78]
              },
              {
                "No": "80",
                "Choice": answers[79]
              },
              {
                "No": "81",
                "Choice": answers[80]
              },
              {
                "No": "82",
                "Choice": answers[81]
              },
              {
                "No": "83",
                "Choice": answers[82]
              },
              {
                "No": "84",
                "Choice": answers[83]
              },
              {
                "No": "85",
                "Choice": answers[84]
              },
              {
                "No": "86",
                "Choice": answers[85]
              },
              {
                "No": "87",
                "Choice": answers[86]
              },
              {
                "No": "88",
                "Choice": answers[87]
              },
              {
                "No": "89",
                "Choice": answers[88]
              },
              {
                "No": "90",
                "Choice": answers[89]
              },
              {
                "No": "91",
                "Choice": answers[90]
              },
              {
                "No": "92",
                "Choice": answers[91]
              },
              {
                "No": "93",
                "Choice": answers[92]
              },
              {
                "No": "94",
                "Choice": answers[93]
              },
              {
                "No": "95",
                "Choice": answers[94]
              },
              {
                "No": "96",
                "Choice": answers[95]
              },
              {
                "No": "97",
                "Choice": answers[96]
              },
              {
                "No": "98",
                "Choice": answers[97]
              },
              {
                "No": "99",
                "Choice": answers[98]
              },
              {
                "No": "100",
                "Choice": answers[99]
              },
              {
                "No": "101",
                "Choice": answers[100]
              },
              {
                "No": "102",
                "Choice": answers[101]
              },
              {
                "No": "103",
                "Choice": answers[102]
              },
              {
                "No": "104",
                "Choice": answers[103]
              },
              {
                "No": "105",
                "Choice": answers[104]
              },
              {
                "No": "106",
                "Choice": answers[105]
              },
              {
                "No": "107",
                "Choice": answers[106]
              },
              {
                "No": "108",
                "Choice": answers[107]
              }
            
          ]
        });
        
        var config = {
          method: 'post',
          url: 'http://ec2-3-111-37-72.ap-south-1.compute.amazonaws.com/api/quiz/process/',
          headers: { 
            'token': '029f46cd2eee78a34d42eee79d44723dbcfb4d2f27956fc97d1920db7ac3644b39345f5c92007eeeabf0ecbeab506b36e9e2b4671dfefd8b874827479a9781e5', 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEFVTFNJUiIsImlhdCI6MTY1MjMxOTA0NX0.6_6o3jElsNrIqgOrhwQQePj7mM8j3y8Dg74KwU0f-MU', 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        
    }
    const uploadAnswer = (e) => {
            e.preventDefault()
            submitAnswer()
            console.log(answers);
            setFinalSection(true)
    }
  

    useEffect(() => {
        fetchQuestions(url);
    }, []);




    /*form*/
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setForms({ ...forms, [name]: value });
    };

    const postForm = () =>{
        var detials = JSON.stringify({
            "userCode": code,
            "name": forms.firstname + forms.lastname,
            "type": forms.type,
            "organisation": forms.organization,
            "level": "12th Standard",
            "age": forms.age,
            "gender": forms.gender,
            "languagePreference": forms.language,
            "address": forms.address,
            "email": forms.email,
            "phone": forms.phone,
            "country": forms.country
          });
          
          var config = {
            method: 'post',
            url: 'http://ec2-3-111-37-72.ap-south-1.compute.amazonaws.com/api/insert/user/details',
            headers: { 
              'token': '029f46cd2eee78a34d42eee79d44723dbcfb4d2f27956fc97d1920db7ac3644b39345f5c92007eeeabf0ecbeab506b36e9e2b4671dfefd8b874827479a9781e5', 
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEFVTFNJUiIsImlhdCI6MTY1MjMxOTA0NX0.6_6o3jElsNrIqgOrhwQQePj7mM8j3y8Dg74KwU0f-MU', 
              'Content-Type': 'application/json'
            },
            data : detials
          };
          
          const res = axios(config).catch((err) => console.log(err))
         console.log(res.data);
         setModelSection(true)
    }

    



    const handleSubmit = async (e) => {
        e.preventDefault();
       /* setFormError(formValidate(forms))*/
       postForm()
      /* */
  
        /*console.log(code,firstname,lastname,type,organization,language,age,email,phone,country,address,gender);*/
       /* if(isSubmit){
            
            postForm()
            setIsSubmit(false)
            setNextSection(true)
            
        }*/
       
    };

    /*Form validation*/
    const formValidate = (values)=>{
        const errors = {}
        const regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const phoneRegex = /^\d{10}$/
        const textRegex =/^[A-Za-z]+$/

        if(!values.firstname ){
            errors.firstname = 'firstname is required!'
            setIsSubmit(false)
        }else if(!textRegex.test(values.firstname)){
            errors.firstname = 'this is required only alphabet'
            setIsSubmit(false)
        }
        else if(!values.lastname){
            errors.lastname = 'lastname is required!'
            setIsSubmit(false)
        }else if(!textRegex.test(values.lastname)){
            errors.lastname = 'this is required only alphabet'
            setIsSubmit(false)
        }
        else if(!values.organization){
            errors.organization='organization is required'
            setIsSubmit(false)
        }
        else if(!values.age){
            errors.age='age is required'
            setIsSubmit(false)
        }
        else if(!values.email){
            errors.email='email is required'
            setIsSubmit(false)
        }else if(!regex.test(values.email)){
            errors.email ='this is not valid email'
            setIsSubmit(false)
        }
        else if(!values.phone){
            errors.phone='phone number is required'
           setIsSubmit(false)
        }else if(!phoneRegex.test(values.phone)){
            errors.phone = 'enter valid phone number'
            setIsSubmit(false)
        }
        else if(!values.address){
            errors.address='address is required'
            setIsSubmit(false)
        }
        else if(!values.gender){
            errors.gender='choose your gender'
            setIsSubmit(false)
        }
        else{
            setIsSubmit(true)
        }
        return errors
        
    }

   /* useEffect(()=>{
        console.log(formError);
        if(Object.keys(formError).length===0 && isSubmit){
            console.log(forms);
        }
    },[formError])*/

    /*Final*/

    const finalReport = async() =>{
      const headers = {
        "Content-Type": "application.json",

        token:
            "029f46cd2eee78a34d42eee79d44723dbcfb4d2f27956fc97d1920db7ac3644b39345f5c92007eeeabf0ecbeab506b36e9e2b4671dfefd8b874827479a9781e5",
        authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUEFVTFNJUiIsImlhdCI6MTY0OTY0NjgyNX0.BEx1Xz-yEl-0jWzQY0ROvCTL07C7XqHLitJPpupsup0",
    };
    const response = await axios( ' http://ec2-3-111-37-72.ap-south-1.compute.amazonaws.com/api/report/MIU141044', { headers }).catch((err) => console.log(err));
    const report = response.data
    console.log(report);
    }

    return (
        <AppContext.Provider
            value={{ code,setCode,setError,codeChange,codeSubmit,nextSection, questions, index, error, nextQuestion, previousQuestion,answer,ansrSub1,ansrSub2,ansrSub3,isModel,isActive,uploadAnswer,closeModel,finalSection,  forms, handleChange, handleSubmit,formError,modelSection, finalReport }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider }
