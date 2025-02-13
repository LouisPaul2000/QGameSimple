Js

const states = [
    { name: "Ψ1 |0⟩", probability: 0.5 },
    { name: "Ψ2 |1⟩", probability: 0.3 },
    { name: "Ψ3 |Superposition⟩", probability: 0.2 }
];

let selectedState = null;

document.addEventListener("DOMContentLoaded", () => {
    const choiceContainer = document.getElementById("choices");
    const collapseBtn = document.getElementById("collapse-btn");
    
    // Generate state selection buttons dynamically
    states.forEach((state, index) => {
        let btn = document.createElement("div");
        btn.classList.add("choice");
        btn.innerText = state.name;
        btn.addEventListener("click", () => selectState(index));
        choiceContainer.appendChild(btn);
    });

    collapseBtn.addEventListener("click", collapseWave);
});

function selectState(index) {
    selectedState = states[index];
    document.getElementById("game-info").innerText = `Selected: ${selectedState.name}`;
}

function collapseWave() {
    if (!selectedState) {
        document.getElementById("result").innerText = "Select a state first!";
        return;
    }

    let rand = Math.random();
    let cumulativeProb = 0;
    let outcome = "Unknown";

    for (let state of states) {
        cumulativeProb += state.probability;
        if (rand < cumulativeProb) {
            outcome = state.name;
            break;
        }
    }

    document.getElementById("result").innerText = `Collapsed to: ${outcome}`;
    drawQuantumEffect(outcome);
}

function drawQuantumEffect(outcome) {
    let canvas = document.getElementById("quantum-visual");
    let ctx = canvas.getContext("2d");

    // Make canvas responsive
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    for (let i = 0; i < 10; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = outcome.includes("Superposition") ? 15 : 10;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}
