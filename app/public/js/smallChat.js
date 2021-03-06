
$.get("elements/smallChat.html", function(data) {


  $("body").append(data);

}).then(function() {
  

//PERIODICAMENTE VERIFICA SE È NECESSARIO UN AGGIORANMETNO DEI DATI DI USER,CHAT E CODE DI RICEZIONE NEL LOCAL STORAGE

setInterval(function(){ 
  if (localStorage.user!=undefined){
    var toRef={
      id:JSON.parse(localStorage.user)._id,
      rev:JSON.parse(localStorage.user)._rev,
      
    }
    updateLocalStorage(toRef,"user",()=>{});
    var chatList=JSON.parse(localStorage.user).chatList;
    if (chatList.length!=0){
      for (i in chatList){
        if (JSON.parse(localStorage.getItem("chat:"+chatList[i][1])) == undefined){
            var toR={
            id:"chat:"+chatList[i][1],
            rev:"o",
          }
          doSend(JSON.stringify({"todo":"newChat","data":chatList[i][1]}));
        }
        else {
          var toR={
            id:"chat:"+chatList[i][1],
            rev:JSON.parse(localStorage.getItem("chat:"+chatList[i][1]))._rev,
          }
        }
        updateLocalStorage(toR,toR.id,caricaListaChat);
        var usnm=JSON.parse(localStorage.user).username;
        if (JSON.parse(localStorage.getItem("codaChat:"+usnm+chatList[i][1])) == undefined){
          var toRe={
          id:"codaChat:"+usnm+chatList[i][1],
          rev:"o",
        }
      }
      else {
        var toRe={
          id:"codaChat:"+usnm+chatList[i][1],
          rev:JSON.parse(localStorage.getItem("codaChat:"+usnm+chatList[i][1]))._rev,
        }
      }
      updateLocalStorage(toRe,toRe.id,()=>{});
        }
        
      }
      
    }
  }, 1000);

  initWebSocket();

  //APERTURA DELLA FINESTRA DELLA CHAT
    $("#tondoChat").click(function(){
    $(this).hide();
    $("#chat").show();
  });


  $(".closeChat").click(function(){c()});

  //UN CLICK ESTERNO AL BOX DELLA CHAT LA FARÀ CHIUDERE
  $(document).mouseup(function (e) {
    if ($(e.target).closest(".chat").length=== 0) {c();}
});

  
  //BOTTONE PER LA LISTA DELLE CHAT
  $("#leMieChat").click(function(){
    $("#startBtn").hide();
    caricaListaChat();
    $("#listaChat").show();
  });


  //BOTTONE PER LA SEZIONE DI CREAZIONE DI UNA NUOVA CHAT
  $("#nuovaChat").click(function(){
    $("#startBtn").hide();
    caricaListaAmici();
    $("#creaNuovaChat").show();
  });


  //BOTTONE ASSOCIATO AD OGNI ELEMENTO NELLA LISTA DELLE CHAT
  $(".chatListEl").click(function (){
    var n=(this.getElementsByClassName("nomeChat")[0]).textContent;
    $("#listaChat").hide();
    setChatHeader(n);
    $(".closeChat").before("<span class='badge miobadgechat rounded-pill settingChat' id='settingChat'"+n+" style='position: absolute; top: 3px; right:35px'><i class='fas fa-door-open'></i></i></span>");
    var tooltip = new bootstrap.Tooltip(document.getElementById("settingChat"), {title:"lascia la chat",trigger : 'hover'});

    settingChatClick(n);
    printMSG((this.getElementsByClassName("nomeChat")[0]).textContent);
   $("#chatShow").show();
   document.getElementsByClassName("messaggio")[document.getElementsByClassName("messaggio").length-1].scrollIntoView();    
  });


  //FUNZIONE CHE GESTICSE IL COMPORTAMENTO DEL TASTO goBackChat PER ANDARE ALLA SEZIONE PRECEDENTE
  $(".goBackChat").click(function(){
    if ($("#startBtn").css("display")!="none") c(); 
    else if ($("#listaChat").css("display")!="none"){
      $("#listaChat").hide();
      $("#startBtn").show();
    }
    else if ($("#chatShow").css("display")!="none"){
      setChatHeader("Chat");
      $("#testoMessaggio").val("");
      $("#containerMex").html("");
      $("#chatShow").hide();
      caricaListaChat();
      $("#listaChat").show();
      $(".settingChat").remove();
    }
    else if ($("#creaNuovaChat").css("display")!="none"){
      $("#creaNuovaChat").hide();
      $("#nomeNuovaChat").val("");
      $("#startBtn").show();
    }
  })


  //FUNZIONE PER INVIARE UN MESSAGGIO
  $("#invia").click(function(){
    var txtmx=$("#testoMessaggio").val();
    if (txtmx!=""){
      var messaggio={
        id_messaggio: "",
        mittente: JSON.parse(localStorage.user).username,
        nome:JSON.parse(localStorage.user).nome,
        testo: txtmx,
        timestamp:Date().split(" ").slice(1,5),
        stop:0
      }
    $("#testoMessaggio").val("");
    var chat_name=$(".chatNome").text();
    var index= JSON.parse(localStorage.user).chatList.findIndex(arr => arr.includes(chat_name));
    var ex=JSON.parse(localStorage.user).chatList[index][1];
    var toSend={
      messaggio:messaggio,
      ex:ex
    }
    $('#containerMex').append(stampa(messaggio));
    document.getElementsByClassName("messaggio")[document.getElementsByClassName("messaggio").length-1].scrollIntoView();  
    $.ajax({
      type: 'POST',
      data: JSON.stringify(toSend),
      contentType: 'application/json',
      url: 'https://localhost:8887/chat/invia',						
      success: function(data) {
        console.log("inviato");
    }
   })
  }
})
  

  //FUNZIONE ASSOCIATA CLICK DEL TASTO PER CREARE UNA NUOVA CHAT
  $("#inviaNuovaChat").click(function(){
    if ($("#nomeNuovaChat").val()==""){
      var tooltip = new bootstrap.Tooltip(document.getElementById("nomeNuovaChat"), {title:"inserisci un nome per la chat",trigger : 'hover'});
      tooltip.show();
      return false;
    }
    else if ($("#nomeNuovaChat").val().length>18){
      var tooltip = new bootstrap.Tooltip(document.getElementById("nomeNuovaChat"), {title:"il nome della chat è troppo lungo",trigger : 'hover'});
      tooltip.show();
      return false;
    }
    var membri=[];
    membri.push(JSON.parse(localStorage.user).username)
    var items = document.getElementById("listaAggiungiAmici").getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
      if(items[i].getElementsByTagName("input")[0].checked==true){
        membri.push(items[i].getElementsByTagName("label")[0].textContent);
      }
  }
  var chat={
    chat_name:$("#nomeNuovaChat").val(),
    chat_members:membri
  }
  
$('.goBackChat').trigger('click'); 

  $.ajax({
    type: 'POST',
    data: JSON.stringify(chat),
    contentType: 'application/json',
    url: 'https://localhost:8887/chat/creaChat',			//CREA CHAT E CODE DI RICEZIONE CON RABBITMQ E LE SALVA SUL DATABASE		
    success: function(data) {
      console.log(JSON.stringify(data));
      doSend(JSON.stringify({"todo":"newChat", "data":data}));
      }
    });    
  }) 
});

//#########################################
function initWebSocket()
{
  websocket = new WebSocket("wss://localhost:8887/ws/");
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
  console.log("CONNECTED");
  var listaEx=JSON.parse(localStorage.user).chatList.map(x=>x[1]);
  doSend(JSON.stringify({"todo":"setUserConnection", "data":{"user":JSON.parse(localStorage.user).username, "chatList":listaEx}}));
}

function onClose(evt)
{
  console.log(evt.reason)
  console.log("DISCONNECTED");
}

function onMessage(evt)
{

  console.log(JSON.parse(evt.data));
  $('#containerMex').append(stampa(JSON.parse(evt.data)));
  document.getElementsByClassName("messaggio")[document.getElementsByClassName("messaggio").length-1].scrollIntoView();  

}

function onError(evt)
{
  console.log(evt.data);
}

function doSend(message)
{
  console.log("SENT: " + message);
  websocket.send(message);
}


//##########################################

//FUNZIONE PER LA CHIUSURA DEL BOX DELLA CHAT
function c(){
  $("#chat").css("display","none");
  $("#tondoChat").show();
}


//L'HEADER DELLA CHAT VIENE SETTATO IN BASE ALLA CHAT IN CUI CI SI TROVA
function setChatHeader(nome){
  $(".chatNome").text((nome));
}


//FUNZIONE CHE STAMPA UN MESSAGGIO NEL BOX DEI MESSAGGI DI UNA CHAT
function stampa(el){
  var ora=el.timestamp[3];
  var data=el.timestamp[0]+"/"+el.timestamp[1]+"/"+el.timestamp[2];
  
  var mio =JSON.parse(localStorage.user).username //username
  

  if(el.mittente==mio){
      var mex="<div class='messaggio'><div class='nomeMio'>"+"<br>"+ora+"&nbsp;&nbsp;&nbsp;"+data+"</div><div class='textmsgMio'>"+el.testo+"</div></div>";
  }
  else{
    var mex="<div class='messaggio'><div class='nomeTuo'>"+el.nome+"<br>"+ora+"&nbsp;&nbsp;&nbsp;"+data+"</div><div class='textmsgTuo'>"+el.testo+"</div></div>";
  }
  return mex;
}


//FUNZIONE CHE CARICA LA LISTA DELLE CHAT QUANDO CI SI TROVA NELLA SEZIONE APPOSITA E SI RICEVE UN AGGIORNAMENTO SULLA LISTA DELLE CHAT DELL'USER
function caricaListaChat(){
  $(".chatList").html("");
  
  var l=JSON.parse(localStorage.user).chatList;
  if (l.length>0){
  for (var i in l){
    var c=l[i][0];
    var ex=l[i][1];
    var usname=JSON.parse(localStorage.user).username;
    var queue=JSON.parse(localStorage.getItem("codaChat:"+usname+ex));
    if (queue!=null ){
    var display="block";
    if (queue.to_consume=="n") display="none";
    $(".chatList").append("<li class='list-group-item chatListEl d-flex justify-content-between align-items-start'>\
                            <div class='nomeChat'>"+c+"</div>\
                              <span class='badge miobadgechat rounded-pill counterChat' id='counterChat"+c+"' style='margin-top: 4px; display:"+display+";'>NEW</span>\
                          </li>");
    }
  }
    //GESTIONE DEL CLICK PER I NUOVI ELEMENTI INSERITI
    $(".chatListEl").click(function (e){
      $("#listaChat").hide();
      setChatHeader((this.getElementsByClassName("nomeChat")[0]).textContent);
      $(".closeChat").before("<span class='badge miobadgechat rounded-pill settingChat' id='settingChat'"+c+" style=' position: absolute; top: 3px; right:35px'><i class='fas fa-door-open'></i></i></span>")
      var tooltip = new bootstrap.Tooltip(document.getElementById("settingChat"), {title:"lascia la chat",trigger : 'hover'});
      //tooltip.show();
      settingChatClick(c);
      printMSG((this.getElementsByClassName("nomeChat")[0]).textContent);
      $("#chatShow").show();
      document.getElementsByClassName("messaggio")[document.getElementsByClassName("messaggio").length-1].scrollIntoView();  
      
    });
  
  }
}


//FUNZIONE CHE CARICA LA LISTA DEI SEGUITI NELLA SEZIONE DI CREAZIONE DI UNA NUOVA CHAT
function caricaListaAmici(){
  $("#listaAggiungiAmici").html("");
  var l=JSON.parse(localStorage.user).friendList;
  if (l!=null){
  for (var i in l){
    var c=l[i];
    $("#listaAggiungiAmici").append('<li class="list-group-item" style="height: 50px;"> \
                                      <div class="custom-control custom-checkbox" style="height: 31px;text-align: left;">\
                                        <span>\
                                          <input class="custom-control-input" id="customCheck'+c+'" type="checkbox" style="position: relative;margin-top: 10px;">\
                                          <label class="cursor-pointer font-italic custom-control-label" for="customCheck'+c+'" style="font-size: 16px;margin-left: 5px;">'+c+'</label>\
                                        </span>\
                                      </div>\
                                    </li>')
    }
  }
}
                                        

//FUNZIONE CHE AGGIORNA IL VALORE DELA CHIAVE KEY DEL LOCAL STORAGE E SE NECESSARIO 
//(toRef contiene il campo _rev, se non è uguale a quello sul database si riceve come rispota l'aggiornamento)
//AFTER È UNA FUNZIONE DI CALLBACK
function updateLocalStorage(toRef,key,after){
  $.ajax({
    type: 'POST',
    data: JSON.stringify(toRef),
    contentType: 'application/json',
    url: 'https://localhost:8887/chat/update',						
    success: function(data) {
      var res=JSON.parse(data);
      if (res.update=="y")  {
        console.log("-----UPDATE-----");
        localStorage.setItem(key,JSON.stringify(res.doc));
        after(res.doc);
      }
      else{
        after(JSON.parse(localStorage.getItem(key)));
      }        
    }
  });
}


//FUNZIONE ASSOCIATA AL TASTO PER USCIRE DA UNA CHAT
function settingChatClick(n) {
  $(".settingChat").click(function(){
    $(this).tooltip('hide');
    $(".settingChat").remove();
    var user=JSON.parse(localStorage.user).username;
    var chat=document.getElementsByClassName("chatNome")[0].innerText;
    var index= JSON.parse(localStorage.user).chatList.findIndex(arr => arr.includes(chat));
    var ex=JSON.parse(localStorage.user).chatList[index][1];
    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        user:user,
        ex:ex
      }),
      contentType: 'application/json',
      url: 'https://localhost:8887/chat/esci',						
      success: function(data) {
          doSend(JSON.stringify({"todo":"quitChat","data":{"user":user,"exchange":ex}}));
          console.log("uscito dalla chat");
          var x=JSON.parse(localStorage.user);
          var index= x.chatList.findIndex(arr => arr.includes(chat));
          x.chatList.splice(index,1);
          localStorage.setItem("user",JSON.stringify(x));
          localStorage.removeItem("chat:"+ex);
          console.log(ex);
          localStorage.removeItem("codaChat:"+user+ex);
          $('.goBackChat').trigger('click'); 
          $('.goBackChat').trigger('click'); 
      }   
    });    
  });
}


//FUNZIONE CHE APRE UNA CONNESSIONE CON IL MESSAGE BROKER RABBITMQ SE NON È GIÀ APERTA
function ascoltaChat(item){ 
  if (item.is_listening=="n"){
  $.ajax({
    type: 'POST',
    data: JSON.stringify({
      username:item.user,
      exchange:item.chat_id
    }),
    contentType: 'application/json',
    url: 'https://localhost:8887/chat/ascolta',						
    success: function(data) {
      var toChange=JSON.parse(localStorage.getItem("codaChat:"+item.user+item.chat_id));
      toChange.is_listening="y";
      localStorage.setItem("codaChat:"+item.user+item.chat_id,JSON.stringify(toChange))
      console.log("now listening");
      var lis=JSON.parse(data).list;
     if (lis!=[]){
        for (var k in lis){
          var me=JSON.parse(lis[k])
          if (me.mittente!=item.user){
            $('#containerMex').append(stampa(me));
            } 
          } 
        }
      }   
  });
  }
  var index= JSON.parse(localStorage.user).chatList.findIndex(arr => arr.includes(item.chat_id));
  var nc=JSON.parse(localStorage.user).chatList[index][0];
  if (nc==document.getElementsByClassName("chatNome")[0].innerText){
      if (JSON.parse(localStorage.getItem("codaChat:"+item.user+item.chat_id)).to_consume=="y"){
        //$('#containerMex').html("");
        //printMSG(nc);
        document.getElementsByClassName("messaggio")[document.getElementsByClassName("messaggio").length-1].scrollIntoView();   

        $.ajax({
          type: 'POST',
          data: JSON.stringify({
            username:item.user,
            exchange:item.chat_id
          }),
          contentType: 'application/json',
          url: 'https://localhost:8887/chat/consume',						
          success: function(data) {
            var toC=JSON.parse(localStorage.getItem("codaChat:"+item.user+item.chat_id));
            toC.to_consume="n";
            localStorage.setItem("codaChat:"+item.user+item.chat_id,JSON.stringify(toC));
            }   
        });
      }
  }

}


//FUNZIONE CHE STAMPA LA LISTA DI MESSAGGI DI UNA CHAT, INVOCATA QUANDO SI RICEVONO NUOVI MESSAGGI O QUANDO SI APRE LA CHAT PER LA PRIMA VOLTA
function printMSG(chat_name){
  var index= JSON.parse(localStorage.user).chatList.findIndex(arr => arr.includes(chat_name));
  var ex=JSON.parse(localStorage.user).chatList[index][1];
  var user=JSON.parse(localStorage.user).username;
  var listaMsg=JSON.parse(localStorage.getItem("codaChat:"+user+ex)).messaggi;
  var sorted=listaMsg.sort((a,b)=>{
    var t1=a.timestamp[3].split(":");
    var t2=b.timestamp[3].split(":");
    var d1=new Date(a.timestamp[2],new Date(Date.parse(a.timestamp[0] +" 1, 2012")).getMonth(),a.timestamp[1],t1[0],t1[1],t1[2]);
    var d2=new Date(b.timestamp[2],new Date(Date.parse(b.timestamp[0] +" 1, 2012")).getMonth(),b.timestamp[1],t2[0],t2[1],t2[2]);
    if (d1>d2) return 1;
    else if (d1<d2) return -1;
    else return 0;
  });
  $("#containerMex").html("");
  for (var i in sorted){
    $('#containerMex').append(stampa(sorted[i]));
  }
  if (JSON.parse(localStorage.getItem("codaChat:"+user+ex)).to_consume=="y"){  

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        username:user,
        exchange:ex
      }),
      contentType: 'application/json',
      url: 'https://localhost:8887/chat/consume',						
      success: function(data) {
        var toC=JSON.parse(localStorage.getItem("codaChat:"+user+ex));
        toC.to_consume="n";
        localStorage.setItem("codaChat:"+user+ex,JSON.stringify(toC));
        }   
    });
  }
}

