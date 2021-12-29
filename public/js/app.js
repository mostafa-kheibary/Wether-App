const Modal = document.querySelector('.modal');
const ChangeLoc = document.querySelector('.change-location');



// event lithener
ChangeLoc.addEventListener('click',() =>{
    ShowModal();
});



// function
function ShowModal(){
    Modal.classList.add('show-modal');
    Modal.addEventListener('click',(e)=>{
        if(e.target.tagName == 'I'){
            Modal.classList.remove('show-modal');
        }
    })
}