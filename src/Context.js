import axios from "axios";
import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
//import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
    /*Home*/
    const host = process.env.REACT_APP_HOST
    const [code, setCode] = useState("");
    const questionsUrl = `${host}api/quiz/`;
    /*Quiz*/
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState("");
    const [error, setError] = useState(false);
    const [answers,setAnswers] = useState([])
    const [isActive,setIsActive] = useState("")
    const [done, setDone] = useState(false)
    const [page, setPage] = useState({});
    const [verified, setVerfied] = useState(true);
    const [options, setOptions] = useState({
      id:'',
      choice:''
  })
    //Inorder to submit the quiz with debouceing and callback.(State can't access)
    const answerRef=useRef();
    const codeRef=useRef();
   
  
    /*Form*/
    const [forms, setForms] = useState({
        firstname: "",
        lastname: "",
        type: "Student",
        organization: "",
        language: "English",
        age: "",
        email: "",
        phone: "",
        country: "India",
        address: "",
        gender: "",
        level: "",
        countrycode: "+91",
        whatsapp: "",
        course_studing: "",
        course_aspiration: ""
    });

    useEffect(() => {
      //localStorage.clear();
      if(localStorage.getItem("user") != null)  setForms(JSON.parse(localStorage.getItem("user")))
      // setCode(localStorage.getItem("userCode")!=null?localStorage.getItem("userCode"):"")
      var quizResponse = localStorage.getItem('answers') != null?JSON.parse(localStorage.getItem('answers')):localStorage.getItem('answers');
      if(quizResponse != null)
      {
          var lastIndex=quizResponse.length-1
          setOptions({id: lastIndex+1,
          choice: quizResponse[lastIndex].choice})
          if(localStorage.getItem('choice') != null) setAnswers(JSON.parse(localStorage.getItem('choice')))
          setIndex(lastIndex)
          setIsActive(quizResponse[lastIndex].choice)
      }
      else
      {
        setIndex(0)
      }
  }, []);

  //Code set for reference
    useEffect(() => {
      console.log(code)
      if(code)
      {
        codeRef.current=code
      }
    }, [code])

    //Fetch the questions based on age limit when state is active
    useEffect(() => {
        console.log(page)
        if(page.quiz && forms.age)
        {
          if(forms.age < 13)
          {
              fetchQuestions(`${questionsUrl}${forms.language}/junior`);
          }
          else
          {
              fetchQuestions(`${questionsUrl}${forms.language}/senior`);
          }
        }
    }, [page])
    
    /* Home*/
    const fetchValid = async (url_1) => {
        const headers = {
            "Content-Type": "application.json",
            token:
            process.env.REACT_APP_TOKEN,
        };
        try{
          const response = await axios(url_1, { headers })
          console.log(response.data)
          if (response.data.status === "Valid") {
              setPage({"register" : true})
          }
          else if(response.data.status === "Done") {
          //When a completed user try again will directed to report page
              setDone(true);
              setPage({"final": true})
          }
          else if(response.data.status === "Registered"){
            //Help avoid registeration
            setForms(response.data.user); // Setting user data
            setPage({"quiz": true})
          }
          else{
            setError(true)
          }
        } catch(error){
          alert(error.message)
          console.log(error)
        }
    };
    const codeSubmit = async (e) => {
        e.preventDefault();
        fetchValid(`${host}api/validate/${code}`);
    };



    /*quiz*/
    const fetchQuestions = async (url) => {
        const headers = {
            "Content-Type": "application.json",
            token:
                process.env.REACT_APP_TOKEN,
        };
        try{
            const response = await axios(url, { headers })
            const data = response.data;
            setQuestions(data);
        }catch(error){
          console.log(error.message)
          alert(error.message)
        }
    };

    //Activate the option when user choose
    const ansrSub1 = (e) =>{
      setOptions({
        id: index+1,
        choice: e.target.value
      })
      setIsActive(e.target.value)
  }



  //Store the option when user moves to next
    const nextQuestion = async () => {
        if(answers.length === questions.length) return
        if(index === answers.length)
        {
          const savedOptions = localStorage.getItem('answers')
          const savedDetails = savedOptions ? JSON.parse(savedOptions):[]
          localStorage.setItem('answers',JSON.stringify([...savedDetails,options]) );   
          setAnswers((prev)=>[...prev,options.choice])
        }
        if(index !== questions.length-1) setIsActive("")
        setIndex((oldIndex) => {
          const index = oldIndex + 1;
          if (index > questions.length - 1) {            
              return questions.length-1;        
          } else {
              return index;
          }  
      });
    };

    //Updating all changes to localstorage
    useEffect(() => {
       if(answers.length>0) localStorage.setItem('choice',JSON.stringify(answers))
       answerRef.current=[...answers]
     }, [answers])

    //Changing the option with previous button
    useEffect(() => {
      if(index<answers.length)
      {
        setIsActive(answers[index])
      }
    }, [index])

    //Previous Button On Click Funtion
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

    //Update the response have manipulated in between the quiz
    useEffect(() => {
      if(index<answers.length){
          const savedOptions = localStorage.getItem('answers')
          var savedDetails = savedOptions ? JSON.parse(savedOptions):[]
          savedDetails[index]=options
          localStorage.setItem('answers',JSON.stringify([...savedDetails]) );
          var temp=[...answers,]
          temp[index]=options.choice;
          setAnswers(temp)
      }
    }, [options])

    

    //Avoid senting request again when double click
    const submitAnswer = (e)=>{
        e.preventDefault()
        const userResponse = []
        for( var i = 0 ; i < answerRef.current.length; i++ )
        {
            userResponse.push({"No": i+1, "Choice": answerRef.current[i]})
        }
        var data = JSON.stringify({ "userCode":codeRef.current,
                "userResponse": userResponse})
        const headers= { 
            'token': process.env.REACT_APP_TOKEN, 
            'Content-Type': 'application/json'
          };
          //console.log(userResponse.length)
        axios.post(`${host}api/quiz/process/`,data, {headers: headers})
        .then(function (response) {
          //console.log(response);
          if(response.status === 200 || response.status === 201)
          {
            setPage({ final: true }) //Navigate to next page
            setDone(false) // Report is generating so it's not done
          }
          else
          {
            alert(response.statusText)
          }
        })
        .catch(function (error) {
          alert("Failer server communication, "+error.message)
          console.log(error.message);
        });
        
    }

    //Limit the rate of execution of the funtion
    const debounce = (func) => {
      let timer;
      return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          func.apply(context, args);
        }, 1000);
      };
    };

    const optimizedSubmit = useCallback((...args) => {
      setDone(true); // Execute setDone(true) before debounce
      debounce(submitAnswer)(...args);
    }, []);

    /*form*/
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForms({ ...forms, [name]: value });
    };

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //User registration
    const handleSubmit = (e) =>{
        e.preventDefault();
        var details = JSON.stringify({
            "userCode": code,
            "name": `${capitalizeFirstLetter(forms.firstname)} ${capitalizeFirstLetter(forms.lastname)}`,
            "type": capitalizeFirstLetter(forms.type),
            "organisation": capitalizeFirstLetter(forms.organization),
            "level": forms.level,
            "age": forms.age,
            "gender": capitalizeFirstLetter(forms.gender),
            "languagePreference": capitalizeFirstLetter(forms.language),
            "address": capitalizeFirstLetter(forms.address),
            "email": forms.email.toLowerCase(),
            "phone": forms.phone,
            "country": capitalizeFirstLetter(forms.country),
            "whatsapp": forms.countrycode+forms.whatsapp,
            "course_studing": forms.course_studing,
            "course_aspiration": forms.course_aspiration
          });
          var  url= `${host}api/insert/user/details`
          var  headers= { 
              'token': process.env.REACT_APP_TOKEN, 
              'Content-Type': 'application/json'
            }
           
            axios.post(url, details,{ headers: headers})
            .then((response) => {
                if(response.status === 200)
                {
                  setPage({"quiz" : true});
                }
                else
                {
                  alert(response.statusText)
                  console.log(response.statusText)
                  return false
                }
              }
            )
            .catch((error) => {
            alert("Server : "+error.response.statusText)
            console.log(error.response)
            return false
            })
    }

    return (
        <AppContext.Provider
            value={{ code,setCode,setError,codeSubmit, questions, index, error, nextQuestion, previousQuestion,ansrSub1,isActive,optimizedSubmit,  forms, handleChange, handleSubmit, host,done,verified, setVerfied,answers, page, setPage }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider }
