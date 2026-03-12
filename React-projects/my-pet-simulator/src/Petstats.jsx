import { useReducer, useEffect } from "react";

const initialState = {
    hunger : 50,
    happy : 75,
    energy : 70,
    health : 85,
    emotion : "😀",
    level : 1,
    xp : 0,
    decay : 0
};

function petReducer(state, action) {
  switch (action.type) {
    case "FEED":
        return {
            ...state,
            hunger : Math.min(state.hunger + 5, 100),
            happy : state.hunger > 80 ? (Math.max(state.happy - 1, 0)) : state.happy,
            health : state.hunger > 90 ? (Math.max(state.health - 1, 0)) : state.health
        };

    case "PLAY":
        return {
            ...state,
            happy : Math.min(state.happy + 5, 100),
            energy : Math.max(state.energy - 2.5, 0),
            hunger : Math.max(state.hunger - 2.5, 0)
        };

    case "SLEEP":
        return {
            ...state,
            energy : Math.min(state.energy + 5, 100),
            hunger : Math.max(state.hunger - 2, 0),
            happy : Math.max(state.happy - 1, 0)
        };

    case "TICK": {
        let delta = 0;
        let newXp = state.xp;
        let nextLevel = state.level;
        let decayCount = state.decay + 1;
        let nextHunger = state.hunger;
        let nextEnergy = state.energy;
        let nextHappy = state.happy;

        if (state.hunger < 30) delta -= 1.5;
        if (state.energy < 30) delta -= 1.5;
        if (state.happy < 30) delta -= 1.5;

        if(decayCount % 5 === 0){
            nextHunger = Math.max(state.hunger - 1, 0);
            nextEnergy = Math.max(state.energy - 0.5, 0);
            nextHappy = Math.max(state.happy - 0.5, 0);
        }
        if (state.hunger >= 60 && state.energy >= 60 && state.happy >= 60) {
            delta += 1.5;
            newXp += 5;
        }
        if(newXp >= 100){
            nextLevel += 1;
            newXp = 0;
        }

        const newHealth = Math.max(
            0,
            Math.min(state.health + delta, 100)
        );

        let newEmotion = "😀";

        if(newHealth <= 0) newEmotion = "💀";
        else if (newHealth <= 20) newEmotion = "😵";
        else if (state.energy < 30) newEmotion = "😴";
        else if (state.hunger < 30) newEmotion = "😩";
        else if (state.happy < 30) newEmotion = "😢";
        else if(state.hunger > 90) newEmotion = "🤢";
        else if (state.hunger > 80 && state.energy > 80 && state.happy > 80) newEmotion = "😎";
        else if (delta < 0) newEmotion = "🥺";
        else newEmotion = "😊";

        return {
            ...state,
            health : newHealth,
            emotion : newEmotion,
            xp : newXp,
            level : nextLevel,
            decay : decayCount,
            hunger : nextHunger,
            energy : nextEnergy,
            happy : nextHappy
        };
    }

    case "LOAD_FROM_DB":
  return {
    ...state,
    ...action.payload
  };

    default:
        return state;
    }
}

function Petstats() {
  const [state, dispatch] = useReducer(petReducer, initialState);
  const gameOver = state.health <= 0;

  useEffect(() => {
  const fetchPet = async () => {
    const res = await fetch("http://localhost:5000/api/pets");
    const data = await res.json();

    if (data.length > 0) {
      dispatch({ type: "LOAD_FROM_DB", payload: data[0] });
    } else {
      // create new pet if none exists
      const newPetRes = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(initialState)
      });

      const newPet = await newPetRes.json();
      dispatch({ type: "LOAD_FROM_DB", payload: newPet });
    }
  };

  fetchPet();
}, []);

  useEffect(() => {
  if (!state._id) return; // wait until pet loads from DB

  const savePet = async () => {
    await fetch(`http://localhost:5000/api/pets/${state._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    });
  };

  savePet();
}, [state]);

  useEffect(() => {
    if(state.health <= 0) return;

    const id = setInterval(() => {
        dispatch({ type: "TICK" });
    }, 3000);

    return () => clearInterval(id);
  }, [state.health]);

  if(gameOver){
    return(
      <div className="container">
        <h1>Game Over ! 💀</h1>
        <p>Final level : {state.level}</p>
        <button onClick={async () => {
          // delete existing pet
          await fetch("http://localhost:5000/api/pets", {
            method: "DELETE"
          });

          // create fresh pet
          const res = await fetch("http://localhost:5000/api/pets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(initialState)
          });

          const newPet = await res.json();

          dispatch({ type: "LOAD_FROM_DB", payload: newPet });
        }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="feature-container">
        <h2>Level : {state.level}</h2>
        <p className="animal">
          🐶 - {state.emotion}
        </p>

        <button onClick={() => dispatch({ type: "FEED" })}>
          Feed
        </button>

        <button onClick={() => dispatch({ type: "PLAY" })}>
          Play
        </button>

        <button onClick={() => dispatch({ type: "SLEEP" })}>
          Sleep
        </button>
      </div>

      <div className="stats-container">
        <div className="xp-bar-container">
        <p>🍖 Hunger</p>
        <progress
            value={state.hunger}
            max={100}
        ></progress>
        </div>

        <div className="xp-bar-container">
          <p>😊 Happiness</p>
          <progress
            value={state.happy}
            max={100}
          ></progress>
        </div>

        <div className="xp-bar-container">
          <p>⚡ Energy</p>
          <progress
            value={state.energy}
            max={100}
          ></progress>
        </div>

        <div className="xp-bar-container">
          <p>❤️ Health</p>
          <progress
            value={state.health}
            max={100}
          ></progress>
        </div>
      </div>
    </div>
  );
}

export default Petstats;
