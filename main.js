let tetris = []; // масив колонок
let score = 0; // рахунок
let move; //змінна , що показує чи був насправді рух
let speed; // швидкість руху
let topPlayer = []; // масив з об'єктами гравців

// створюєм таблицю тетрісу
fillTetris();

function fillTetris() {
    let x = 9;
    let y = 15;
    for (let i = 0; i < y; i++) {
        tetris[i] = [];
        for (let k = 0; k < x; k++) {
            tetris[i][k] = 0;
        }

    }
}

// виводимо таблицю тетрісу в документі з певним кольором
drow();

function drow() {
    let out = '';
    for (let i = 0; i < tetris.length; i++) {
        for (let k = 0; k < tetris[i].length; k++) {
            if (tetris[i][k] == 0) {
                out += `<div class = "empty squere"></div>`;
            } else if (tetris[i][k] == 1 || tetris[i][k] == 11) {

                out += `<div class = "red squere"></div>`;
            } else if (tetris[i][k] == 2 || tetris[i][k] == 12) {

                out += `<div class = "blue squere"></div>`;
            } else if (tetris[i][k] == 3 || tetris[i][k] == 13) {

                out += `<div class = "green squere"></div>`;
            } else if (tetris[i][k] == 4 || tetris[i][k] == 14) {

                out += `<div class = "purple squere"></div>`;
            } else if (tetris[i][k] == 5 || tetris[i][k] == 15) {

                out += `<div class = "yellow squere"></div>`;
            }

        }
    }


    document.querySelector("#tetris").innerHTML = out;
    showResult();
}

// перевіряєм LS
if (localStorage.getItem("top") != null) {
    topPlayer = JSON.parse(localStorage.getItem("top"));
    createTop();
}



document.querySelector(".start-btn").addEventListener("click", start);

//запускаємо гру
function start() {
    speed = 300;
    score = 0; // зароблені бали
    fillTetris();
    drow();
    getColor();
    if (move == undefined) {
        run();
    }


}

// отримуємо колір
function getColor() {
    function randomInteger(min, max) {

        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    tetris[0][randomInteger(0, 8)] = randomInteger(1, 5);
    drow();

}

//запускаємо рух квадратів
function run() {
    drow();
    move = true;
    for (let i = tetris.length - 1; i >= 0; i--) {
        for (let k = tetris[i].length - 1; k >= 0; k--) {
            if (tetris[i][k] != 0 && tetris[i][k] < 10) {
                if (i == tetris.length - 1 || tetris[i + 1][k] != 0) {
                    tetris[i][k] = tetris[i][k] + 10;
                }
                if (tetris[i][k] < 10 && tetris[i + 1][k] == 0) {
                    tetris[i + 1][k] = tetris[i][k];
                    tetris[i][k] = 0;
                    move = false;
                }
            }
        }
    }
    checkLine();
    if (checkFinish()) {
        drow();
        move = undefined;
        showAlert();
    } else {
        if (move) {
            getColor();
            run();
        } else {
            setTimeout(run, speed);
        }
    }
}

//перевіряєм заповненість ряду та міняєм колір в позитивному випадку
function checkLine() {
    for (let i = tetris.length - 1; i >= 0; i--) {
        for (let k = 0; k <= tetris[i].length - 1; k++) {
            if (tetris[i][k] > 10 && tetris[i][k + 1] != undefined && tetris[i][k + 2] != undefined && tetris[i][k + 3] != undefined) {
                if (tetris[i][k] == tetris[i][k + 1] && tetris[i][k] == tetris[i][k + 2] && tetris[i][k + 3] == tetris[i][k]) {
                    tetris[i][k] = 0;
                    tetris[i][k + 1] = 0;
                    tetris[i][k + 2] = 0;
                    tetris[i][k + 3] = 0;
                    score++;
                    speed = speed - 10;

                    for (let w = i; w >= 0; w--) {
                        if (tetris[w][k] > 10) tetris[w][k] = tetris[w][k] - 10;
                        if (tetris[w][k + 1] > 10) tetris[w][k + 1] = tetris[w][k + 1] - 10;
                        if (tetris[w][k + 2] > 10) tetris[w][k + 2] = tetris[w][k + 2] - 10;
                        if (tetris[w][k + 3] > 10) tetris[w][k + 3] = tetris[w][k + 3] - 10;
                    }
                }
            }
            if (tetris[i][k] > 10 && tetris[i][k + 1] != undefined && tetris[i][k + 2] != undefined) {
                if (tetris[i][k] == tetris[i][k + 1] && tetris[i][k] == tetris[i][k + 2]) {
                    tetris[i][k] = 0;
                    tetris[i][k + 1] = 0;
                    tetris[i][k + 2] = 0;
                    score++;
                    speed = speed - 10;

                    for (let w = i; w >= 0; w--) {
                        if (tetris[w][k] > 10) tetris[w][k] = tetris[w][k] - 10;
                        if (tetris[w][k + 1] > 10) tetris[w][k + 1] = tetris[w][k + 1] - 10;
                        if (tetris[w][k + 2] > 10) tetris[w][k + 2] = tetris[w][k + 2] - 10;
                    }
                }
            }
        }
    }
}

// виводимо рахунок 
function showResult() {
    document.querySelector("#score").textContent = score;
}

// перевіряєм чи гра закінчена
function checkFinish() {
    let finished = false;
    for (let k = tetris[0].length - 1; k >= 0; k--) {
        if (tetris[0][k] != 0 && tetris[1][k] != 0) {
            finished = true;

        }
    }
    return finished;
}

// перевіряєм яка стрілка на клавіатурі була нажата
document.onkeydown = function (event) {
    if (event.code == "ArrowLeft") {
        arrowLeft();
    } else if (event.code == "ArrowRight") {
        arrowRight();
    }
    drow();
}


// переносимо об'єкт в ліво
function arrowLeft() {
    for (let i = tetris.length - 1; i >= 0; i--) {
        for (let k = 0; k <= tetris[i].length - 1; k++) {
            if (tetris[i][k] != 0 && tetris[i][k] < 10 && tetris[i][k - 1] == 0) {
                tetris[i][k - 1] = tetris[i][k];
                tetris[i][k] = 0;
            }
        }
    }

};

// переносимо об'єкт в право
function arrowRight() {
    for (let i = tetris.length - 1; i >= 0; i--) {
        for (let k = tetris[i].length - 1; k >= 0; k--) {
            if (tetris[i][k] != 0 && tetris[i][k] < 10 && tetris[i][k + 1] == 0) {
                tetris[i][k + 1] = tetris[i][k];
                tetris[i][k] = 0;
            }
        }
    }
};

//створюєм елемент сповіщення про кінець гри
function createAlert() {
    let out = '';

    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    out = `<h1>Game Over!</h1><p>Ви набрали : ${fixOrthography()}.</p>`;
    if (score > 0) {
        out += `<form onsubmit="return false;"><input type = "text" class = "user-name" placeholder = "ім'я"><button class = "btn" id = "save">Зберегти мене </button></form><br>`;
    }
    out += `<button class ="btn" id ="refresh" >Грати заново</button>`;
    alertDiv.innerHTML = out;

    return alertDiv;
}

//виводимо в документ елемент сповіщення про кінець гри
function showAlert() {
    document.querySelector(".content").append(createAlert());
    document.querySelector("#refresh").onclick = () => {
        document.querySelector(".alert").remove();
        start();
    }
    document.querySelector("#save").onclick = () => {
        save();
        document.querySelector(".alert").remove();
    }



}
//виправляєм орфографію 
function fixOrthography() {
    let result = String(score);
    if (result[result.length - 1] == 0 || result[result.length - 1] >= 5 || result[result.length - 2] == 1) {
        result = `${result} балів`

    } else if (result[result.length - 1] == 1) {
        result = `${result} бал`
    } else {
        result = `${result} бали`
    }
    return result;
}

// зберігаєм дані гравця
function save() {
    let user = document.querySelector(".user-name").value;
    user = user.trim();
    user = {
        'name': user,
        'score': score
    };
    topPlayer[topPlayer.length] = user;
    localStorage.setItem('top', JSON.stringify(topPlayer));
    createTop();
    console.log(topPlayer);
}

//генеруєм рейтинг гравців
function createTop() {
    sortByScore(topPlayer);
    let out = '<h4>Топ гравців</h4>';
    for (let i = 0; i < topPlayer.length; i++) {
        out += `<ul><li>${topPlayer[i].name} ------ ${topPlayer[i].score}</li>`
    }
    out += '</ul>';
    document.querySelector(".top-player").innerHTML = out;


}

//сортуєм рейтинг за кількістю балів
function sortByScore(arr) {
    arr.sort((a, b) => {
        a.score < b.score ? 1 : -1
    });
}
