import {useState} from 'react';

const Subject = (props)=> {
    let [hr,setHr] = useState(props.hours)
    const inc = ()=>{
        setHr(++hr);
        const planner = JSON.parse(localStorage.getItem('planner'))
        planner[props.id].hours = hr;
        localStorage.setItem('planner', JSON.stringify(planner));
    }
    const dec = ()=>{
        if(hr > 1) {
            setHr(--hr);
            const planner = JSON.parse(localStorage.getItem('planner'))
            planner[props.id].hours = hr;
            localStorage.setItem('planner', JSON.stringify(planner));
        }
    }
    // 0 1 2  3 4 5 6  ls
    // 0 1 2  4 5 6 7  b
 
    return (
        <div className="subject flex justify-around flex-col md:flex-row md:justify-between w-full bg-red-500 px-4 py-2 md:gap-5 rounded-md overflow-hidden">
            <div className="subject-wrap flex gap-5 justify-between">
                <div className="name">
                    <p className="text-2xl text-white">{props.subject}</p>
                </div>
                <div className="hours text-2xl text-white">
                    <p>{hr} hours</p>
                </div>
            </div>

            <div className="btn-cont flex justify-around items-center gap-5">
                <button onClick={inc} className="btn text-2xl rounded-full bg-green-500 text-gray-200 px-2 pb-1">+</button>
                <button onClick={dec} className="btn text-2xl rounded-full bg-blue-500 text-gray-200 px-3 pb-1">-</button>
                <i onClick={()=>props.delete(props.id)} className="fa-solid fa-trash text-white cursor-pointer"></i>
            </div>
        </div>
    )
}

export default Subject;