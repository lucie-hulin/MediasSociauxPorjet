
token = localStorage.token;

loadLastPostInsta(token);
loadInstaUsername(token);
loadInstatemps(token);


document.body.onload = ecritureHTML(token);

function ecritureHTML(token) {
    localStorage.clear();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://graph.instagram.com/me/media?fields=media_url,caption,timestamp&access_token='+token
    );
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let reponse = JSON.parse(xhr.responseText);
            console.log(reponse);
            let element = document.getElementById("res");
            //while (element.firstChild) element.removeChild(element.firstChild);
            for (let i=0; i< reponse.data.length; i++)
            {
                console.log("for");
                let para = document.createElement("div");
                // image
                let img = document.createElement("img");
                let att = document.createAttribute("src");
                att.value = reponse.data[i].media_url;
                img.setAttributeNode(att);
                para.appendChild(img);

                let content = document.createElement("div");

                // description
                let desc = document.createElement("p");
                text = document.createTextNode(reponse.data[i].caption);
                desc.appendChild(text);
                content.appendChild(desc);
                para.appendChild(content);

                // temps
                let p = document.createElement("p");
                temps = reponse.data[i].timestamp;
                let date = new Date(temps);
                let dateformat = `le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                let datefinale = document.createTextNode(dateformat);
                desc.appendChild(datefinale);
                content.appendChild(p);
                para.appendChild(content);
                element.appendChild(para);
            }
            element.appendChild(document.createTextNode("coucou"));
        }
    };
    xhr.send();

}


function loadLastPostInsta() {
    localStorage.clear()
    var xhr = new XMLHttpRequest();
    let caption = [];
    let url = [];
    let tps = [];
    xhr.open('GET', 'https://graph.instagram.com/me/media?fields=media_url,caption,timestamp&access_token='+token
    );
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let reponse = JSON.parse(xhr.responseText);for (var i=0; i< reponse.data.length; i++)
            {
                caption.push(reponse.data[i].caption);
                url.push(reponse.data[i].media_url);
                tps.push(reponse.data[i].timestamp);
            }
console.log(caption,url,tps);
            document.getElementById("premierpostdescription").value=caption[0] ;
            let image1 = document.getElementById("premierposturl") ;
            image1.getAttribute('src');
            image1.setAttribute('src', url[0]);
            var premierpost = tps[0];
            var date = new Date(premierpost);
            var firstpost = `le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            document.getElementById("premierposttps").value=firstpost ;
        }
    };
    xhr.send();

}

function loadInstaUsername(token) {
    localStorage.clear();
    var username ;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://graph.instagram.com/me/media?fields=username&access_token='+token
    );
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let reponse = JSON.parse(xhr.responseText);
            username = reponse.data[0].username;
            console.log(username);
            document.getElementById("user").value=username ;
        }
    };
    xhr.send();
}

function loadInstatemps(token) {
    localStorage.clear();
    var temps = [] ;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://graph.instagram.com/me/media?fields=timestamp&access_token='+token
    );
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let reponse = JSON.parse(xhr.responseText);
            for (var i=0; i< reponse.data.length; i++)
            {
                temps.push(reponse.data[i].timestamp);
            }
            console.log(temps);
            var lastpost = temps[0];
            console.log(lastpost);
            var date = new Date(lastpost);
            var datestring = `le ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            document.getElementById("last").value=datestring ;
        }
    };
    xhr.send();
}

