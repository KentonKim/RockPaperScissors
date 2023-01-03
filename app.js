const menuOptions = document.querySelectorAll('.menu-option')
const menuBox = document.querySelector("#menu-main")
const emptyBox = document.querySelector(".empty")
const textBox   = document.querySelector('#typing')
const ppType = document.querySelector('#move-type')
const ppCount = document.querySelector('#pp-count')
const ppBox = document.querySelector("#pp-main")

const userHpBox = document.querySelector('#user-outer')
const userHpNum = document.querySelector('#hp-number')
const userHpGreen = document.querySelector('#user-hp-green')
const userHpBlack = document.querySelector('#user-hp-black')
const userSprite = document.querySelector("#user-sprite")
const userLevel = document.querySelector('#user-level')
const userExp = document.querySelector('#exp')

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
const audioCharge = document.querySelector('#audio-charge')
const audioHurt = document.querySelector('#audio-hurt')
const audioZig = document.querySelector('#audio-zigzagoon')
const audioBidoof = document.querySelector('#audio-bidoof')
const audioExp= document.querySelector('#audio-exp')
const audioLevel= document.querySelector('#audio-level')
const audioLevelSong = document.querySelector('#audio-levelsong')

const spritePaper = document.querySelector('#paper')
const spritePaperAlt = document.querySelector('#paper-alt')
const spriteRock = document.querySelector('#rock')
const spriteRockAlt = document.querySelector('#rock-alt')
const spriteScissorArr = document.querySelectorAll('.scissor') // inverted order
const spriteScissorAltArr = document.querySelectorAll('.scissor-alt')
const spriteChargeArr = document.querySelectorAll('.charge') // correct order
const spriteChargeAltArr = document.querySelectorAll('.charge-alt') // correct order
const spriteStatsBox = document.querySelector('#status')
const spriteStatsArr = document.querySelectorAll('.stat-num')
const redCircle = document.querySelector('#red-circle')

const overlay = document.querySelector('.overlay')

let menuState = 1
let userHP = 64
let foeHP = 64 
let delay = 0
let userReduction = [1,1]
let foeReduction = [1,1] 

const dialogueList = 
    ["What should <br> ZIGZAGOON do?",
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
let ppBL = ppBLcap
let ppBR = ppBRcap
let userMoves = '' 
let computerMoves = ''

let endCount = 0 

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


// starts everything
overlay.addEventListener('mouseup', ()=> {
    if (overlay.innerHTML == 'Replay?') {
        location.reload()
    }

    overlay.innerHTML = ''
    audioBattle.currentTime = 0
    audioBattle.play()
    audioBattle.volume = 0.2
    overlay.classList.remove('overlay')

    setInterval(songEnd, 100)
    document.addEventListener('keyup',moveMenu)
    document.addEventListener('keyup',pressingAB)
    menuTL.classList.add(select)
    returnToState('main')
    menuDialogue()
})

function songEnd() {
    if(audioBattle.currentTime > 81.5) {
        audioBattle.currentTime = 2.95
    }
}

// battle theme
battleButton.addEventListener('mouseup', () => {
    if (audioBattle.muted == false || audioVictory.muted == false){
        redCircle.classList.remove('hidden')
        audioBattle.muted = true
        audioVictory.muted = true
    }
    else {
        redCircle.classList.add('hidden')
        audioBattle.muted = false
        audioVictory.muted = false 
    }
})

function moveMenu(e) {
    if (e.key == 'w' || e.key == 'a' || e.key == 's' || e.key == 'd'){
        if (menuState == 1 || menuState == 2){
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
            ppType.innerHTML = 'FIGHT'
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
}

function fightSequence() {

    delay = 0 // animation of attack
    let totdelay

    // tie
    if (userMoves == computerMoves && userMoves != moveList[3]) {
        textBox.innerHTML = "ZIGZAGOON used <br>" + userMoves + '!'
        setTimeout(() => {textBox.innerHTML = "But it failed!" }, 1000)
        setTimeout(() => {textBox.innerHTML = "Wild BIDOOF  used <br>" + computerMoves + '!'}, 2000)
        setTimeout(() => {textBox.innerHTML = "But it failed!" }, 3000)
        totdelay = 4000 
    }

    // User wins
    else if ((userMoves == moveList[0] && computerMoves == moveList[1]) 
    || (userMoves == moveList[1] && computerMoves == moveList[2]) 
    || (userMoves == moveList[2] && computerMoves == moveList[0])) {

        foeHP -= foeReduction[0]*damage
        if (foeHP < 0) {foeHP = 0}
        setDelay(userMoves)

        textBox.innerHTML = "ZIGZAGOON used <br>" + userMoves + '!'
        setTimeout(() => {attackAnimate(userMoves, 0) }, 1000)
        setTimeout(() => {inflictDamage(foeSprite, foeHpBox, foeHP, foeHpGreen, foeHpBlack) }, delay + 1250)
        delay += 420 // damage duration
        setTimeout(() => {
            if (foeHP <= 0){
                triggerEnd()
            }
            else {
                setTimeout(() => {textBox.innerHTML = "Wild BIDOOF used <br>" + computerMoves + '!'}, 250)
                setTimeout(() => {textBox.innerHTML = "But it failed!" }, 1250)
            }
        }, delay + 1250)
        totdelay = delay + 3500 
    }

    // Computer wins
    else if ((userMoves == moveList[2] && computerMoves == moveList[1]) 
    || (userMoves == moveList[0] && computerMoves == moveList[2]) 
    || (userMoves == moveList[1] && computerMoves == moveList[0])) {

        userHP -= userReduction[0]*damage
        if (userHP < 0) {userHP = 0}
        setDelay(computerMoves)
        textBox.innerHTML = "ZIGZAGOON used <br>" + userMoves + '!'

        setTimeout(() => {textBox.innerHTML = "But it failed!" }, 1000)
        setTimeout(() => {textBox.innerHTML = "Wild BIDOOF used <br>" + computerMoves + '!'}, 2000)
        setTimeout(() => {attackAnimate(computerMoves, 1) }, 3000)
        setTimeout(() => {
            inflictDamage(userSprite, userHpBox, userHP, userHpGreen, userHpBlack)
            updateUserHP()
            triggerEnd()
        }, delay + 3250)
        delay += 420
        totdelay = delay + 3500 
    }

    // Computer charges
    else if (userMoves != moveList[3] && computerMoves == moveList[3]) {
        foeReduction[0] *= 0.5
        userReduction[1] *= 2
        foeHP -= foeReduction[0]*damage
        if (foeHP < 0) {foeHP = 0}
        setDelay(computerMoves)

        textBox.innerHTML = "Wild BIDOOF used <br>" + computerMoves + '!'
        setTimeout(() => {attackAnimate(computerMoves, 1) }, 1000)
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, delay + 1250)
        setTimeout(() => {textBox.innerHTML = "ZIGZAGOON used <br>" + userMoves + '!'}, delay + 2250)
        setTimeout(() => {attackAnimate(userMoves, 0) }, delay + 3250)
        setDelay(userMoves)
        setTimeout(() => {
            inflictDamage(foeSprite, foeHpBox, foeHP, foeHpGreen, foeHpBlack)
            triggerEnd()
        }, delay + 3500)
        delay += 420
        totdelay = delay + 3750 
    }

    // User charges
    else if (userMoves == moveList[3] && computerMoves != moveList[3]) {
        userReduction[0] *= 0.5
        foeReduction[1] *= 2
        userHP -= userReduction[0]*damage
        if (userHP < 0) {userHP = 0}
        setDelay(userMoves)

        textBox.innerHTML = "ZIGZAGOON used <br>" + userMoves + '!'
        setTimeout(() => {attackAnimate(userMoves, 0) }, 1000)
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, delay + 1250)
        setTimeout(() => {textBox.innerHTML = "Wild BIDOOF used <br>" + computerMoves + '!'}, delay + 2250)
        setTimeout(() => {attackAnimate(computerMoves, 1) }, delay + 3250)
        setDelay(computerMoves)
        setTimeout(() => {
            updateUserHP()
            inflictDamage(userSprite, userHpBox, userHP, userHpGreen, userHpBlack) 
            triggerEnd()
        }, delay + 3500)
        delay += 420
        totdelay = delay + 3750 
    }

    // Both charges
    else if (userMoves == computerMoves && userMoves == moveList[3]) {
        userReduction[1] *= 2
        foeReduction[1] *= 2
        setDelay(userMoves)

        textBox.innerHTML = "ZIGZAGOON used <br>" + userMoves + '!'
        setTimeout(() => {attackAnimate(userMoves, 0) }, 1000)
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, delay + 1250)
        setTimeout(() => {textBox.innerHTML = "Wild BIDOOF used <br>" + computerMoves + '!'}, delay + 2250)
        setTimeout(() => {attackAnimate(computerMoves, 1) }, delay + 3250)
        setDelay(computerMoves)
        setTimeout(() => {textBox.innerHTML = "They began charging!" }, delay + 3500)
        totdelay = delay + 4500 
    }

    // return to normal
    if (foeHP > 0 && userHP > 0) {
        setTimeout(() => {
            returnToState('main') 
            menuDialogue() 
        }, totdelay);
    }

    // update reduction arrays 
    userReduction = userReduction.slice(1)
    foeReduction = foeReduction.slice(1)
    userReduction.push(1)
    foeReduction.push(1)
}

function inflictDamage(sprite, box, hp, green, black) {

    sprite.animate([
        {opacity: '100'},
        {opacity: '0'}
    ], {
        duration: 70,
        iterations: 4,
    })
    audioHurt.play()

    setTimeout(() => {
        updateHP(hp,green,black)
        box.animate([
            { transform: 'translateY(-3px)'},
            { transform: 'translateY(0px)'}
        ],{
        duration: 30,
        iterations: 3,
        })
    }, 400);
}

function updateUserHP() {
    setTimeout(() => {
        userHpNum.innerHTML = userHP + "/ &nbsp 64"
    }, 400);
}

function updateHP(hp,green,black, total = 64) {
    if (hp <= 16) {
        green.style.backgroundColor = '#b82116'
    }
    else if (hp <= 32) {
        green.style.backgroundColor = '#ffdc17'
    }
    else {
        green.style.backgroundColor = '#7dff93'
    }
    green.style.flex = hp.toString()
    black.style.flex = (total-hp).toString()
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
    if (userHP <=0 || foeHP <= 0){
        document.removeEventListener('keyup',moveMenu)
        document.removeEventListener('keyup',pressingAB)

        if (userHP <=0) {
            audioZig.playbackRate = 0.8
            setTimeout(() => {audioZig.play()}, 1000)
            setTimeout(() => {userSprite.classList.add('fainted')}, 2500)
            setTimeout(() => {textBox.innerHTML = "ZIGZAGOON has fainted!" }, 3500)
            setTimeout(() => {textBox.innerHTML = "USER whited out!" }, 5000)
            setTimeout(() => {
                overlay.classList.add('overlay')
                overlay.innerHTML = 'Replay?'
            }, 7000);

        }
        else if (foeHP <=0) {
            audioBidoof.playbackRate = 0.8
            setTimeout(() => {audioBidoof.play()}, 1000)
            setTimeout(() => {
                foeSprite.classList.add('fainted')
                foeHpBox.classList.add('hidden')
            }, 2500)
            setTimeout(() => {
                textBox.innerHTML = "Wild BIDOOF has fainted!"
                document.addEventListener('keyup', navigateEnd)
            }, 3500);
        }
    }
}

function attackAnimate(moves, num) {
    switch(moves) {
        case moveList[0]: // rock 
            animateRock(num)
            break
        case moveList[1]: // scissor
            animateScissor(num)
            break
        case moveList[2]: // paper
            animatePaper(num)
            break
        case moveList[3]: // charge
            animateCharge(num)
            break
    }
}

function animatePaper(num) {
    let attack
    if (num == 0) { // user is casting
        attack = spritePaper
        userSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.5, transform: 'translateX(30px)'},
            {offset: 1, transform: 'translateX(0px)'}
        ], {
            duration:333,
            iterations:3
        })
        foeSprite.animate([
            {offset: 0.44, transform: 'translateX(0px)'},
            {offset: 0.45, transform: 'translateX(20px)'},
            {offset: 0.55, transform: 'translateX(-20px)'},
            {offset: 0.56, transform: 'translateX(0px)'},
        ], {
            duration: 333,
            iterations: 3
        })
    }
    else if (num == 1) { // foe is casting 
        attack = spritePaperAlt
        foeSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.5, transform: 'translateX(-30px)'},
            {offset: 1, transform: 'translateX(0px)'}
        ], {
            duration:333,
            iterations:3
        })
        userSprite.animate([
            {offset: 0.44, transform: 'translateX(0px)'},
            {offset: 0.45, transform: 'translateX(-30px)'},
            {offset: 0.55, transform: 'translateX(30px)'},
            {offset: 0.56, transform: 'translateX(0px)'},
        ], {
            duration: 333,
            iterations: 3
        })
    }

    attack.classList.remove('hidden')
    attack.animate([
        {offset: 0, opacity: '100'},
        {offset: 0.02, opacity: '100', transform: 'scale(0.9)'},
        {offset: 0.3, opacity: '100', transform: 'scale(0.9)'},
        {offset: 0.31, opacity: '0', transform:'scale(0.9)'},
        {offset: 0.32, opacity: '0', transform: 'translateX(30px)'},
        {offset: 0.33, opacity: '100', transform: 'translateX(30px)'},
        {offset: 0.35, opacity: '100', transform: 'translateX(30px) scale(0.9)'},
        {offset: 0.63, opacity: '100', transform: 'translateX(30px) scale(0.9)'},
        {offset: 0.64, opacity: '0', transform: 'translateX(30px) scale(0.9)'},
        {offset: 0.65, opacity: '0', transform: 'translateY(-20px) translateX(15px)'},
        {offset: 0.66, opacity: '100', transform: 'translateY(-20px) translateX(15px)'},
        {offset: 0.68, opacity: '100', transform: 'translateY(-20px) translateX(15px) scale(0.9)'},
        {offset: 0.96, opacity: '100', transform: 'translateY(-20px) translateX(15px) scale(0.9)'},
        {offset: 1, opacity: '0', transform: 'translateY(-20px) translateX(15px) scale(0.9)'},
    ], {
        duration: 1000,
        iterations: 1,
    })
    audioPaper.play()
    audioPaper.loop = true
    audioPaper.playbackRate = 1.5
    setTimeout(() => {
        attack.classList.add('hidden')
        audioPaper.loop = false 
    }, 950);
}

function animateRock(num) {
    let attack
    if (num == 0) { // user is casting
        attack = spriteRock
        userSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.04, transform: 'translateX(30px)'},
            {offset: 0.8, transform: 'translateX(30px)'},
            {offset: 1, transform: 'translateX(0px)'}
        ], {
            duration:1000,
        })
        foeSprite.animate([
            {offset: 0, transform: 'translateY(0px)'},
            {offset: 0.05, transform: 'scale(1.4, 0.7) translateY(30px)'},
            {offset: 0.99, transform: 'scale(1.4, 0.7) translateY(30px)'}
        ], {
            duration:800
        })
    }
    else if (num == 1) { // foe is casting 
        attack = spriteRockAlt
        foeSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.04, transform: 'translateX(-20px)'},
            {offset: 0.8, transform: 'translateX(-20px)'},
            {offset: 1, transform: 'translateX(0px)'}
        ], {
            duration:1000,
        })
        userSprite.animate([
            {offset: 0, transform: 'translateY(0px)'},
            {offset: 0.05, transform: 'scale(1.4, 0.7) translateY(30px)'},
            {offset: 0.99, transform: 'scale(1.4, 0.7) translateY(30px)'}
        ], {
            duration:800
        })

    }

    attack.classList.remove('hidden')
    attack.animate([
        {offset: 0, transform: 'translateY(0px)'},
        {offset: 0.05, transform: 'translateY(22px)'},
        {transform: 'translateY(22px)'}
    ], {
        duration: 800
    })
    audioRock.play()
    setTimeout(() => {
        attack.classList.add('hidden')
    }, 750);
}

function animateScissor(num) {
    let attackArr
    if (num == 0) { // user is casting
        attackArr = spriteScissorArr 
        userSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.5, transform: 'translateX(30px)'},
            {offset: 1, transform: 'translateX(0px)'}
        ], {
            duration:50,
        })
        foeSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.49, transform: 'translateX(0px)'},
            {offset: 0.5, transform: 'translateX(-20px)'},
            {offset: 0.51, transform: 'translateX(20px)'},
            {offset: 0.52, transform: 'translateX(0px)'},
            {offset: 0.99, transform: 'translateX(0px)'}
        ], {
            duration:500
        })

    }
    else if (num == 1) { // foe is casting 
        attackArr = spriteScissorAltArr 
        foeSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.5, transform: 'translateX(-20px)'},
            {offset: 1, transform: 'translateX(0px)'}
        ], {
            duration:50,
        })
        userSprite.animate([
            {offset: 0, transform: 'translateX(0px)'},
            {offset: 0.49, transform: 'translateX(0px)'},
            {offset: 0.5, transform: 'translateX(30px)'},
            {offset: 0.51, transform: 'translateX(-30px)'},
            {offset: 0.52, transform: 'translateX(0px)'},
            {offset: 0.99, transform: 'translateX(0px)'}
        ], {
            duration:500
        })
    }

    audioScissor.play()
    attackArr[4].classList.remove('hidden')

    setTimeout(() => {
        attackArr[4].classList.add('hidden')
        attackArr[3].classList.remove('hidden')
    }, 70);
    setTimeout(() => {
        attackArr[3].classList.add('hidden')
        attackArr[2].classList.remove('hidden')
    }, 130);
    setTimeout(() => {
        attackArr[2].classList.add('hidden')
        attackArr[1].classList.remove('hidden')
    }, 190);
    setTimeout(() => {
        attackArr[1].classList.add('hidden')
        attackArr[0].classList.remove('hidden')
    }, 250);
    setTimeout(() => {
        attackArr[0].classList.add('hidden')
    }, 600);
}

function animateCharge(num) {
    let attackArr
    if (num == 0) { // user is casting
        attackArr = spriteChargeAltArr
    }
    else if (num == 1) { // foe is casting 
        attackArr = spriteChargeArr
    }

    audioCharge.play()
    attackArr[0].classList.remove('hidden')

    for (let i = 100; i < 1000; i += 200) {
        setTimeout(() => {
            attackArr[0].classList.add('hidden')
            attackArr[1].classList.remove('hidden')
        }, i);
        setTimeout(() => {
            attackArr[1].classList.add('hidden')
            attackArr[0].classList.remove('hidden')
        }, i+100);
    }
    setTimeout(() => {
        attackArr[0].classList.add('hidden')
        attackArr[2].classList.remove('hidden')
    }, 1100);
    setTimeout(() => {
        attackArr[2].classList.add('hidden')
    }, 1200);
}

function setDelay(moves) {
    switch(moves) {
        case moveList[0]: // rock 
            delay += 800
            break
        case moveList[1]: // scissor
            delay += 600
            break
        case moveList[2]: // paper
            delay += 1000
            break
        case moveList[3]: // charge
            delay += 1200
            break
    }
}

function navigateEnd(e) {
    if (e.key == 'p'){
        playButton()
        if (endCount == 0){
            // first
            audioBattle.pause()
            audioVictory.currentTime = 0
            audioVictory.play()
            audioVictory.volume = 0.2
            textBox.innerHTML = "ZIGZAGOON gained <br> 84 EXP. Points!"
            endCount++
        }

        else if (endCount == 1){
            // second
            let num = 30
            audioExp.currentTime = 0
            audioExp.play()
            for (let i = 0; i < 700; i += 10) {
                setTimeout(() => {
                    num += 1
                    userExp.style.width = num + '%'
                }, i);
            }

            // exp bar hits 100%
            setTimeout(() => {
                userHpBox.animate([
                    { transform: 'translateY(0px)'},
                    { transform: 'translateY(-5px)'},
                    { transform: 'translateY(0px)'}], {
                    duration: 100,
                    })

                // TODO animation of outline being light blue

                audioExp.pause()
                audioLevel.play()
                userHpBox.classList.add('lvlup')
                userLevel.innerHTML = 'Lv:19'
                userHP += 1
                updateHP(userHP,userHpGreen,userHpBlack, 65)
                userHpNum.innerHTML = userHP + "/ &nbsp 65"
                userExp.style.width = '0%'
            }, 700);

            // adds level up jingle and victory resumes after
            audioLevel.onended = function() {
                if (audioVictory.muted == false) {
                    audioVictory.pause() 
                    setTimeout(() => {
                        audioLevelSong.pause()
                        audioVictory.play() 
                    }, 1300);
                }
                audioLevelSong.play()
                textBox.innerHTML = 'ZIGZAGOON grew to <br> LV.19!'
            };
            endCount++
        }

        else if (endCount == 2){
            // third (show stats)
            spriteStatsBox.classList.remove('hidden')
            endCount++
        }

        else if (endCount == 3){
            // fourth (change stats)
            spriteStatsArr[0].innerHTML = '65' // hp
            spriteStatsArr[1].innerHTML = '38' // sp.atk
            spriteStatsArr[2].innerHTML = '38' // atk
            spriteStatsArr[3].innerHTML = '41' // sp.def
            spriteStatsArr[4].innerHTML = '45' // def
            spriteStatsArr[5].innerHTML = '50' // speed
            endCount++
        }

        else if (endCount == 4) {
            spriteStatsBox.classList.add('hidden')
            audioExp.currentTime = 0
            audioExp.play()
            setTimeout(() => {
                audioExp.pause()
            }, 240);
            userExp.style.width = '2%'

            setTimeout(() => {
                overlay.classList.add('overlay')
                overlay.innerHTML = 'Replay?'
            }, 2000);
            document.removeEventListener('keyup',navigateEnd)
        }
    }
}