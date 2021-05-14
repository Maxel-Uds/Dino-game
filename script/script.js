let dino = document.querySelector('.dino');
let img = document.createElement('img');
img.src = '../img/direita.png';
dino.appendChild(img);
const backgorund = document.querySelector('.background');
let gameOver = document.getElementById('game-over');
let isJumping = false;
let lose = false;
let position = 0;

function moveDino() 
{
    setTimeout(() => {
        dino.removeChild(img);
        img.src = '../img/esquerda.png';
        dino.appendChild(img);
    }, 500);

    setTimeout(() => {
        dino.removeChild(img);
        img.src = '../img/direita.png';
        dino.appendChild(img);
    }, 600);

    if(!lose)
    {
        setTimeout(moveDino, 150);
    }
}

function handleKeyDown(event)
{
    if(event.keyCode == 32 || event.keyCode == 38 && !lose)
    {
        if(!isJumping)
        {
            Jump();
        }
    }
}

function Jump()
{
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 150)
        {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0)
                {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else if(!lose)
                {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }
        else if(!lose)
        {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus()
{
    const cactus = document.createElement('div');
    let cactusPosition = 1310;
   

    cactus.classList.add('cactus');
    cactus.style.left = 1310 + 'px';
    backgorund.appendChild(cactus);


    let leftInterval = setInterval(() => {
        if(cactusPosition < -60)
        {
            clearInterval(leftInterval);
            backgorund.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60)
        {
            gameOver.innerHTML = 'Game Over';
            dead();
        }
        else if(!lose)
        {
            cactusPosition -= 11;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    if(!lose)
    {
        setTimeout(createCactus, Math.floor(Math.random() * (1500 - 700) + 700));
    }
}

function dead()
{
    lose = true;
    dino.removeChild(img);
    img.src = '../img/morto.png'
    dino.appendChild(img);
}

moveDino();
createCactus();
document.addEventListener('keydown', handleKeyDown);