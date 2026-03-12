function Numbers({goto, answers, current}){
    function gotoQues(i){
        goto(i-1);
    }

    function getClass(i){
        let cls = "";

        if(answers[i-1]) cls += " answered";
        if(current === i-1) cls += " current";

        return cls;
    }

    return(
        <div>
            <div className="r1">
                <button className={getClass(1)} onClick={() => gotoQues(1)}>1</button>
                <button className={getClass(2)} onClick={() => gotoQues(2)}>2</button>
                <button className={getClass(3)} onClick={() => gotoQues(3)}>3</button>
            </div>
            <div className="r2">
                <button className={getClass(4)} onClick={() => gotoQues(4)}>4</button>
                <button className={getClass(5)} onClick={() => gotoQues(5)}>5</button>
                <button className={getClass(6)} onClick={() => gotoQues(6)}>6</button>
            </div>
            <div className="r3">
                <button className={getClass(7)} onClick={() => gotoQues(7)}>7</button>
                <button className={getClass(8)} onClick={() => gotoQues(8)}>8</button>
                <button className={getClass(9)} onClick={() => gotoQues(9)}>9</button>
            </div>
            <div className="r4">
                <button className={getClass(10)} onClick={() => gotoQues(10)}>10</button>
            </div>
        </div>
    )
}

export default Numbers;