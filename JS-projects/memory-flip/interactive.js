let score = 0;
let over = 0;
let disable = false;
cards = ['🤖','🤖','👺','👺','🐦‍🔥','🐦‍🔥']
const btn = document.querySelector(".replay")

function reset(){
    cards.forEach((_,index) => {
        let card = document.querySelector(`#rc${index+1}`);
        card.innerHTML = '❔';
    });
    score = 0;
    over = 0;
    c1 = null;
    c2 = null;
    btn.innerHTML = '';
    disable = false;
}

function fisheryates(arr){
    for(let i = arr.length-1;i>0;i--){
        let j = Math.floor(Math.random() * (i+1)); // random index between 0 and i
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
}

function value(){
    cards = fisheryates(cards);
    /* 
    cards.sort(() => Math.random() - 0.5)
    let k = 1;
    for(let i = 0;i < cards.length;i++){
        let card = document.querySelector(`#rc${k}`)
        card.dataset.symbol = cards[i];
        k++;
    }
    */
    cards.forEach((emoji,index) => {
        let card = document.querySelector(`#rc${index+1}`);
        card.dataset.symbol = emoji;
    });
}
value();

let c1 = null;
let c2 = null;

function update(){
    const s = document.querySelector(".score");
    s.innerText = `Score : ${score}`;

    if(over === 6){
        btn.innerHTML = `
        <p>Hooray !! 🥳</p>
        <button onclick="replay()">Play Again</button>`
    }
}
update();

function compare(){
    if(c1 && c2){
        if(c1.dataset.symbol == c2.dataset.symbol){
            score += 2;
            over += 2;
            disable = false;
            update();
        }
        else{
            score = Math.max(0,score-1);
            update();
            setTimeout(() => {
                if(c1) c1.innerHTML = '❔';
                if(c2) c2.innerHTML = '❔';

                c1 = null;
                c2 = null;
                disable = false;
            }, 1000);
            return;
        }
        c1 = null;
        c2 = null;
    }
}

// event driven function 
// we have to call this function once and no need to call anymore since the event listener will stay forever unless refreshed
function get_value(){
    cards.forEach((_,index) => {
        let card = document.querySelector(`#rc${index+1}`);
        card.addEventListener("click", () => {
            if(disable) return;
            if(card == c1) return;
            
            if(c1 == null){
                c1 = card;
                card.innerHTML = card.dataset.symbol;
            }
            else if(c2 == null){
                c2 = card;
                card.innerHTML = card.dataset.symbol;
                disable = true;
                compare();
            }
        })
    })
}
get_value();

function replay(){
    reset();
    value();
    update();
}