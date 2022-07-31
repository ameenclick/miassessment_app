import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();


const AppProvider = ({ children }) => {
    /*Home*/
    const host = process.env.REACT_APP_AWS_HOST
    const [code, setCode] = useState("");
    const [nextSection,setNextSection] = useState(false)
    const questionsUrl = `${host}api/quiz/english/`;

    /*Quiz*/
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState("");
    const [error, setError] = useState(false);
    const [answers,setAnswers] = useState([])
    const [isActive,setIsActive] = useState("")
    const [finalSection,setFinalSection] = useState(false)
    const [done, setDone] = useState(false)
    const [verified, setVerfied] = useState(false);
    const [options, setOptions] = useState({
      id:'',
      choice:''
  })
   
  
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
    });

    useEffect(() => {
      //localStorage.clear();
      if(localStorage.getItem("user") != null)  setForms(JSON.parse(localStorage.getItem("user")))
      setCode(localStorage.getItem("userCode")!=null?localStorage.getItem("userCode"):"")
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

    useEffect(() => {
        if(forms.age)
        {
          if(forms.age < 13)
          {
              //console.log("Junior",forms.age)
              fetchQuestions(questionsUrl+"junior");
          }
          else
          {
              //console.log("Senior",forms.age)
              fetchQuestions(questionsUrl+"senior");
          }
        }
    }, [forms])

    const [modelSection,setModelSection] = useState(false)
    
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
          if (response.data === "Valid") {
              setNextSection(true)
          }
          else if(response.data === "Done") {
          //When a completed user try again will directed to report page
              setDone(true);
          }
          else if(response.data === "Registered"){
            //Help avoid registeration
            setVerfied(true)
            setNextSection(true)
          }
          else{
            setError(true)
          }
        } catch(error){
          setError(true)
          console.log(error.response.data)
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
        if(index === answers.length-1)
        {
          const savedOptions = localStorage.getItem('answers')
          var savedDetials = savedOptions ? JSON.parse(savedOptions):[]
          savedDetials[index]=options
          localStorage.setItem('answers',JSON.stringify([...savedDetials]) );
          var temp=[...answers,]
          temp[index]=options.choice;
          setAnswers(temp)
        }
        else
        {
          const savedOptions = localStorage.getItem('answers')
          const savedDetials = savedOptions ? JSON.parse(savedOptions):[]
          localStorage.setItem('answers',JSON.stringify([...savedDetials,options]) );   
          setAnswers((prev)=>[...prev,options.choice])
        }
        if(index !== questions.length-1) setIsActive("")
        console.log(index,answers.length)
        setIndex((oldIndex) => {
          const index = oldIndex + 1;
          if (index > questions.length - 1) {            
              return questions.length-1;        
          } else {
              return index;
          }  
      });
    };

    useEffect(() => {
       if(answers.length>0) localStorage.setItem('choice',JSON.stringify(answers))
     }, [answers])

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

    const submitAnswer =async (e)=>{
        e.preventDefault()
        console.log(answers.length)
        await nextQuestion();
        console.log(answers.length)
        const userResponse = []
        for( var i = 0 ; i < answers.length; i++ )
        {
            userResponse.push({"No": i+1, "Choice": answers[i]})
        }
        console.log(userResponse.length)
        var data = JSON.stringify({ "userCode":code,
                "userResponse": userResponse})
        const headers= { 
            'token': process.env.REACT_APP_TOKEN, 
            'Content-Type': 'application/json'
          };
        
        axios.post(`${host}api/quiz/process/`,data, {headers: headers})
        .then(function (response) {
          console.log(response.data);
          setFinalSection(true)
          localStorage.clear();
        })
        .catch(function (error) {
          console.log(error.response);
        });
        
    }

    /*form*/
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForms({ ...forms, [name]: value });
    };

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const postForm = async () =>{
        var details = JSON.stringify({
            "userCode": code,
            "name": `${await capitalizeFirstLetter(forms.firstname)} ${await capitalizeFirstLetter(forms.lastname)}`,
            "type": forms.type,
            "organisation": capitalizeFirstLetter(forms.organization),
            "level": forms.level,
            "age": forms.age,
            "gender": forms.gender,
            "languagePreference": forms.language,
            "address": capitalizeFirstLetter(forms.address),
            "email": forms.email,
            "phone": forms.phone,
            "country": forms.country
          });
          var  url= `${host}api/insert/user/details`
          var  headers= { 
              'token': process.env.REACT_APP_TOKEN, 
              'Content-Type': 'application/json'
            }
          
          try{
            const res = await axios.post(url, details,{ headers: headers})
            console.log(res.data);
            setModelSection(true)
          } catch(error){
            console.log(error.response)
          }
    }

    



    const handleSubmit = () => {
       postForm()

    };

    return (
        <AppContext.Provider
            value={{ code,setCode,setError,codeSubmit,nextSection, questions, index, error, nextQuestion, previousQuestion,ansrSub1,isActive,submitAnswer,finalSection,  forms, handleChange, handleSubmit,modelSection, host,done,verified, setVerfied,answers }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider }
