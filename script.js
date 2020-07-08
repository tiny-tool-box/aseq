$(document).ready(() => {
    let poseStartTime,
        timeOfPause,
        poseTimeRemaining,
        poseTimeoutId,
        currentPose,
        currentPoseDuration;
    let totalDuration = 0;
    let poseIndex = 0;
    let isPaused = true;
    const poseEndWarningTime = 1000;

    // Calculate total duration of given yoga sequence in seconds.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    // ====================== GENERATE YOGA CARDS ======================= //
    let output = "";
    let index = 0;
    $.each(sequence, (i, info) => {
        info.forEach((item) => {
            let { switchSide, name, description, imageRef } = item.pose;
            output += `<div class="pose-card" data-switchside=${switchSide} data-duration=${
                item.duration
            } data-index=${index}>
                  <h3>${name}</h3>
                  <img src=${imageRef || "./assets/yoga-stick.png"} width=250 />
                  <h6>Duration: ${item.duration} min</h6>
                  <p class="description">${description || "No description"}</p>
              </div>`;
            index++;
        });
    });

    $("#pose-container").html(output);

    // Cycle through all poses on timer.
    const $poses = $(".pose-card");

    const setPose = () => {
        // If not paused and poses remaining, play next pose.
        if (!isPaused && poseIndex < $poses.length) {
            $poses.removeClass("active-pose-first active-pose-second");

            currentPose = $poses.eq(poseIndex);

            currentPose.addClass("active-pose-first");

            currentPoseDuration = currentPose.data().duration * 1000;
            poseStartTime = new Date();

            poseTimeoutId = setTimeout(() => {
                if (currentPose.data().switchside) {
                    // Set "switchside" data attribute to false after first switch.
                    currentPose.data().switchside = false;
                    setPose();
                    currentPose
                        .addClass("switch-side active-pose-second")
                        .removeClass("almost-done");
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

    // Set pose to target card on click

    $(".pose-card").click(() => {
        console.log("$(this).data() :>> ", $(this).data());
    });

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
            poseTimeRemaining =
                currentPoseDuration - (timeOfPause - poseStartTime);
        }
    });

    $("#reset-btn").click(() => {
        location.reload();
    });

    // =======================  SOUNDS  ======================= //

    const playNextPoseAudio = () => {
        document.querySelector("#next-pose-audio").play();
    };
});
