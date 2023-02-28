class Direction {
    Names;

    constructor() {
        this.Names = { None: 'none', Up: 'up', Down: 'down', Left: 'left', Right: 'right' };
    }
}

class Position {
    X;
    Y;

    constructor() {
        this.X = 0;
        this.Y = 0;
    }
}

const power = 500;

let direction = new Direction();

let position = new Position();

let clickButton = document.getElementById("clickButton");

function ChangeDirection(){
    let dir = Math.floor(Math.random() + 0.5) * 2 - 1;
    let dirName;

    while (true) {
        if (Math.floor(Math.random() + 0.5) === 0) {
            if (Math.abs(position.X + dir) === 3) {
                continue;
            }
            position.X += dir;
            if (dir > 0)
                dirName = direction.Names.Right;
            else
                dirName = direction.Names.Left;

            break;
        } else {
            if (Math.abs(position.Y + dir) === 3) {
                continue;
            }
            position.Y += dir;
            if (dir < 0)
                dirName = direction.Names.Up;
            else
                dirName = direction.Names.Down;

            break;
        }
    }

    clickButton.textContent = dirName;
}

function MoveToPosition(){
    clickButton.style.marginLeft = power * position.X + "px";
    clickButton.style.marginTop = power * position.Y + "px";
}

ChangeDirection();

function clickButton_Click() {
    MoveToPosition();
    ChangeDirection();

    console.log(position);
}