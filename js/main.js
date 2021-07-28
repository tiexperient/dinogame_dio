const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;

//Declara-se let para que a variável se torne mutável
// position zero é a posição inicial do dinossauro
let position = 0;

function handKeuUp(event){
    if (event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}
function jump(){

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150){
            clearInterval(upInterval);
            //descendo...
            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //subindo...
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1010;
    let randomTime = Math.random() * 9000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => { 
        if(cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //Fim de jogo
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1><br><p class="game-start">Aperte F5 para reiniciar</p>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

    createCactus();
    document.addEventListener('keyup', handKeuUp);
  