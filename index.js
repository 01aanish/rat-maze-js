let level1 = [
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1],
]

let level2 = [
    [1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1],
]

let level3 = [
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
]

let mazeArray = level1;

let Level = document.getElementById('levelSelect')
Level.addEventListener('change', () => {
    let level = Level.value;
    console.log(level);
    if (level == 1) {
        mazeArray = level1;
    } else if (level == 2) {
        mazeArray = level2;
    } else if (level == 3) {
        mazeArray = level3;
    }
    maze.innerHTML = `<img src="./images/rat.png" id="rat" alt="rat" height="50px" width="50px" />
    <img src="./images/food.png" alt="food" id="food" height="50px" width="50px" />`
    createMaze()
})

let maze = document.getElementById('maze-container')
let rat = document.getElementById('rat');
let food = document.getElementById('food');

function setRatPosition(x, y) {
    rat.style.top = x + 'px';
    rat.style.left = x + 'px';
}

function createMaze() {
    for (let i = 0; i < mazeArray.length; i++) {
        let row = document.createElement("div");
        row.classList.add('row');

        for (let j = 0; j < mazeArray[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazeArray[i][j] === 0) {
                cell.classList.add('wall');
            }

            if (i == 0 && j == 0) {
                mazeArray[i][j] = 2;
            }

            row.appendChild(cell);
        }
        maze.appendChild(row);

    }
    setRatPosition()
    getRatPosition()
}

function getRatPosition() {
    let position = [-1, -1];
    for (let i = 0; i < mazeArray.length; i++) {
        for (let j = 0; j < mazeArray[i].length; j++) {
            if (mazeArray[i][j] == 2) {
                position[0] = i;
                position[1] = j;
            }
        }
    }
    //console.log(position);
    return position;
}

document.addEventListener('keydown', (e) => {
    let rat = document.getElementById('rat');
    let food = document.getElementById('food');
    let ratLeft = rat.offsetLeft;
    let ratTop = rat.offsetTop;
    let foodTop = food.offsetTop;
    let foodLeft = food.offsetTop;
    let ratPosition = getRatPosition();

    if (e.key == 'ArrowRight' && ratLeft < (mazeArray.length - 1) * 50 && mazeArray[ratPosition[0]][ratPosition[1] + 1] == 1) {

        ratLeft += 50;
        rat.style.left = ratLeft + 'px';
        mazeArray[ratPosition[0]][ratPosition[1]] = 1;
        mazeArray[ratPosition[0]][ratPosition[1] + 1] = 2;

    } else if (e.key == 'ArrowLeft' && ratLeft > 0 && mazeArray[ratPosition[0]][ratPosition[1] - 1] == 1) {
        ratLeft -= 50;
        rat.style.left = ratLeft + 'px';
        mazeArray[ratPosition[0]][ratPosition[1]] = 1;
        mazeArray[ratPosition[0]][ratPosition[1] - 1] = 2;
    } else if (e.key == 'ArrowUp' && ratTop > 0 && mazeArray[ratPosition[0] - 1][ratPosition[1]] == 1) {
        ratTop -= 50;
        rat.style.top = ratTop + 'px';
        mazeArray[ratPosition[0]][ratPosition[1]] = 1;
        mazeArray[ratPosition[0] - 1][ratPosition[1]] = 2;
    } else if (e.key == 'ArrowDown' && ratTop < (mazeArray.length - 1) * 50 && mazeArray[ratPosition[0] + 1][ratPosition[1]] == 1) {
        ratTop += 50;
        rat.style.top = ratTop + 'px';
        mazeArray[ratPosition[0]][ratPosition[1]] = 1;
        mazeArray[ratPosition[0] + 1][ratPosition[1]] = 2;
    }

    if (ratLeft === foodLeft && ratTop === foodTop) {
        alert('Congratulations! You win.');
    }
})

