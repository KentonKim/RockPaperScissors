const menuOptions = document.querySelectorAll('.menu-option')
const audioButton = document.querySelector('#audio-button')
const textBox   = document.querySelector('.chat-inner')

const menuFight = menuOptions[0]
const menuBag   = menuOptions[2]
const menuPk    = menuOptions[1]
const menuRun   = menuOptions[3]
const select    = 'select'

// Dialogue

document.addEventListener('keyup',moveMenu)
menuFight.classList.add(select)

function moveMenu(e) {
    switch(e.key) {
        case 'w' : // up 
            if (menuPk.classList.contains(select)) {
                menuFight.classList.add(select)
                menuPk.classList.remove(select)
                playButton()
            }
            if (menuRun.classList.contains(select)) {
                menuBag.classList.add(select)
                menuRun.classList.remove(select)
                playButton()
            }
            break
        case 'a' : // left
            if (menuBag.classList.contains(select)) {
                menuFight.classList.add(select)
                menuBag.classList.remove(select)
                playButton()
            }
            if (menuRun.classList.contains(select)) {
                menuPk.classList.add(select)
                menuRun.classList.remove(select)
                playButton()
            }
            break
        case 's' : // down
            if (menuFight.classList.contains(select)) {
                menuPk.classList.add(select)
                menuFight.classList.remove(select)
                playButton()
            }
            if (menuBag.classList.contains(select)) {
                menuRun.classList.add(select)
                menuBag.classList.remove(select)
                playButton()
            }
            break
        case 'd' : // right
            if (menuFight.classList.contains(select)) {
                menuBag.classList.add(select)
                menuFight.classList.remove(select)
                playButton()
            }
            if (menuPk.classList.contains(select)) {
                menuRun.classList.add(select)
                menuPk.classList.remove(select)
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
