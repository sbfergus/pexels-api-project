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
                <a href="${pic.url}">
                    <img src="${pic.src.large}" alt="${pic.alt}" width=400>
                </a>
                <div class="pic-hover-info">

                    <div class="collect-like">
                        <div class="pic-top-flex">
                            <img class="icon bookmark" 
                                src="bookmark.png"
                                alt="collect">
                            <img class="icon heart"
                                src="heart.png"
                                alt="like">
                        </div>
                    </div>

                    <div class="artist-name">
                        <div class="pic-bottom-flex">
                            <a href="${pic.photographer_url}">
                                <div class="artist-flex">
                                    <img class="avatar" 
                                            src="https://images.pexels.com/lib/avatars/orange.png?w=40&h=40&fit=crop&dpr=1" 
                                            alt="">
                                    <h5>${pic.photographer}</h5>
                                </div>
                            </a>
                            <img class="icon download"
                                src="download-icon.png"
                                alt="download">
                        </div>    
                    </div>

                </div>
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
        gutter: 25
      });
      imagesLoaded( grid ).on( 'progress', function() {
        msnry.layout();
      });
      
      
    
    }
};
xhttp.open("GET", "https://api.pexels.com/v1/search?query=nature", true);
xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193');
xhttp.send();

const filters = document.querySelector('.filters');
const filterDropdown = document.querySelector('.filter-dropdown');
const filterIcon = document.querySelector('.filter-icon');
let rotated = false;

filters.addEventListener('click', function() {
    filterDropdown.classList.toggle("show-dropdown");
    if (rotated) {
        filterIcon.classList.add('rotate-up');
        rotated = false;
    } else {
        filterIcon.classList.remove('rotate-up')
        filterIcon.classList.add('rotate-down');
        rotated = true;
    }
})