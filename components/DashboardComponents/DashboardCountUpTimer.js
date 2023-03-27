import { useEffect, useState } from "react";


function millisToMinutesAndSeconds(millis) {
    let sec = Math.floor(millis / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;
  
    sec = '' + sec;
    sec = ('00' + sec).substring(sec.length);
  
    if (hrs > 0) {
      min = '' + min;
      min = ('00' + min).substring(min.length);
      return hrs + ":" + min + ":" + sec;
    }
    else {
      return min + ":" + sec;
    }
  }

function Timer({time}){
    const [counter, setCounter] = useState(time);
    const [timer,setTimer] = useState(millisToMinutesAndSeconds(time));

    useEffect(() =>{
        if(counter > 0){
            setTimeout(()=>{
                setCounter(counter + 1000)
                setTimer(millisToMinutesAndSeconds(counter+1000))
            
            }, 1000);
            
        }
    },[counter]);

    return(
        <span>
            {" "}
            {timer}
        </span>
    )
}

export default Timer;