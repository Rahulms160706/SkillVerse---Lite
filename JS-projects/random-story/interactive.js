import { storyData } from "./data.js"

let tmp = null;

function randompick(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".js-btn").addEventListener("click", generate);
    document.querySelector(".save").addEventListener("click",(e) => {
        if(e.target && e.target.classList.contains("js-btn-save")) saved();
    })
});

/*
Had to do the above thing, cause in the html file, we have to put type="module" and therefore we have to use DOMContentLoaded, so that it tells don't look for this unless html page is completely loaded

Note : whenever type="module" is mentioned, it runs before the html page is loaded, Remember that!
*/

function generate(){
    const {characters, places, actions, reasons, twists} = storyData;
    let c = null, p = null, a = null, r = null, t = null;
    const save = document.querySelector(".save");
    save.innerHTML = '';
    c = randompick(characters);
    p = randompick(places);
    a = randompick(actions);
    r = randompick(reasons);
    t = randompick(twists);
    
    const templates = [
        `${c} ${a} ${p} ${r}, ${t}`,
        `${c} decided to ${a} ${p}.`,
        `Everyone was shocked when ${c} ${a} ${p} ${r}.`,
    ];
    tmp = randompick(templates);
    document.querySelector(".story")
        .innerHTML = tmp;
    
    save.innerHTML = `<button class="js-btn-save">Save this story ?</button>`
}

function saved(){
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    
    stories.push(tmp);

    localStorage.setItem("stories",JSON.stringify(stories));
    savedstories();
    
    alert("Story Saved!");
}

function savedstories(){
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const select = document.getElementById("savedstories")
    const sv = document.querySelector(".story-view");

    select.innerHTML = `<option value="">-- Saved Stories --</option>`;

    stories.forEach((story,index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = `story ${index + 1}`;
        select.appendChild(option);
    })

    let id;
    select.addEventListener("change", (e) => {
        const ind = e.target.value;
        if(ind !== ""){
            sv.innerText = stories[ind];
            clearTimeout(id);
            id = setTimeout(() => {
                sv.innerText = "";
                select.value = "";
            }, 5000);
        }
    })
}
