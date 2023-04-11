const word_el=document.getElementById('word');
const popup=document.getElementById('popup-container');
const wrongLetters_el=document.getElementById('wrong-letters');
const items=document.querySelectorAll('.item');
const message_el=document.getElementById('sucess-message');
const message_girilmisharf=document.getElementById('message');
const playagainbtn=document.getElementById('play-again');


const correctLetters=[];
const wrongLetters=[];
let selectedWord=getRandomWord();

function getRandomWord(){
    const words=["javascrıpt","java","python","css"];
    return words[Math.floor(Math.random()*words.length)];
}


function displayword(){
    word_el.innerHTML=`
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter:''}
            </div>
        `).join('')}
    `;

    const w = word_el.innerText.replace(/\n/g,'');
    if(w === selectedWord){
        popup.style.display='flex';  
        message_el.innerText='Tebrikler Kazandınız...';
    }

}

function updateWrongLetters(){
    wrongLetters_el.innerHTML= `
        ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
    `;

    items.forEach((item,index) =>{
        const errorCount =wrongLetters.length;

        if(index<errorCount){
            item.style.display='block';
        }
        else{
            item.style.display='none';
            
        }
    })

    if(wrongLetters.length ===items.length){
        popup.style.display='flex'; 
        message_el.innerText='Malesef Kaybettiniz...';
    }
}

function displayMessage(){
    message_girilmisharf.classList.add('show');

    setTimeout(function(){
        message_girilmisharf.classList.remove('show');

    },2000);

}

playagainbtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord=getRandomWord();
    displayword();
    updateWrongLetters();

    popup.style.display='none';
});

window.addEventListener('keydown',function(e){
    if(e.keyCode >=65 && e.keyCode<=90){
        const letter=e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayword();  
            }
            else{
                //bu harf zaten girildi
                displayMessage();
                
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                //hatalı harfleri güncelle
                updateWrongLetters();
            }
            else{
                displayMessage();
            }
        }
       
    }
    
});

displayword();