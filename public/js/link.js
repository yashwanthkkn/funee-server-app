

async function copyText(id){
    var copyTextarea = document.getElementById("share");
    const shareData = {
        title: 'Funee.in',
        text: 'Send Your Friend a Secret Message',
        url: copyTextarea.value,
    }
    try {
        await navigator.share(shareData)
      } catch(err) {
          console.log(err)
    }
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