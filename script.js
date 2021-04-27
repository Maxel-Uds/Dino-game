const dino = document.querySelector('.dino');
const backgorund = document.querySelector('.background')
let isJumping = false;
let position = 0;

function handleKeyDown(event)
{
    if(event.keyCode == 32 || event.keyCode == 38)
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
                else
                {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }
        else
        {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus()
{
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 3000; 

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    backgorund.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60)
        {
            clearInterval(leftInterval);
            backgorund.removeChild(cactus);
        }
        else if(cactusPosition > 0 && cactusPosition < 60 && position < 60)
        {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Game Over</h1>';
        }
        else
        {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keydown', handleKeyDown);