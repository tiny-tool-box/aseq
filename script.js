$(document).ready(() => {
    let poseStartTime, timeOfPause, poseTimeRemaining, poseTimeoutId, currentPose, currentPoseDuration;
    let totalDuration = 0;
    let poseIndex = 0;
    let isPaused = true;
    const poseEndWarningTime = 1000;

    // Calculate total duration of given yoga sequence in minutes.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    // ====================== GENERATE YOGA CARDS ======================= //
    let output = "";
    $.each(sequence, (i, info) => {
        const { switchSide, name, description, imageRef } = info.pose;
        output += `<div class="pose-card" data-switchside=${switchSide} data-duration=${info.duration}>
              <h4>${name}</h4>
              <img src="./assets/yoga-stick.png" width=120 />
              <h4>Duration: ${info.duration} min</h4>
              <h3>${description}</h3>
              <h6>Left and Right? ${switchSide}</h6>
          </div>`;
    });

    $("#pose-container").html(output);

    // Cycle through all poses on timer.
    const $poses = $(".pose-card");
    $poses.on("mouseenter", (e) => {
        console.log(e.target.data);
    });
    $poses.on("mouseleave", (e) => {
        console.log("mouseleave");
    });

    const setPose = () => {
        // If not paused and poses remaining, play next pose.
        if (!isPaused && poseIndex < $poses.length) {
            $poses.removeClass("active-pose");

            currentPose = $poses.eq(poseIndex);
            currentPose.addClass("active-pose");

            currentPoseDuration = currentPose.data().duration * 2000;
            poseStartTime = new Date();

            poseTimeoutId = setTimeout(() => {
                if (currentPose.data().switchside) {
                    // Set "switchside" data attribute to false after first switch.
                    currentPose.data().switchside = false;
                    setPose();
                    currentPose.addClass("switch-side active-pose").removeClass("almost-done");
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
    $("#pause-play-btn").click(() => {
        $("#timer").stopwatch().stopwatch("toggle");

        if (isPaused) {
            $("#pause-play-btn").text("PAUSE");

            poseStartTime = new Date();
            isPaused = false;

            setPose();
        } else {
            $("#pause-play-btn").text("PLAY");

            timeOfPause = new Date();
            isPaused = true;

            clearTimeout(poseTimeoutId);
            clearTimeout(poseEndWarningTimeoutId);

            // If paused during sequence, then create new variable that takes time pause into account.
            poseTimeRemaining = currentPoseDuration - (timeOfPause - poseStartTime);
        }
    });

    $("#reset-btn").click(() => {
        $("#timer").stopwatch().stopwatch("reset");
        $poses.removeClass("done almost-done switch-side active-pose");
        poseIndex = 0;
        isPaused = true;
        timeOfPause = null;
        poseStartTime = null;
        poseTimeRemaining = null;
        clearTimeout(poseTimeoutId);
        clearTimeout(poseEndWarningTimeoutId);
    });

    // =======================  SOUNDS  ======================= //

    const playNextPoseAudio = () => {
        document.querySelector("#next-pose-audio").play();
    };
});

// ==================== HARD-CODED SEQUENCE ==================== //

const poses = [
    {
        name: "Classical Sun Salutations (Surya Namaskar)",
        switchSide: false,
        description: "test 1 2 3 ",
        imageRef: null,
    },
    {
        name: "Standing With Inhale Knee up to Hip-Height",
        switchSide: true,
        description: null,
        imageRef: null,
    },
    {
        name: "Palms Together (Anjali Mudra), Exhale Twist",
        switchSide: true,
        description: null,
        imageRef: null,
    },
    {
        name: "Inhale Open Chest and Exhale Hand to the Knee, and Look over the hand",
        switchSide: false,
        description: null,
        imageRef: null,
    },
    {
        name: "Triangle (Trikonasana)",
        switchSide: true,
        description: null,
        imageRef: null,
    },
    {
        name: "Revolved Triangle (Parivrtta Trikonasana)",
        switchSide: true,
        description: null,
        imageRef: null,
    },
    {
        name: "Tadasana -> W1 -> humble -> heel-up -> prep for W3",
        switchSide: true,
        description: null,
        imageRef: null,
    },
    {
        name: "Tadasana -> W1 -> heel-up -> W3",
        switchSide: true,
        description: null,
        imageRef: null,
    },
];

const sequence = [
    {
        pose: poses[0],
        duration: 2,
    },
    {
        pose: poses[1],
        duration: 3,
    },
    {
        pose: poses[2],
        duration: 1,
    },
    {
        pose: poses[3],
        duration: 4,
    },
    {
        pose: poses[4],
        duration: 2,
    },
    {
        pose: poses[5],
        duration: 4,
    },
    {
        pose: poses[6],
        duration: 2,
    },
    {
        pose: poses[7],
        duration: 1,
    },
];
