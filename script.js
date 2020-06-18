$(document).ready(() => {
    let poseStartTime, totalTimeLeft, timeOfPause, timeSincePoseStart, timeOutId;
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
        if (!isPaused) {
            const currentPose = $poses.eq(poseIndex);
            const currentPoseDuration = currentPose.data().duration * 1000;

            $poses.removeClass("active-pose");
            currentPose.addClass("active-pose");

            poseStartTime = new Date();

            // If not final pose and not paused, play next pose, else reset index.
            if (poseIndex < $poses.length) {
                poseIndex++;
                // clearTimeout(timeOutId);
                console.log("remaining time until next pose is called :>> ", currentPoseDuration - timeSincePoseStart);
                setTimeout(nextPose, currentPoseDuration - timeSincePoseStart);
            }
        }
    };

    // Start routine and timer on click, or pause if already started.
    $("#play-pause-btn").click(() => {
        let $btn = $("#play-pause-btn");
        if (!isPaused) {
            timeOfPause = new Date();
            console.log("timeOfPause :>> ", timeOfPause);
            timeSincePoseStart = timeOfPause - poseStartTime;
            console.log("timeSincePoseStart/1000 :>> ", timeSincePoseStart / 1000);
        }
        $btn.text() == "play" ? $btn.text("pause") : $btn.text("play");
        setTimeout(nextPose, 1000);
        setTimer(totalTimeLeft || totalDuration);
    });

    // ====================  GLOBAL TIMER ==================== //

    const setTimer = (duration) => {
        let timer = duration,
            minutes,
            seconds;
        if (isPaused) {
            isPaused = false;
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
