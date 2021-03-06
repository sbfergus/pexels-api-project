// api keys
const pexelKey = config.pexel_key;
const wordsKey = config.words_key;
const randomWordKey = config.randomWord_key;

// constants used in logic
const body = document.querySelector('body');
const relatedBtnsContainer = document.querySelector('.related-btns-container');
const filters = document.querySelector('.filters');
const filterDropdown = document.querySelector('.filter-dropdown');
const filterIcon = document.querySelector('.filter-icon');
const mobileMenuBtn = document.querySelector('.mobile-menu');
const cancelBtn = document.querySelector('.cancel');
const nav = document.querySelector('nav');
const logo = document.querySelector('.logo');
const photoGrid = document.querySelector('.grid-container');
const mobileMenuOptions = document.querySelector('.mobile-menu-options');
const bell = document.querySelector('.bell');
const hero = document.querySelector('.hero');
const downCarrot = document.getElementsByClassName('down-carrot');
const grid = document.querySelector('.grid');
const searchForm = document.querySelector('#search-form');
const randomWords = document.querySelector('.random-words');
const orientSelect = document.querySelector('#orientations');
const sizeSelect = document.querySelector('#sizes');

let photoNum = document.querySelector('.random-photo-num');
let currentPage = 2;

// API GET request to Pexels Api to render photos based on search input
// 30 photos will be rendered initially, unless the given search has less than 30
let maxNumOfPicsRendered = 30;
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        var photos = data.photos;
        console.log(photos);
        // console.log(photos[0].naturalWidth);
        hero.style.display = 'none';
        photoGrid.style.display = 'block';
        lightNav();
        if (photos.length === 0) {
            photoNum.textContent = 0;
        } else if (photos.length < 30) {
            photoNum.textContent = `${photos.length}`;
        } else {
            photoNum.textContent = `${randomNum()}k`;
        }
        currentPage++;
        grid.innerHTML = '';
        photos.forEach(function(pic) {
            //console.log(pic);
                
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
                (pic.width > pic.height)? (picture.classList.add('horiz')) : (picture.classList.add('vert'));

                let largestDim;
                if (pic.width > pic.height) {
                    largestDim = pic.width;
                } else {
                    largestDim = pic.height;
                }
                if (largestDim > 4000) {
                    picture.classList.add('lg');
                } else if (largestDim >= 3000 && largestDim <= 4000) {
                    picture.classList.add('md');
                } else {
                    picture.classList.add('sm');
                }

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
    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchValue}&page=${currentPage}&per_page=${maxNumOfPicsRendered}`, true);
    xhttp.setRequestHeader('Authorization', pexelKey);
    xhttp.send();
});

// API GET request to Pexels Api to render more photos when user scrolls to the bottom
window.addEventListener('scroll', throttle(scollListener, 300) );

// API GET request to random-words api to render random words on initial load
window.addEventListener('load', function() {
    console.log('window loaded')
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var words = JSON.parse(this.responseText);
            words.forEach(function(word) {
                var wordBtn = document.createElement('div');
                wordBtn.classList.add('word');
                wordBtn.innerHTML = word;
                wordBtn.style.borderColor = 'white';
                randomWords.appendChild(wordBtn);
            })
        }
    });

    xhr.open("GET", "https://random-words5.p.rapidapi.com/getMultipleRandom?count=15");
    xhr.setRequestHeader("X-RapidAPI-Key", randomWordKey);
    xhr.setRequestHeader("X-RapidAPI-Host", "random-words5.p.rapidapi.com");
    xhr.send(data);
})

// API GET request to words api to render related words after every search
searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = null;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        relatedBtnsContainer.style.display = 'flex';
        relatedBtnsContainer.innerHTML = '';
        var galleryTitle = document.querySelector('.gallery-title');
        galleryTitle.style.paddingTop = '25px';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                var words = JSON.parse(this.responseText);
                var maxTenWords = words.typeOf.slice(0,15);
                maxTenWords.forEach(function(word) {
                    var wordBtn = document.createElement('div');
                    wordBtn.classList.add('word');
                    wordBtn.innerHTML = word;
                    relatedBtnsContainer.appendChild(wordBtn);
                })
            }
        });
        var searchValue = document.querySelector('#search-bar').value;
        xhr.open("GET", `https://wordsapiv1.p.rapidapi.com/words/${searchValue}/typeOf`);
        xhr.setRequestHeader("X-RapidAPI-Key", wordsKey);
        xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com");
        xhr.send(data);
});

// event listener to search random word when clicked
randomWords.addEventListener('click', function(event) {
    event.preventDefault();
    var searchValue = document.querySelector('#search-bar');
    searchValue.value = event.target.textContent;
    searchForm.requestSubmit(); 
});

// event listener to search related word when clicked
relatedBtnsContainer.addEventListener('click', function(event) {
    event.preventDefault();
    var searchValue = document.querySelector('#search-bar');
    searchValue.value = event.target.textContent;
    searchForm.requestSubmit(); 
});
    
let rotated = false;    // initial state of unrotated element, used in filter event listener below
// event listener to add rotation animations 
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

// event listeners to style page when mobile 'hamburger' button is clicked
mobileMenuBtn.addEventListener('click', function() {
    mobileMenuOptions.style.display = 'block';
    photoGrid.style.display = 'none';
    darkNav();
})

// event listeners to style page when cancel 'X' button is clicked
cancelBtn.addEventListener('click', function() {
    mobileMenuOptions.style.display = 'none';
    if (window.getComputedStyle(hero).display === 'block') {
        transparentNav();
    } else {
        lightNav();
        photoGrid.style.display = 'block';
    }
})

// function to produce dark nav styles
function darkNav() {
    cancelBtn.style.display = 'block';
    mobileMenuBtn.style.display = 'none';
    nav.style.backgroundColor = 'black';
    nav.style.borderBottomColor = 'hsla(0,0%,100%,.2)';
    logo.src = 'images/PicHunter-logo-black.png';
    logo.style.filter = 'none';
    bell.style.filter = 'invert(1)';
    downCarrot[1].style.filter = 'invert(1)';
}

// function to produce light nav styles
function lightNav() {
    cancelBtn.style.display = 'none';
    mobileMenuBtn.style.display = 'block';
    nav.style.backgroundColor = 'white';
    nav.style.borderBottomColor = '#f4f4f4';
    logo.src = 'images/PicHunter-logo.png';
    logo.style.filter = 'brightness(100%)';
    bell.style.filter = 'invert(0)';
    downCarrot[1].style.filter = 'invert(0)';
}

// function to produce transparent nav styles, primarily used when hero image is visible
function transparentNav() {
    cancelBtn.style.display = 'none';
    mobileMenuBtn.style.display = 'block';
    nav.style.backgroundColor = 'transparent';
    nav.style.borderBottomColor = 'transparent';
    logo.src = 'images/PicHunter-logo.png';
    logo.style.filter = 'brightness(0%)';
    bell.style.filter = 'invert(0)';
    downCarrot[1].style.filter = 'invert(0)';
}

// function to produce random number in thousands, later pluged into 'photos' display after searching
function randomNum() {
    var randomNumPhotos = Math.random()*100;
    return randomNumPhotos.toFixed(1);
}

// function to filter displayed images based on the combination of orientation and size selections
function comboFilter() {
    let pics = document.getElementsByClassName('grid-item');
    let selectedOrient = orientSelect.value;
    let selectedSize = sizeSelect.value;
    if (selectedOrient === 'horiz' && selectedSize === 'all') {
        for (pic of pics) {
            (pic.classList.contains('horiz'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.horiz',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'horiz' && selectedSize === 'sm') {
        for (pic of pics) {
            (pic.classList.contains('horiz') && pic.classList.contains('sm'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.horiz.sm',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'horiz' && selectedSize === 'md') {
        for (pic of pics) {
            (pic.classList.contains('horiz') && pic.classList.contains('md'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.horiz.md',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'horiz' && selectedSize === 'lg') {
        for (pic of pics) {
            (pic.classList.contains('horiz') && pic.classList.contains('lg'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.horiz.lg',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'vert' && selectedSize === 'all') {
        for (pic of pics) {
            (pic.classList.contains('vert'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.vert',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'vert' && selectedSize === 'sm') {
        for (pic of pics) {
            (pic.classList.contains('vert') && pic.classList.contains('sm'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.vert.sm',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'vert' && selectedSize === 'md') {
        for (pic of pics) {
            (pic.classList.contains('vert') && pic.classList.contains('md'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.vert.md',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'vert' && selectedSize === 'lg') {
        for (pic of pics) {
            (pic.classList.contains('vert') && pic.classList.contains('lg'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.vert.lg',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'all' && selectedSize === 'sm') {
        for (pic of pics) {
            (pic.classList.contains('sm'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.sm',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'all' && selectedSize === 'md') {
        for (pic of pics) {
            (pic.classList.contains('md'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.md',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else if (selectedOrient === 'all' && selectedSize === 'lg') {
        for (pic of pics) {
            (pic.classList.contains('lg'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.lg',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    } else {
        for (pic of pics) {
            (pic.classList.contains('grid-item'))? pic.style.display = 'block' : pic.style.display = 'none';
        }
        var msnry = new Masonry( grid, {
            itemSelector: '.grid-item',
            fitWidth: true,
            gutter: 25
        });
        msnry.reloadItems()
    }
}

// function to render more photos when scrolling to the bottom of the page
function scollListener() {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 350) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            var photos = data.photos;
            console.log(photos);
            currentPage++;
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
                    (pic.width > pic.height)? picture.classList.add('horiz') : picture.classList.add('vert');

                    let largestDim;
                    if (pic.width > pic.height) {
                        largestDim = pic.width;
                    } else {
                        largestDim = pic.height;
                    }
                    if (largestDim > 4000) {
                        picture.classList.add('lg');
                    } else if (largestDim >= 3000 && largestDim <= 4000) {
                        picture.classList.add('md');
                    } else {
                        picture.classList.add('sm');
                    }

                    picture.addEventListener('mouseover', function() {
                            this.children[1].classList.add('active');
                    });
                    picture.addEventListener('mouseout', function() {
                        this.children[1].classList.remove('active');
                    });
            grid.appendChild(picture);  
            });
            comboFilter();
        };
    };
    var searchValue = document.querySelector('#search-bar').value;
    console.log(`https://api.pexels.com/v1/search?query=${searchValue}&page=${currentPage}&per_page=30`)
    xhttp.open("GET", `https://api.pexels.com/v1/search?query=${searchValue}&page=${currentPage}&per_page=30`, true);
    xhttp.setRequestHeader('Authorization', pexelKey);
    xhttp.send();
    }
}

// function to timeout scroll event from firing 
function throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }
