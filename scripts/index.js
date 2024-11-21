if (localStorage.getItem('visited')) {
    countUntilFetch('https://api.counterapi.dev/v1/rainyedition/users', document.getElementById('users'));

} else {
    countUntilFetch('https://api.counterapi.dev/v1/rainyedition/users/up', document.getElementById('users'));
    localStorage.setItem('visited', true);
}

countUntilFetch('https://api.counterapi.dev/v1/rainyedition/visits/up', document.getElementById('visits'));

const special = document.getElementById('special');

let messages = ['sucker punch me to the jaw at 120x the speed of light', 'wear their socks while stepping in puddles', 'put 5 fluid ounces of milk before their cereal']

// typing effect
cycleMessages(special, messages);


// function searchGames() {}

// document.getElementById('search').addEventListener('input', function (e) {
//     let value = e.target.value;
//     // Search games and set the rest to display none
//     searchGames(value);
// })