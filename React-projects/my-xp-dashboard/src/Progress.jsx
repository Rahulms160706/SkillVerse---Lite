
export default function Progress({exp, curr}){
    return(
        <progress max={exp} value={curr}></progress>
    );
}