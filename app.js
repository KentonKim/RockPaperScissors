const menuOptions = document.querySelectorAll('.menu-option')
const audioButton = document.querySelector('#audio-button')
const ppBox = document.querySelector("#pp-main")
const menuBox = document.querySelector("#menu-main")
const emptyBox = document.querySelector(".empty")
const textBox   = document.querySelector('#typing')
const ppType = document.querySelector('#move-type')
const ppCount = document.querySelector('#pp-count')
let menuState = 1

const dialogueList = 
    ["What will USER do?",
    "You don't have any more Pokemon to use!",
    'Your bag is empty!',
    "Can't escape!"]
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

document.addEventListener('keyup',moveMenu)
document.addEventListener('keyup',pressingAB)
menuTL.classList.add(select)

function moveMenu(e) {
    if (menuState != 0){
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

function pressingAB(e) {
    // Selecting from menu
    if (menuState == 1 && e.key == "p") {
        if (menuTL.classList.contains(select)) {
            menuState = 2 // attack menu
            ppBox.classList.remove("hidden")
            emptyBox.classList.add("hidden")
            menuBox.style.flex = "3"
            menuTL.innerHTML = 'ROCK'
            menuTR.innerHTML = 'PAPER'
            menuBL.innerHTML = 'SCISSORS'
            menuBR.innerHTML = 'CHARGE'
            playButton()
            ppUpdate()
        }
        else {
            menuState = 0
            menuBox.classList.add("hidden")
            playButton()
            menuDialogue()
        }
    }

    // Going back to menu from non-fight optiono
    else if (menuState == 0 && e.key == 'p') {
        menuState = 1
        menuDialogue()
        menuBox.classList.remove('hidden')
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

function menuDialogue() {
    if (menuState == 0) {
        if (menuOptions[1].classList.contains(select)) {
            textBox.innerHTML = dialogueList[1]
        }
        else if (menuOptions[2].classList.contains(select)) {
            textBox.innerHTML = dialogueList[2]
        }
        else if (menuOptions[3].classList.contains(select)) {
            textBox.innerHTML = dialogueList[3]
        }
    }

    if (menuState == 1) {
        textBox.innerHTML = dialogueList[0]
    }
}