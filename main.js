document.addEventListener('DOMContentLoaded', () => {
    let array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

    let firstCard; 
    let secondCard;
    let turnCard = false;
    let cardNum;
    let lockCard = false;
    let text;

    const btn = document.querySelector('button');
    btn.classList.add('btn');

    function shuffleArray(card) {
        for (let i = card.length - 1; i > 0; i--) {
            cardNum = Math.floor(Math.random() * (i + 1));
            let temp = card[i];
            card[i] = card[cardNum];
            card[cardNum] = temp;
        }
        return card
    };
    
    const div = document.querySelector('div');
    div.classList.add('container');

    const ul = document.querySelector('ul');
    ul.classList.add('container__list');

    function createList() {
        let shake = shuffleArray(array);
        
        for(let i = 0; i < shake.length; ++i) {
            
            let li = document.createElement('li');
            ul.appendChild(li);
            li.classList.add('container__item');
            li.setAttribute('data-num', '');
            li.dataset.num = shake[i];
            
            li.addEventListener('click', flipCard);
                        
        }
        
    }
    createList();

    function flipCard() {
        const items = document.querySelectorAll('li');
        if(lockCard) return;
        if (this === firstCard) return;

        this.classList.add('active'); 

        let sum = 0;
        items.forEach(function(item) {
            
            if(item.classList.contains('active')) {
                item.innerHTML = item.dataset.num;
                sum++;
            }
        });

        if(sum == 16) {
            setTimeout(() => {
                cleanList();
                text = document.createElement('p');
                div.appendChild(text);
                text.classList.add('text');
                
                text.innerHTML = 'Congratulations! Game over';
            }, 1500);
            
        }

        if(!turnCard) {
            turnCard = true;
            firstCard = this;
            return
        };

        secondCard = this;

        mathChecked()
    }

    function mathChecked() {
        if(firstCard.innerHTML == secondCard.innerHTML) {
            disableCards();
            return
        }

        unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetCard();
    }

    function unflipCards() {
        lockCard = true;

        setTimeout(() => {
        firstCard.classList.remove('active');
        firstCard.innerHTML = '';
        secondCard.classList.remove('active');
        secondCard.innerHTML = '';
        resetCard();
        }, 1500);
    }

    function resetCard() {
        [turnCard, lockCard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function cleanList () {
        let list = document.querySelectorAll('li').length;
        
        if(list != '0') {
            console.log(list)
            document.querySelectorAll('li').forEach(function(x) {
                
                ul.removeChild(x);
            })
        }
        
        return
    }

    btn.addEventListener('click', function () {
        div.removeChild(text);
        cleanList();
        createList()
    })
        

});