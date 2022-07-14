//563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193
var searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
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
                                    src="images/bookmark.png"
                                    alt="collect">
                                <img class="icon heart"
                                    src="images/heart.png"
                                    alt="like">
                            </div>
                        </div>

                        <div class="artist-name">
                            <div class="pic-bottom-flex">
                                <a href="${pic.photographer_url}">
                                    <div class="artist-flex">
                                        <img class="avatar" 
                                                src="https://images.pexels.com/lib/avatars/orange.png?w=40&h=40&fit=crop&dpr=1" 
                                                alt="artist avatar photo">
                                        <h5>${pic.photographer}</h5>
                                    </div>
                                </a>
                                <img class="icon download"
                                    src="images/download-icon.png"
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
    var searchValue = document.querySelector('#search-bar').value;
    var searchName = document.querySelector('#search-name');
    searchName.textContent = searchValue;
    searchName.style.textTransform = "capitalize";

    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchValue}`, true);
    xhttp.setRequestHeader('Authorization', '563492ad6f91700001000001161560f93ba9468a8b2a5cfd7aecf193');
    xhttp.send();
});



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
});

const mobileMenu = document.querySelector('.mobile-menu');
const cancelBtn = document.querySelector('.cancel');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');  
mobileMenu.addEventListener('click', function() {
    mobileMenu.style.display = 'none';
    cancelBtn.style.display = 'block';
    nav.style.backgroundColor = 'black';
    logo.src = 'images/PicHunter-logo-black.png';
})
cancelBtn.addEventListener('click', function() {
    cancelBtn.style.display = 'none';
    mobileMenu.style.display = 'block';
    nav.style.backgroundColor = 'white';
    logo.src = 'images/PicHunter-logo.png';

})
