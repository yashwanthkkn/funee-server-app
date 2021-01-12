// const shareData = {
//     title: 'MDN',
//     text: 'Learn web development on MDN!',
//     url: 'https://developer.mozilla.org',
//   }
  
//   const btn = document.querySelector('#share');
  
//   // Must be triggered some kind of "user activation"
//   btn.addEventListener('click', async () => {
//     try {
//       await navigator.share(shareData)
//     } catch(err) {
//         console.log(err)
//     }
//   });

function copyText(id){
    
    var copyTextarea = document.getElementById("share");
    copyTextarea.select(); 
    copyTextarea.setSelectionRange(0, 99999);
    document.execCommand("copy"); 
}

function submitForm(side){
    var form = document.querySelector('#commentForm')
    var input = document.querySelector('#comment')
    var temp = form.getAttribute('action') 
    if(input.value){
        var url = form.getAttribute('action') + `/${side}`;
        form.setAttribute('action',url);
        form.submit();
    }else{
        alert("Cannot post an Empty comment");
    }
    form.setAttribute('action',temp);
}