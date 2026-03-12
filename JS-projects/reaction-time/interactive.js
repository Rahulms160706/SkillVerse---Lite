const bg = document.querySelector(".header");
const container = document.querySelector(".btn-container");

bg.addEventListener("click",handleclick);
let state = "idle";
let start = null;
let round = 0;

function wait(time){
    return new Promise(resolve => setTimeout(resolve,time))
}

async function rand_wait(){
    const rand = Math.random();
    if(rand >= 0 && rand < 1/5){
        await wait(1000);
    }
    else if(rand >= 1/5 && rand < 2/5){
        await wait(2000);
    }
    else if(rand >= 2/5 && rand < 3/5){
        await wait(3000);
    }
    else if(rand >= 3/5 && rand < 4/5){
        await wait(4000);
    }
    else if(rand >= 4/5 && rand <= 1){
        await wait(5000);
    }
}

async function update(event){
    round++;
    const curr = round;
    // this takes care of previous/past calls done 

    if(event) event.stopPropagation();
    // we need this so that the bubbling doesn't happen and it stops from going to the outer element when only the button is clicked 
    container.innerHTML = `
        <p>Alright... Let's test your reaction time</p>
    `;
    await wait(2000);   

    if(curr !== round) return;
    // Note : async await works similar to FIFO, which means, when we first call the function and repeatedly do new calls many times, the first call will be the one which will be executed and then the new calls. So first call will be the one to exit out first.

    // in case of clicking many times, when in await, it updates round and curr values but once await is finished, it checks the previous curr value with the new round value. Why and how new round is compared to previous curr value is cause curr is local and round is global, and that is why we are able to take the leverage of comparing the previous with current.

    container.innerHTML = `
        <p>Wait for the screen to turn to green...🟢</p>
    `;
    bg.style.backgroundColor = "rgb(238, 64, 64)";
    state = "not-ready";
    await rand_wait();

    if(curr !== round) return;

    bg.style.backgroundColor = "rgb(64, 220, 64)";
    state = "ready";
    start = Date.now();
    container.innerHTML = `
        <p></p>
    `;
}

async function handleclick(){
    if(state == "not-ready"){
        round++;
        const curr = round;

        state = "cooldown";
        container.innerHTML = `
                <p>Clicked too early 😑</p>
            `;
        await wait(1000);

        if(curr !== round) return;

        container.innerHTML = `
            <p>Wait for the screen to turn to green...🟢</p>
        `;
        bg.style.backgroundColor = "rgb(238, 64, 64)";
        await rand_wait();

        if(curr !== round) return;

        bg.style.backgroundColor = "rgb(64, 220, 64)";
        state = "ready";
        start = Date.now();
        container.innerHTML = `
            <p></p>
        `;
        return;
    }
    else if(state == "cooldown") return;
    else if(state == "ready"){
        const end = Date.now();
        const time = end - start;
        container.innerHTML = `
            <p>${time} ms</p>
        `;
        state = "idle";
        start = null;
        bg.style.backgroundColor = "rgb(106, 106, 255)";
        container.innerHTML += `
            <p>
                <button class="js-btn" onclick="update(event)">Want to Test again ?</button>
            </p>
        `;
        const t = localStorage.getItem("best_time");
        if(!t || time < t){
            localStorage.setItem("best_time",time);
        }
        document.querySelector(".time")
            .textContent = "Best Time : " + localStorage.getItem("best_time") + " ms";
    }
}
