const menuOptions = document.querySelectorAll('.menu-option')
const audioButton = document.querySelector('#audio-button')
const ppBox = document.querySelector("#pp-main")
const menuBox = document.querySelector("#menu-main")
const emptyBox = document.querySelector(".empty")
const textBox   = document.querySelector('#typing')
const ppType = document.querySelector('#move-type')
const ppCount = document.querySelector('#pp-count')
const userHpGreen = document.querySelector('#user-hp-green')
const foeHpGreen = document.querySelector('#foe-hp-green')
const userHpBlack = document.querySelector('#user-hp-black')
const foeHpBlack = document.querySelector('#foe-hp-black')
const userSprite = document.querySelector("#user-sprite")
const foeSprite = document.querySelector("#foe-sprite")

let menuState = 1
let userHP = 64 
let foeHP = 64 
let userReduction = [1, 1]
let foeReduction = [1,1]

const dialogueList = 
    ["What will USER do?",
    "You don't have any more Pokemon to use!",
    'Your bag is empty!',
    "Can't escape!"]
const moveList =
    ['ROCK','SCISSOR','PAPER','CHARGE']
const menuTL = menuOptions[0] // Fight / Rock
const menuBL = menuOptions[1] // Pokemon / Scissor
const menuTR = menuOptions[2] // Bag / Paper
const menuBR = menuOptions[3] // Run / Charge
const select = 'select'

const damage =  16 // How much damage is done
const ppTLcap = 5 // Rock
const ppTRcap = 5 // Paper
const ppBLcap = 5 // Scissor
const ppBRcap = 5 // Charge
let ppTL = ppTLcap 
let ppTR = ppTRcap 
let ppBL= ppBLcap
let ppBR= ppBRcap

let userMoves = '' 
let computerMoves = '' 

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
            ppType.innerHTML = 'STEEL'
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
            returnToState('moves')
            ppUpdate()
        }
        else {
            returnToState('dialogue')
            menuDialogue()
        }
        playButton()
    }

    // Going back to menu from non-fight option
    else if (menuState == 0 && e.key == 'p') {
        returnToState('main')
        menuDialogue()
    }

    // Selecting an Attack
    else if (menuState == 2 && e.key == "p") {
        if (checkPP()){
            returnToState('attack')
            storeAttack()
            playButton()
            fightSequence()
            console.log('health points')
            console.log(userHP)
            console.log(foeHP)
            setTimeout(() => {
                returnToState('main') 
                menuDialogue() 
            }, 5000);
        }
        else {
            returnToState('dialogue')
            textBox.innerHTML = "There's no PP left for <br> this move!"
        }
    }

    // Cancelling back to Menu
    else if (menuState == 2 && e.key == "o") {
        returnToState('main')
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

function checkPP() {
        if (menuOptions[0].classList.contains(select)) {
            if (ppTL != 0) {
                return true
            }
        }
        else if (menuOptions[1].classList.contains(select)) {
            if (ppBL != 0) {
                return true
            }
        }
        else if (menuOptions[2].classList.contains(select)) {
            if (ppTR != 0) {
                return true
            }
        }
        else if (menuOptions[3].classList.contains(select)) {
            if (ppBR != 0) {
                return true
            }
        }
    return false
}

function storeAttack() {
    // store attack for user
    // reduce pp
    if (menuOptions[0].classList.contains(select)) {
        // Rock
        userMoves = moveList[0]
        ppTL -= 1
    }
    else if (menuOptions[1].classList.contains(select)) {
        // Scissor 
        userMoves = moveList[1]
        ppBL -= 1
    }
    else if (menuOptions[2].classList.contains(select)) {
        // Paper
        userMoves = moveList[2]
        ppTR -= 1
    }
    else if (menuOptions[3].classList.contains(select)) {
        // Charge
        userMoves = moveList[3]
        ppBR -= 1
    }

    // store attack for computer
    computerMoves = moveList[Math.floor(Math.random()*4)]

    console.log('user chose ' + userMoves)
    console.log('foe chose ' + computerMoves)
}

function fightSequence() {
    // tie
    if (userMoves == computerMoves && userMoves != moveList[3]) {
        textBox.innerHTML = "USER used " + userMoves + '!'
        setTimeout(() => { textBox.innerHTML = "But it failed!" }, 1500)
        setTimeout(() => {textBox.innerHTML = "FOE used " + computerMoves + '!'}, 2500)
        setTimeout(() => { textBox.innerHTML = "But it failed!" }, 4000)
    }
    // User wins
    else if ((userMoves == moveList[0] && computerMoves == moveList[1]) 
    || (userMoves == moveList[1] && computerMoves == moveList[2]) 
    || (userMoves == moveList[2] && computerMoves == moveList[0])) {
        textBox.innerHTML = "USER used " + userMoves + '!'
        setTimeout(() => {
            inflictDamage(foeHP, foeHpGreen, foeHpBlack, foeReduction) 
            foeHP -= foeReduction[0]*damage
        }, 1000)
        setTimeout(() => {textBox.innerHTML = "FOE used " + computerMoves + '!'}, 2500)
        setTimeout(() => {textBox.innerHTML = "But it failed!" }, 4000)
    }
    // Computer wins
    else if ((userMoves == moveList[2] && computerMoves == moveList[1]) 
    || (userMoves == moveList[0] && computerMoves == moveList[2]) 
    || (userMoves == moveList[1] && computerMoves == moveList[0])) {
        textBox.innerHTML = "USER used " + userMoves + '!'
        setTimeout(() => {textBox.innerHTML = "But it failed!" }, 1500)
        setTimeout(() => {textBox.innerHTML = "FOE used " + computerMoves + '!'}, 2500)
        setTimeout(() => {
            inflictDamage(userHP, userHpGreen, userHpBlack, userReduction) 
            userHP -= userReduction[0]*damage
        }, 3500)
    }

    // Computer charges
    else if (userMoves != moveList[3] && computerMoves == moveList[3]) {

        textBox.innerHTML = "FOE used " + computerMoves + '!'
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, 1000)
        setTimeout(() => {textBox.innerHTML = "USER used " + userMoves + '!'}, 2500)
        setTimeout(() => {
            // reduce stats
            foeReduction[0] *= 0.5
            userReduction[1] *= 2
            inflictDamage(foeHP, foeHpGreen, foeHpBlack, foeReduction) 
            foeHP -= foeReduction[0]*damage
        }, 3500)
    }

    // User charges
    else if (userMoves == moveList[3] && computerMoves != moveList[3]) {
        textBox.innerHTML = "USER used " + userMoves + '!'
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, 1000)
        setTimeout(() => {textBox.innerHTML = "FOE used " + computerMoves + '!'}, 2500)
        setTimeout(() => {
            // reduce stats
            userReduction[0] *= 0.5
            foeReduction[1] *= 2
            inflictDamage(userHP, userHpGreen, userHpBlack, userReduction) 
            userHP -= userReduction[0]*damage
        }, 3500)
    }

    // Both charges
    else if (userMoves == computerMoves && userMoves == moveList[3]) {
        // reduce stats
        userReduction[1] *= 2
        foeReduction[1] *= 2

        textBox.innerHTML = "USER used " + userMoves + '!'
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, 1000)
        setTimeout(() => {textBox.innerHTML = "FOE used " + computerMoves + '!'}, 2500)
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, 3500)
    }

    // update reduction arrays 
    setTimeout(() => {
        console.log(userReduction)
        console.log(foeReduction)
        userReduction = userReduction.slice(1)
        foeReduction = foeReduction.slice(1)
        userReduction.push(1)
        foeReduction.push(1)
    }, 6000);
}

function inflictDamage(hp, green, black, multiplier) {
    let newhp = (hp-(damage*multiplier[0]))
    green.style.flex = newhp.toString()
    black.style.flex = (64-newhp).toString()
    
    // trigger end phase if less than 0
    if (newhp <= 0) {
        triggerEnd()
    }
}

function returnToState(option) {
    if (option == 'dialogue'){
        // dialogue
        menuBox.classList.add("hidden")
        ppBox.classList.add('hidden')
        emptyBox.classList.remove("hidden")
        menuState = 0
    }
    else if (option == 'main'){
        // main menu
        if (!ppBox.classList.contains('hidden')) { ppBox.classList.add('hidden') }
        if (menuBox.classList.contains('hidden')) { menuBox.classList.remove('hidden')}
        emptyBox.classList.remove("hidden")
        menuBox.style.flex = "4"
        menuTL.innerHTML = 'FIGHT'
        menuTR.innerHTML = 'BAG'
        menuBL.innerHTML = 'POKEMON'
        menuBR.innerHTML = 'RUN'
        menuState = 1
    }
    else if (option == 'moves'){
        // attack menu
        ppBox.classList.remove("hidden")
        emptyBox.classList.add("hidden")
        menuBox.style.flex = "3"
        menuTL.innerHTML = 'ROCK'
        menuTR.innerHTML = 'PAPER'
        menuBL.innerHTML = 'SCISSORS'
        menuBR.innerHTML = 'CHARGE'
        menuState = 2
    }
    else if (option == 'attack'){
        ppBox.classList.add('hidden')
        menuBox.classList.add("hidden")
        menuState = 3 // attack sequence
    }
}