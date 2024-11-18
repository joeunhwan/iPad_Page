import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

//장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click',function(event){
    //basketEl.classList.contains('show') //contains 해당클래스 존재 하는지 확인
    event.stopPropagation();
    if(basketEl.classList.contains('show')){
        hideBasket()
    }else{
        showBasket()
    }
});

basketEl.addEventListener('click', function(event){
    event.stopPropagation();
});
window.addEventListener('click', function(){
    hideBasket()
});

function showBasket(){
    basketEl.classList.add('show')
}
function hideBasket(){
    basketEl.classList.remove('show')
}

//검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')] // ...은 전개 연산자 - 얕은 복사
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchshadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')] // 배열로 변환

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function(event){
    event.stopPropagation();
    hideSearch();
});
searchshadowEl.addEventListener('click', hideSearch)

function showSearch(){
    headerEl.classList.add('searching');
    //document.documentElement.classList.add('fixed'); //검색 시 스크롤고정
    stopScroll()
    //console.log(headerMenuEls.reverse()) //배열을 리버스로 출력
    headerMenuEls.reverse().forEach(function(el, index){ //자동으로 순차적 애니메이션 줄려고 함
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' // 0.4초로 li개수만큼
    });
    searchDelayEls.forEach(function(el, index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    });
    setTimeout(function(){
        searchInputEl.focus();
    }, 600);
}
function hideSearch(){
    headerEl.classList.remove('searching');
    //document.documentElement.classList.remove('fixed'); //검색 시 스크롤고정
    playScroll()
    headerMenuEls.reverse().forEach(function(el, index){ // 순차적 애니메이션 거꾸로
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's' 
    });
    searchDelayEls.reverse().forEach(function(el, index){
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    });
    searchDelayEls.reverse();
    searchInputEl.value = '';
}

function playScroll(){
    document.documentElement.classList.remove('fixed');
};
function stopScroll(){
    document.documentElement.classList.add('fixed');
};


//헤더 모바일 메뉴 토글
const menuStarterEl = document.querySelector('header .menu-starter');
menuStarterEl.addEventListener('click', function(){
    if(headerEl.classList.contains('menuing')){
        headerEl.classList.remove('menuing')
        searchInputEl.value = '';
        playScroll()
    }else{
        headerEl.classList.add('menuing')
        stopScroll()
    }
    
});


//헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield');
const searchCancelEl = document.querySelector('header .search-canceler')

searchTextFieldEl.addEventListener('click', function(){
    headerEl.classList.add('searching--mobile')
    searchInputEl.focus()
});
searchCancelEl.addEventListener('click', function(){
    headerEl.classList.remove('searching--mobile')
});


//헤더 검색바 오류 리사이징
window.addEventListener('resize', function(){
    if(window.innerWidth <= 740){
        headerEl.classList.remove('searching');
    }else{
        headerEl.classList.remove('searching--mobile');
    }
});


//네비게이션
const navEl = document.querySelector('nav');
const navMenuToggleEl = navEl.querySelector('nav .menu-toggler');
const navMenuShadowEl = navEl.querySelector('.shadow');

navMenuToggleEl.addEventListener('click', function(){
    if(navEl.classList.contains('menuing')){
        hideNavMenu();
    }else{
        showNavMenu();
    }
});

//네비게이션 객체 외에 배경에 클릭 했을 시
navEl.addEventListener('click', function(event){
    event.stopPropagation();

});
navMenuShadowEl.addEventListener('click', hideNavMenu);
window.addEventListener('click', hideNavMenu);

function showNavMenu(){
    navEl.classList.add('menuing');
};
function hideNavMenu(){
    navEl.classList.remove('menuing');
};


//요소의 가시성 관찰
const io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(!entry.isIntersecting){
            return
        }
        entry.target.classList.add('show');
    });
});

const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function(el){
    io.observe(el)
});


//비디오 재생
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function(){
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
});
pauseBtn.addEventListener('click', function(){
    video.pause()
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
});


//COMPARE 부분 데이터 출력 // 당신에게 맞는 iPad는? 렌더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function(ipad){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    let colorList = ''
    ipad.colors.forEach(function(color){
        colorList += `<li style="background-color:${color};"></li>`
    });

    itemEl.innerHTML = /*html*/ `
    <div class="thumbnail">
        <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
        ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a class="link" href="${ipad.url}">더 알아보기</a>
    `

    itemsEl.append(itemEl);
});


//사이트맵

const navigationsEl = document.querySelector('footer .navigations')

navigations.forEach(function(nav){
    const mapEl = document.createElement('div');
    mapEl.classList.add('map');
    
    let mapList = '';
    nav.maps.forEach(function(map){
        mapList += /* html */`
        <li>
            <a href="${map.url}">${map.name}</a>
        </li>
        `
    });

    mapEl.innerHTML = /* html */`
        <h3>
            <span class="text">${nav.title}</span>
            <span class="icon">+</span>
        </h3>
        <ul>
            ${mapList}
        </ul>
    `
    navigationsEl.append(mapEl);
});


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();



//푸터 네비 아코디언
const mapEls = document.querySelectorAll('footer .navigations .map');
mapEls.forEach(function(el){
    const h3El = el.querySelector('h3');
    h3El.addEventListener('click', function(){
        el.classList.toggle('active');
    });
});