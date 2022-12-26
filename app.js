const menuOptions = document.querySelectorAll('.menu-option')
const menuBox = document.querySelector("#menu-main")
const emptyBox = document.querySelector(".empty")
const textBox   = document.querySelector('#typing')
const ppType = document.querySelector('#move-type')
const ppCount = document.querySelector('#pp-count')
const ppBox = document.querySelector("#pp-main")

const userHpBox = document.querySelector('#user-outer')
const userHpGreen = document.querySelector('#user-hp-green')
const userHpBlack = document.querySelector('#user-hp-black')
const userSprite = document.querySelector("#user-sprite")

const foeHpBox = document.querySelector('#foe-outer')
const foeHpGreen = document.querySelector('#foe-hp-green')
const foeHpBlack = document.querySelector('#foe-hp-black')
const foeSprite = document.querySelector("#foe-sprite")

const battleButton = document.querySelector("#battle-button")

const audioButton = document.querySelector('#audio-button')
const audioBattle = document.querySelector('#audio-battle')
const audioVictory = document.querySelector('#audio-victory')
const audioRock = document.querySelector('#audio-rock')
const audioScissor = document.querySelector('#audio-scissor')
const audioPaper = document.querySelector('#audio-paper')

const overlay = document.querySelector('.overlay')

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

// animations
const hpBoxMoveMan = [
    { transform: 'translateY(0px)'},
    { transform: 'translateY(3px)'},
    { transform: 'translateY(0px)'},
]

const hpBoxMoveManTiming = {
    duration: 100,
    iterations: 1,
}

const hpBoxHurt = [
    { transform: 'translateY(-3px)'},
    { transform: 'translateY(0px)'}
]

const hpBoxHurtTiming = {
    duration: 30,
    iterations: 3,
}

// starts everything
overlay.addEventListener('mouseup', ()=> {
    audioBattle.play()
    audioBattle.volume = 0.2
    overlay.classList.remove('overlay')
    setInterval(songEnd, 100)
    document.addEventListener('keyup',moveMenu)
    document.addEventListener('keyup',pressingAB)
    menuTL.classList.add(select)
    returnToState('main')
})

function songEnd() {
    if(audioBattle.currentTime > 81.5) {
        audioBattle.currentTime = 2.95
    }
}

// battle theme
battleButton.addEventListener('mouseup', () => {
    if (audioBattle.muted == false){
        audioBattle.muted = true
    }
    else {
        audioBattle.muted = false
    }
})

function moveMenu(e) {
    if (e.key == 'w' || e.key == 'a' || e.key == 's' || e.key == 'd'){
        if (menuState != 0){
            switch(e.key) {
                case 'w' : // up 
                    if (menuBL.classList.contains(select)) {
                        menuTL.classList.add(select)
                        menuBL.classList.remove(select)
                    }
                    if (menuBR.classList.contains(select)) {
                        menuTR.classList.add(select)
                        menuBR.classList.remove(select)
                    }
                    break
                case 'a' : // left
                    if (menuTR.classList.contains(select)) {
                        menuTL.classList.add(select)
                        menuTR.classList.remove(select)
                    }
                    if (menuBR.classList.contains(select)) {
                        menuBL.classList.add(select)
                        menuBR.classList.remove(select)
                    }
                    break
                case 's' : // down
                    if (menuTL.classList.contains(select)) {
                        menuBL.classList.add(select)
                        menuTL.classList.remove(select)
                    }
                    if (menuTR.classList.contains(select)) {
                        menuBR.classList.add(select)
                        menuTR.classList.remove(select)
                    }
                    break
                case 'd' : // right
                    if (menuTL.classList.contains(select)) {
                        menuTR.classList.add(select)
                        menuTL.classList.remove(select)
                    }
                    if (menuBL.classList.contains(select)) {
                        menuBR.classList.add(select)
                        menuBL.classList.remove(select)
                    }
                    break
            } 
            playButton()
            ppUpdate()
            userHpBox.animate(hpBoxMoveMan,hpBoxMoveManTiming)
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
        userHpBox.animate(hpBoxMoveMan,hpBoxMoveManTiming)
    }

    // Going back to menu from non-fight option
    else if (menuState == 0 && e.key == 'p') {
        returnToState('main')
        menuDialogue()
        userHpBox.animate(hpBoxMoveMan,hpBoxMoveManTiming)
    }

    // Selecting an Attack
    else if (menuState == 2 && e.key == "p") {
        if (checkPP()){
            returnToState('attack')
            storeAttack()
            playButton()
            fightSequence()
        }
        else {
            returnToState('dialogue')
            textBox.innerHTML = "There's no PP left for <br> this move!"
        }
        userHpBox.animate(hpBoxMoveMan,hpBoxMoveManTiming)
    }

    // Cancelling back to Menu
    else if (menuState == 2 && e.key == "o") {
        returnToState('main')
        playButton()
        userHpBox.animate(hpBoxMoveMan,hpBoxMoveManTiming)
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
        menuOptions[0].classList.remove(select)
        userMoves = moveList[0]
        ppTL -= 1
    }
    else if (menuOptions[1].classList.contains(select)) {
        // Scissor 
        menuOptions[1].classList.remove(select)
        userMoves = moveList[1]
        ppBL -= 1
    }
    else if (menuOptions[2].classList.contains(select)) {
        // Paper
        menuOptions[2].classList.remove(select)
        userMoves = moveList[2]
        ppTR -= 1
    }
    else if (menuOptions[3].classList.contains(select)) {
        // Charge
        menuOptions[3].classList.remove(select)
        userMoves = moveList[3]
        ppBR -= 1
    }
    menuOptions[0].classList.add(select)

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
            inflictDamage(foeHpBox,foeHP, foeHpGreen, foeHpBlack, foeReduction) 
            foeHP -= foeReduction[0]*damage
        }, 1000)
        if (foeHP <= 0){
            setTimeout(() => {
                    triggerEnd()
            }, 2500)
        }
        else {
            setTimeout(() => {
                textBox.innerHTML = "FOE used " + computerMoves + '!'
            }, 2500);
            setTimeout(() => {textBox.innerHTML = "But it failed!" }, 4000)
        }
    }
    // Computer wins
    else if ((userMoves == moveList[2] && computerMoves == moveList[1]) 
    || (userMoves == moveList[0] && computerMoves == moveList[2]) 
    || (userMoves == moveList[1] && computerMoves == moveList[0])) {
        textBox.innerHTML = "USER used " + userMoves + '!'
        setTimeout(() => {textBox.innerHTML = "But it failed!" }, 1500)
        setTimeout(() => {textBox.innerHTML = "FOE used " + computerMoves + '!'}, 2500)
        setTimeout(() => {
            inflictDamage(userHpBox, userHP, userHpGreen, userHpBlack, userReduction) 
            userHP -= userReduction[0]*damage
        }, 3500)
        setTimeout(() => {
            triggerEnd()
        }, 5000);
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
            inflictDamage(foeHpBox, foeHP, foeHpGreen, foeHpBlack, foeReduction) 
            foeHP -= foeReduction[0]*damage
        }, 3500)
        setTimeout(() => {
            triggerEnd()
        }, 5000);
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
            inflictDamage(userHpBox, userHP, userHpGreen, userHpBlack, userReduction) 
            userHP -= userReduction[0]*damage
        }, 3500)
        setTimeout(() => {
            triggerEnd()
        }, 5000);
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

    // return to normal
    if (foeHP > 0 && userHP > 0) {
        setTimeout(() => {
            returnToState('main') 
            menuDialogue() 
        }, 5000);
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

function inflictDamage(box, hp, green, black, multiplier) {
    let newhp = (hp-(damage*multiplier[0]))
    if (newhp < 0) {
        newhp = 0
    }
    else if (newhp <= 16) {
        green.style.backgroundColor = '#b82116'
    }
    else if (newhp <= 32) {
        green.style.backgroundColor = '#ffdc17'
    }
    green.style.flex = newhp.toString()
    black.style.flex = (64-newhp).toString()

    box.animate(hpBoxHurt,hpBoxHurtTiming)
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
        userSprite.classList.add('bobbing')
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
        userSprite.classList.remove('bobbing')
        menuState = 3 // attack sequence
    }
}

function triggerEnd() {
    if (userHP <=0) {
        textBox.innerHTML = "USER has fainted!" 
        textBox.innerHTML = "USER whited out!" 
    }
    else if (foeHP <=0) {
        textBox.innerHTML = "FOE has fainted!" 
        textBox.innerHTML = "You won!" 

        audioBattle.pause()
        audioVictory.play()
        audioVictory.volume = 0.2

    }
    // plays death sound
    // gives animation of death to sprite


}