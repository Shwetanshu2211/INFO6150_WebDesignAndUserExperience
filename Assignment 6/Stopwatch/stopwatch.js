let timer;
let startTime;
let elapsedTime = 0;
let running = false;

$(document).ready(() => {
    $("#datePicker").datepicker({ dateFormat: "yy-mm-dd" });

    // Ensure input box opens date picker when clicked
    $("#datePicker").click(function () {
        $(this).datepicker("show");
    });

    // Function to update stopwatch display
    const updateTimeDisplay = () => {
        let totalSeconds = Math.floor(elapsedTime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        $("#time").text(
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
    };

    // Function to simulate an async stopwatch using Promises and async/await
    const runTimer = () => {
        return new Promise((resolve) => {
            timer = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateTimeDisplay();
            }, 1000);
            resolve();
        });
    };

    // Start stopwatch using async/await
    const startTimer = async () => {
        if (!running) {
            running = true;
            startTime = Date.now() - elapsedTime;
            await runTimer();
        }
    };

    // Stop stopwatch
    const stopTimer = async () => {
        running = false;
        clearInterval(timer);
    };

    // Reset stopwatch
    const resetTimer = async () => {
        running = false;
        clearInterval(timer);
        elapsedTime = 0;
        updateTimeDisplay();
    };

    // Button event handlers
    $("#start").click(startTimer);
    $("#stop").click(stopTimer);
    $("#reset").click(resetTimer);
});
