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