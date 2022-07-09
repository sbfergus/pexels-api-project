//563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(xhttp.responseText);
       var photos = data.photos;
       console.log(photos);
       var container = document.getElementById('container');
       container.innerHTML = '';
       photos.forEach(function(pic) {
            var picture = document.createElement('div');
            picture.classList.add('picture');
            picture.innerHTML = `
                <img src="${pic.src.large}" width=400>
            `;
            container.appendChild(picture);
            
       });
       
    }
};
xhttp.open("GET", "https://api.pexels.com/v1/search?query=nature", true);
xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193');
xhttp.send();

