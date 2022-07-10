//563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(xhttp.responseText);
       var photos = data.photos;
       console.log(photos);
       var grid = document.querySelector('.grid');
       
       grid.innerHTML = '';
       photos.forEach(function(pic) {
            var picture = document.createElement('div');
            picture.classList.add('grid-item');
            picture.innerHTML = `
                <img src="${pic.src.large}" alt="${pic.alt}" width=400>
                
                <div class="artist-name">${pic.photographer}</div>
            `;
            picture.addEventListener('mouseover', function() {
                    this.children[1].classList.add('active');
            });
            picture.addEventListener('mouseout', function() {
                this.children[1].classList.remove('active');
            });
                
        
        grid.appendChild(picture);
            
       });
       var msnry = new Masonry( grid, {
        itemSelector: '.grid-item',
        fitWidth: true,
        gutter: 10
      });
      
       
    }
};
xhttp.open("GET", "https://api.pexels.com/v1/search?query=nature", true);
xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193');
xhttp.send();

