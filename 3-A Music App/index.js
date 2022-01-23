/*
 * @Date: 2022-01-23 20:51:48
 * @LastEditors: GC
 * @LastEditTime: 2022-01-23 21:24:06
 * @FilePath: \Projects\3-A Music App\index.js
 */
window.addEventListener("load", () => {
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads div");
    const visual = document.querySelector(".visual");
    const colors = [
        "#60d394",
        "#d36060",
        "#c060d3",
        "#d3d160",
        "#6860d3",
        "#73d360"
    ];


    // Let's ger going with the sound here
    pads.forEach((pad, index) => {
        pad.addEventListener("click", function() {
            // Change current time to 0 so that we can click the taps multiple times
            sounds[index].currentTime = 0;

            sounds[index].play();

            createBubbles(index);
        });
    });

    // Create a function that makes bubbles
    const createBubbles = (index) => {
        const bubble = document.createElement("div");
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation = "jump 1s ease";

        bubble.addEventListener("animationend", function() {
            visual.removeChild(this);
        })
    }

})