const http = new XMLHttpRequest();


function toggleEmprunt(id, action){
    http.open("PATCH","/mediatheque/"+id+"/"+action);
    http.send();
}

http.onreadystatechange=function(e){
    if (http.responseText == "ok"){
        window.location.reload();
    }
}

