import { useState } from "react";
import useInterval from "./useInterval";

export const useTimer = () =>{
    const [time, setTime] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [delay] = useState(1000);

    useInterval(
        () =>{
            setTime(prev => prev + 1)
        }, 
        isOn ? delay : null
    )

    const startTimer = () => {
        setIsOn(true);
    }

    const stopTimer = () => {
        setIsOn(false);
    }

    const resetTimer = () => {
        setTime(0);
    }

    return [time, startTimer, stopTimer, resetTimer]
}
