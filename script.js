class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.reset();
        this.print(this.times);
        this.marks = [];
    }
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    print() {
        this.display.innerText = this.format(this.times);
    }
    format(times) {
        return(`${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))} `);
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    clear() {
        this.reset();
        this.print();
        // this.stop();
    }
    mark() {
        this.marks.push(this.format(this.times));
        this.printMarks();
    }
    printMarks() {
        this.results.innerText = '';
        let frag = document.createDocumentFragment();
        this.marks.forEach((mark) => {
            let element = document.createElement('li');
            element.innerHTML = mark;
            frag.appendChild(element);
        });
        this.results.appendChild(frag);
    }
    clearMarkers() {
        this.marks = [];
        this.printMarks();
    }
    
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = `0${result}`;
    }
    return result;
}


const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clear());

let markButton = document.getElementById('mark');
markButton.addEventListener('click', () => stopwatch.mark());

let clearMarkersButton = document.getElementById('clearMarkers');
clearMarkersButton.addEventListener('click', () => stopwatch.clearMarkers());