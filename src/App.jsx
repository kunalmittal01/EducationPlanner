import { useState,useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Subject from './Subject';
import './App.css'

function App() {
  const [subArr, setSubArr] = useState(() => {
    const storedData = localStorage.getItem('planner');
    try {
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return [];
    }
  });
  let [sub, setSub] = useState('');
  let [hours, setHours] = useState('');
  let [err, setErr] = useState(false);
  const darkRef = useRef(null);
  let [mode,setMode] = useState(false);
  let [anim, setAnimation] = useState('off');

  useEffect(()=>{
    if(localStorage.getItem('mode') == 'dark') {
      setMode(true);
      document.body.classList.add('dark');
    }
  })
  const getSubject = (e)=>{
    setSub(e.target.value);
  }

  const getHours = (e)=>{
    setHours(e.target.value);
  }

  const handleClick = (e)=> {
    const obj = {};
    if(sub && hours) {
        const obj = {};
        obj.hours = hours;
        obj.subject = sub;
        const updatedSubArr = [...subArr,obj]
        setSubArr(updatedSubArr); 
        localStorage.setItem('planner',JSON.stringify(updatedSubArr));
        e.target.parentElement.children[0].value = '';
        e.target.parentElement.children[1].value = '';
        
        setSub('');
        setHours('');
        setErr(false);
    } 
    else {
        setErr(true);
    }
  }

  const handleDelete = (id)=> {
    const updatedSubArray = subArr.filter((item,idx)=>{
      return (id != idx);
    });
    setSubArr(updatedSubArray);  
    localStorage.setItem('planner', updatedSubArray);
  }

  const changeMode = ()=>{
    if(!mode) {
      setMode(true);
      document.body.classList.add('dark');
      localStorage.setItem('mode', 'dark');
    }
    else {
      setMode(false);
      document.body.classList.remove('dark');
      localStorage.setItem('mode', 'light');
    }
    setAnimation('on');
      setTimeout(()=> {
         setAnimation('off')
      },2000);
  }

  return (
    <>
    {(anim == 'on')?<div className="flex h-screen w-screen justify-center items-center"><img className="h-full w-full" src="https://i.pinimg.com/originals/ff/e1/bb/ffe1bb70f9393f0c115df6a33773f937.gif" alt="" /></div>:
    <div className="planner flex flex-col items-center mt-7 w-full gap-5">
      <div onClick={changeMode} className="darkmode pl-1 w-20 hover:cursor-pointer h-8 rounded-2xl border flex items-center mb-5 border-black">
        <span ref={darkRef} className="ease duration-500 h-7 w-7 rounded-full bg-black"></span>
      </div>
      <h1 className="text-4xl text-black"> Education Planner</h1>
      <div className="input-container w-2/3 flex flex-col gap-4">
        <input onChange={getSubject} className="border border-gray-200 py-2 px-4 md:py-3" type="text" placeholder="subject"/>
        <input onChange={getHours} className="border border-gray-200 py-2 px-4 md:py-3" type="number" min={0} placeholder="Hours"/>
        <button onClick={handleClick} className="ease duration-300 bg-purple-500 text-gray-300 py-2 font-medium px-4 rounded-md hover:bg-blue-400 hover:text-white md:py-3">Add</button>
      </div>
      <div className="subject-cont border border-gray-200 rounded p-5 mt-8 w-2/3 flex flex-col gap-5">
          {err?(<p className="w-full flex gap-3 text-red-700 font-bold text-xl items-center md:text-2xl"><span>Error: Enter both fields.</span></p>):""}
          {      
            subArr.map((entry,idx)=>{
            if(entry.subject == undefined || entry.hours == undefined) {
              return (
                <p key={idx} className="w-full flex gap-3 text-red-700 font-bold text-xl items-center md:text-2xl"><span>Error: Enter both fields.</span><span className="text-white hover:cursor-pointer text-red-200" onClick={(e)=>{e.target.parentElement.style.display="none"}}>X</span></p>
              )
            }
              return <Subject delete={handleDelete} id={idx} key={`${entry.subject}-${idx}`} subject={entry.subject} hours={entry.hours}/>
            }) 
          }
      </div>
    </div>}
    </>
  )
}

export default App;
