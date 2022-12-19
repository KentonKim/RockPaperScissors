const menuOptions = document.querySelectorAll('.menu-option')
const audioButton = document.querySelector('#audio-button')
const ppBox = document.querySelector("#pp-main")
const menuBox = document.querySelector("#menu-main")
const emptyBox = document.querySelector(".empty")
const textBox   = document.querySelector('.chat-inner')
const ppType = document.querySelector('#move-type')
const ppCount = document.querySelector('#pp-count')
let menuState = 1

const menuTL = menuOptions[0] // Fight / Rock
const menuBL = menuOptions[1] // Pokemon / Scissor
const menuTR = menuOptions[2] // Bag / Paper
const menuBR = menuOptions[3] // Run / Charge
const select = 'select'

const ppTLcap = 5 // Rock
const ppTRcap = 30 // Paper
const ppBLcap = 15 // Scissor
const ppBRcap = 5 // Charge
let ppTL = 5
let ppTR = 30
let ppBL= 15
let ppBR= 5


// Dialogue

document.addEventListener('keyup',moveMenu)
document.addEventListener('keyup',exitMenu)
menuTL.classList.add(select)

function moveMenu(e) {
    switch(e.key) {
        case 'w' : // up 
            if (menuBL.classList.contains(select)) {
                menuTL.classList.add(select)
                menuBL.classList.remove(select)
                playButton()
            }
            if (menuBR.classList.contains(select)) {
                menuTR.classList.add(select)
                menuBR.classList.remove(select)
                playButton()
            }
            ppUpdate()
            break
        case 'a' : // left
            if (menuTR.classList.contains(select)) {
                menuTL.classList.add(select)
                menuTR.classList.remove(select)
                playButton()
            }
            if (menuBR.classList.contains(select)) {
                menuBL.classList.add(select)
                menuBR.classList.remove(select)
                playButton()
            }
            ppUpdate()
            break
        case 's' : // down
            if (menuTL.classList.contains(select)) {
                menuBL.classList.add(select)
                menuTL.classList.remove(select)
                playButton()
            }
            if (menuTR.classList.contains(select)) {
                menuBR.classList.add(select)
                menuTR.classList.remove(select)
                playButton()
            }
            ppUpdate()
            break
        case 'd' : // right
            if (menuTL.classList.contains(select)) {
                menuTR.classList.add(select)
                menuTL.classList.remove(select)
                playButton()
            }
            if (menuBL.classList.contains(select)) {
                menuBR.classList.add(select)
                menuBL.classList.remove(select)
                playButton()
            }
            ppUpdate()
            break
    } 
}

function ppUpdate() {
    if (menuState == 2){
        if (menuOptions[0].classList.contains(select)) { // Rock
            ppType.innerHTML = 'ROCK'
            ppCount.innerHTML = "PP " + ppTL + "/" + ppTLcap
        }
        else if (menuOptions[1].classList.contains(select)) { // Scissor
            ppType.innerHTML = 'DRAGON'
            ppCount.innerHTML = "PP " + ppBL + "/" + ppBLcap
        }
        else if (menuOptions[2].classList.contains(select)) { // Paper
            ppType.innerHTML = 'NORMAL'
            ppCount.innerHTML = "PP " + ppTR + "/" + ppTRcap
        }
        else if (menuOptions[3].classList.contains(select)) { // Charge
            ppType.innerHTML = 'NORMAL'
            ppCount.innerHTML = "PP " + ppBR + "/" + ppBRcap
        }
    }
}

function playButton() {
    audioButton.pause();
    audioButton.currentTime = 0;
    audioButton.play()
}

function exitMenu(e) {
    // Selecting from menu
    if (menuState == 1 && e.key == "p") {
        if (menuTL.classList.contains(select)) {
            ppBox.classList.remove("hidden")
            emptyBox.classList.add("hidden")
            menuBox.style.flex = "3"
            menuTL.innerHTML = 'ROCK'
            menuTR.innerHTML = 'PAPER'
            menuBL.innerHTML = 'SCISSORS'
            menuBR.innerHTML = 'CHARGE'
            playButton()
            menuState = 2 // attack menu
            ppUpdate()
        }
        else {
            menuBox.classList.add("hidden")
            playButton()
            menuState = 0
        }
    }

    // Selecting an Attack
    else if (menuState == 2 && e.key == "p") {

    }

    // Cancelling back to Menu
    else if (menuState == 2 && e.key == "o") {
        ppBox.classList.add('hidden')
        emptyBox.classList.remove("hidden")
        menuBox.style.flex = "4"
        menuTL.innerHTML = 'FIGHT'
        menuTR.innerHTML = 'BAG'
        menuBL.innerHTML = 'POKEMON'
        menuBR.innerHTML = 'RUN'
        menuState = 1
        playButton()
    }
    
}