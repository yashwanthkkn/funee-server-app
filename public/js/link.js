$(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
  });

async function copyText(id){
    var copyTextarea = document.getElementById("share");
    var uname = document.getElementById('uname').innerText;
    const shareData = {
        title: 'Funee.in',
        text: `Send Your Friend *${uname}* a Secret Message`,
        url: copyTextarea.value
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

function showMenu(uuid){
    var trg = document.querySelector('#trgBtn');
    var msg = document.getElementById(`${uuid}`);
    var input = document.querySelector('#msg');
    var reportForm = document.querySelector('#reportMsgForm');
    var temp = reportForm.getAttribute('action');
    var url = `${temp}/report/${uuid}`;
    reportForm.setAttribute('action',url)
    console.log(msg.innerHTML);
    input.value = msg.innerHTML;
    trg.click();
}

