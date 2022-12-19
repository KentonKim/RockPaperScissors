const menuOptions = document.querySelectorAll('.menu-option')
const audioButton = document.querySelector('#audio-button')
const ppBox = document.querySelector("#pp-main")
const menuBox = document.querySelector("#menu-main")
const emptyBox = document.querySelector(".empty")
const textBox   = document.querySelector('.chat-inner')
let menuState = 1

const menuTL = menuOptions[0]
const menuTR   = menuOptions[2]
const menuBL    = menuOptions[1]
const menuBR   = menuOptions[3]
const select    = 'select'

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
            break
    } 
}

function playButton() {
    audioButton.pause();
    audioButton.currentTime = 0;
    audioButton.play()
}

function exitMenu(e) {
    if (menuState == 1 && e.key == "p") {
        if (menuTL.classList.contains(select)) {
            ppBox.classList.remove("hidden")
            emptyBox.classList.add("hidden")
            menuBox.style.flex = "3"
            playButton()
            menuState = 2 // attack menu
        }
        else if (menuTR.classList.contains(select)) {
            menuBox.classList.add("hidden")
            playButton()
            menuState = 0 // dialogue
        }
        else if (menuBL.classList.contains(select)) {
            menuBox.classList.add("hidden")
            playButton()
            menuState = 0
        }
        else if (menuBR.classList.contains(select)) {
            menuBox.classList.add("hidden")
            playButton()
            menuState = 0
        }
    }
    else if (menuState == 2 && e.key == "o") {
        ppBox.classList.add('hidden')
        emptyBox.classList.remove("hidden")
        menuBox.style.flex = "4"
        menuState = 1
        playButton()
    }
    
}