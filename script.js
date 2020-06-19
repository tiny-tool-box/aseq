$(document).ready(() => {
    let poseStartTime, totalTimeLeft, timeOfPause, timeSincePoseStart, poseTimeoutId;
    let totalDuration = 0;
    let isPaused = true;

    // Calculate total duration of given yoga sequence in minutes.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    // ====================== GENERATE YOGA CARDS ======================= //
    let output = "";
    $.each(sequence, (i, info) => {
        output += `<div class="pose-card" data-switch=${info.switch} data-duration=${info.duration}>
              <h2>${info.name}</h2>
              <img src="./assets/yoga-stick.png" width=120 />
              <h3>Duration: ${info.duration} min</h3>
              <h5>switch sides? ${info.switch}</h5>
          </div>`;
    });

    $("#pose-container").html(output);

    // Cycle through all poses on timer.
    const $poses = $(".pose-card");
    let poseIndex = 0;

    const nextPose = () => {
        // If not paused and poses remaining, play next pose.
        if (!isPaused && poseIndex < $poses.length) {
            $poses.removeClass("active-pose");
            const currentPose = $poses.eq(poseIndex);
            const currentPoseDuration = currentPose.data().duration * 1000;

            currentPose.addClass("active-pose");

            poseStartTime = new Date();

            // clearTimeout(timeOutId);
            console.log("remaining time until next pose is called :>> ", currentPoseDuration - timeSincePoseStart);
            setTimeout(nextPose, currentPoseDuration);
            poseIndex++;
        }
    };

    // Start routine and timer on click, or pause if already started.
    $("#play-btn").click(() => {
        isPaused = false;
        poseTimeoutId = setTimeout(nextPose, 1000);
        setTimer(totalTimeLeft || totalDuration);
    });

    $("#pause-btn").click(() => {
        isPaused = true;
        timeOfPause = new Date();
        clearTimeout(poseTimeoutId);
        clearInterval(yogaTimer);
        timeSincePoseStart = timeOfPause - poseStartTime;
        console.log("timeSincePoseStart :>> ", timeSincePoseStart);
    });

    // ====================  GLOBAL TIMER ==================== //

    const setTimer = (duration) => {
        let timer = duration,
            minutes,
            seconds;
        if (!isPaused) {
            yogaTimer = setInterval(() => {
                minutes = parseInt(timer / 60);
                seconds = parseInt(timer % 60);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                $("#timer").text(`${minutes}:${seconds}`);

                totalTimeLeft = duration--;

                // When timer reaches 0, clear interval.
                if (--timer < 0) {
                    clearInterval(yogaTimer);
                }
            }, 1000);
        } else {
            clearInterval(yogaTimer);
            isPaused = true;
        }
    };
});

// ==================== HARD-CODED SEQUENCE ==================== //
const sequence = [
    {
        name: "5 mins Classical sun salutations",
        duration: 5,
        switch: false,
    },
    {
        name: "Knee up",
        duration: 1,
        switch: true,
    },
    {
        name: "Resolve w palms together",
        duration: 3,
        switch: true,
    },
    {
        name: "Hands to sides/back",
        duration: 1,
        switch: false,
    },
    {
        name: "Triangle",
        duration: 2,
        switch: true,
    },
    {
        name: "Resolved triangle",
        duration: 1,
        switch: true,
    },
    {
        name: "Tadasana -> W1 -> humble -> heel-up -> prep for W3",
        duration: 1,
        switch: true,
    },
    {
        name: "Tadasana -> W1 -> heel-up -> W3",
        duration: 1,
        switch: true,
    },
];
