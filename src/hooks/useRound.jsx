import { useState } from "react";

export const useRound = () => {
    const [round, setRound] = useState({
        practice: true,
        memo: false,
        check: false,
        result: false,
    });

    // tell the fase of round practice to set true
    const updateRound = (fase) => {
        if (fase === "memo"){
            setRound({
                practice: false,
                memo: true,
                check: false,
                result: false,
            })
        } else if (fase === "check"){
            setRound({
                practice: false,
                memo: false,
                check: true,
                result: false,
            })
        } else if (fase === "result"){
            setRound({
                practice: false,
                memo: false,
                check: false,
                result: true,
            })
        } else {
            setRound({
                practice: true,
                memo: false,
                check: false,
                result: false,
            })
        }
    }

    return [round, updateRound];
}