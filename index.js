const container = document.querySelector('.container'),
    seats = document.querySelectorAll('.row .seat:not(.occupied)'),
    count = document.getElementById('count'),
    total = document.getElementById('total'),
    movieSelect = document.getElementById('movie');
let ticktPrice = + movieSelect.value;

populateUI();

// 事件代理，利用事件冒泡机制触发绑定在父元素上的事件
// 座位点击事件
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});



// 电影下拉事件
movieSelect.addEventListener('change', e => {
    ticktPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})



// 座位数 & 纵票价
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    // localStorage本地存储
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))

    const selectedCount = selectedSeats.length;
    count.innerText = selectedCount;
    total.innerText = selectedCount * ticktPrice;
}


// localStorage存储电影索引值和price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// 设置初始座位和总票价
updateSelectedCount();