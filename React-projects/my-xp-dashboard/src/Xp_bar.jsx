import {useEffect, useState} from "react";
import Progress from "./Progress";
import c1 from "./assets/charmander.png";
import c2 from "./assets/charmeleon.png";
import c3 from "./assets/charizard.png";

function Xp_bar({XP,Level,Gain}){
    const m = Gain;
    const [xp,setXp] = useState(() => {
        return Number(localStorage.getItem("xp") || 0)
    });
    const [level, setLevel] = useState(Level);
    const [text, setText] = useState(false);
    const [action, setAction] = useState("None");

    function character(){
        if(level <= 2){
            return c1;
        }
        else if(level <= 4){
            return c2;
        }
        else return c3;
    }
    function names(){
        if(level == 1) return "Rookie Trainer";
        else if(level == 2) return "Ember Trainer";
        else if(level == 3) return "Flame Adept";
        else if(level == 4) return "Fire Master";
        else if(level >= 5) return "Dragon Master";
    }
    function actionsTaken(Gain){
        if(m == Gain) setAction(`🔥 Trained hard and gained +${Gain} XP`);
        else if(m + 15 == Gain) setAction(`⚔️ Won a battle and gained +${Gain} XP`);
        else if(m*5 == Gain) setAction(`🏆 Defeated a Gym Leader and gained +${Gain} XP`)
    }
    function handleUpdate(Gain){
        const total = xp + Gain;

        if(total >= XP){
            const lg = Math.floor(total / XP);
            const remain = total % XP;

            setLevel(level => level + lg);
            setXp(remain);
            setText(true);
        }
        else{
            setXp(total);
        }
        actionsTaken(Gain);
    }
    function handleReset(){
        setXp(0);
        setLevel(Level);
        setText(false);
        setAction("Reset Progress");
    }

    useEffect(() => {
        localStorage.setItem("xp",xp);
    },[xp]);
    useEffect(() => {
        if(!text) return;

        const timer = setTimeout(() => {
            setText(false);
        }, 650);
        return () => clearTimeout(timer);
    },[text]);

    return(
        <>
            <div className="container">
                <h2>XP Progress Bar</h2>
                <div className="XP-container">
                    <img src={character()} alt="Game Character"></img>
                    <p>{text ? "Leveling Up !!" : `Level ${level} → ${names()}`}</p>
                    <p>XP : {xp} / {XP}</p>
                    <Progress exp = {XP} curr = {xp}/>
                </div> 
                <div className="updates">
                    <button onClick={() => handleUpdate(Gain)}>🔥 Train</button>
                    <button onClick={() => handleUpdate(Gain+15)}>⚔️ Battle </button>
                    <button onClick={() => handleUpdate(Gain*5)}>🏆 Gym Victory</button>
                    <button onClick={() => handleReset()}>Reset</button>
                </div>
                <div className="updates">
                    <p>Last Action : {action}</p>
                </div>
            </div>
        </>
    );
}

export default Xp_bar