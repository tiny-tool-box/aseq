$(document).ready(() => {
    let poseStartTime, totalTimeLeft, timeOfPause, poseTimeRemaining, poseTimeoutId, currentPose, currentPoseDuration;
    let totalDuration = 0;
    let isPaused = true;
    const poseEndWarningTime = 5000;

    // Calculate total duration of given yoga sequence in minutes.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    // ====================== GENERATE YOGA CARDS ======================= //
    let output = "";
    $.each(sequence, (i, info) => {
        output += `<div class="pose-card" data-switchside=${info.switchSide} data-duration=${info.duration}>
              <h2>${info.name}</h2>
              <img src="./assets/yoga-stick.png" width=120 />
              <h3>Duration: ${info.duration} min</h3>
              <h5>Left and Right? ${info.switchSide}</h5>
          </div>`;
    });

    $("#pose-container").html(output);

    // Cycle through all poses on timer.
    const $poses = $(".pose-card");
    let poseIndex = 0;

    const setPose = () => {
        // If not paused and poses remaining, play next pose.
        if (!isPaused && poseIndex < $poses.length) {
            $poses.removeClass("active-pose");

            currentPose = $poses.eq(poseIndex);
            currentPose.addClass("active-pose");

            currentPoseDuration = currentPose.data().duration * 5000;
            poseStartTime = new Date();

            poseTimeoutId = setTimeout(() => {
                if (currentPose.data().switchside) {
                    // Set "switchside" data attribute to false after first switch.
                    currentPose.data().switchside = false;
                    currentPose.addClass("switch-side active-pose").removeClass("almost-done");
                    setPose();
                } else {
                    currentPose.addClass("done").removeClass("almost-done");
                    playNextPoseAudio();
                    poseIndex++;
                    setPose();
                }
            }, poseTimeRemaining || currentPoseDuration);
            poseEndWarningTimeoutId = setTimeout(() => {
                if (!currentPose.data().switchside) {
                    currentPose.addClass("almost-done");
                }
            }, poseTimeRemaining - poseEndWarningTime || currentPoseDuration - poseEndWarningTime);
        }
    };

    // Start routine and timer on click, or pause if already started.
    $("#play-btn").click(() => {
        $("button").removeClass("active-button");
        $("#play-btn").addClass("active-button");

        poseStartTime = new Date();
        isPaused = false;

        setPose();
        setTimer(totalTimeLeft || totalDuration);
    });

    $("#pause-btn").click(() => {
        $("button").removeClass("active-button");
        $("#pause-btn").addClass("active-button");

        isPaused = true;

        timeOfPause = new Date();

        clearTimeout(poseTimeoutId);
        clearTimeout(poseEndWarningTimeoutId);
        clearInterval(yogaTimer);

        poseTimeRemaining = currentPoseDuration - (timeOfPause - poseStartTime);
    });

    // ====================  GLOBAL TIMER ==================== //

    // Set initial timer figure.

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

    // =======================  SOUNDS  ======================= //
    const playNextPoseAudio = () => {
        document.querySelector("#next-pose-audio").play();
    };
});

// ==================== HARD-CODED SEQUENCE ==================== //

const minutesToMilliseconds = 1;

const sequence = [
    {
        name: "Classical Sun Salutations (Surya Namaskar)",
        poseNumber: 1,
        duration: 6 * minutesToMilliseconds,
        switchSide: false,
    },
    {
        name: "Standing With Inhale Knee up to Hip-Height",
        poseNumber: 2,
        duration: 0.5 * minutesToMilliseconds,
        switchSide: true,
    },
    {
        name: "Palms Together (Anjali Mudra), Exhale Twist",
        poseNumber: 3,
        duration: 0.5 * minutesToMilliseconds,
        switchSide: true,
    },
    {
        name: "Inhale Open Chest and Exhale Hand to the Knee, and Look over the hand",
        poseNumber: 4,
        duration: 0.5 * minutesToMilliseconds,
        switchSide: false,
    },
    {
        name: "Triangle (Trikonasana)",
        poseNumber: 5,
        duration: 0.75 * minutesToMilliseconds,
        switchSide: true,
    },
    {
        name: "Revolved Triangle (Parivrtta Trikonasana)",
        poseNumber: 6,
        duration: 0.75 * minutesToMilliseconds,
        switchSide: true,
    },
    {
        name: "Tadasana -> W1 -> humble -> heel-up -> prep for W3",
        poseNumber: 7,
        duration: 0.5 * minutesToMilliseconds,
        switchSide: true,
    },
    {
        name: "Tadasana -> W1 -> heel-up -> W3",
        poseNumber: 8,
        duration: 1 * minutesToMilliseconds,
        switchSide: true,
    },
];
