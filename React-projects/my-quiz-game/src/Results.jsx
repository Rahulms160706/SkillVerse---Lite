import questions from "./Data";

function Results({ans}){
    let score = 0;
    for(let i = 0;i<questions.length;i++){
        if(ans[i] !== null && ans[i] === questions[i].ans) score++;
    }
    const sc = score.toString().padStart(2,"0")

    return(
        <>
        <h2>Quiz Completed 🎉</h2>
        <p>Score : {sc}/{questions.length}</p>
        <p>Accuracy : {(sc/questions.length) * 100}%</p>
        </>
    );
}

export default Results