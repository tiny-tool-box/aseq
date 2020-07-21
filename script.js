$(document).ready(() => {
    let poseStartTime,
        timeOfPause,
        poseTimeRemaining,
        poseTimeoutId,
        currentPose,
        currentPoseDuration;
    let totalDuration = 0;
    // let currentPoseIndex = 0;
    let currentSide = "first";
    let poseIndex = 0;
    let isPaused = true;
    let miniSequenceInProgress = false;
    const poseEndWarningTime = 1000;

    // global variable to check which index o card Im on and which side am I on. if -1 then move forward but dont change side. if not negative one, then switch side and then move forward.

    // Calculate total duration of given yoga sequence in seconds.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    // ====================== GENERATE YOGA CARDS ======================= /

    let otherSideStart = [];
    let index = 0;
    let output = "";
    $.each(sequence, (i, info) => {
        info.forEach((item, key, arr) => {
            // If only 1 item in mini-sequence, or last item in mini-sequence, set array value = to its poseIndex
            if (arr.length == 1 || Object.is(arr.length - 1, key)) {
                // If last part of mini sequence, push first index of mini sequence
                if (otherSideStart[index - 1] === -1) {
                    otherSideStart.push(otherSideStart.indexOf(-1));
                } else {
                    otherSideStart.push(index);
                }
            } else if (arr.some((x) => x.pose.otherSide)) {
                otherSideStart.push(-1);
            }

            index++;

            let { otherSide, name, description, imageRef } = item.pose;

            output += `<div class="pose-card" data-otherside=${otherSide} data-duration=${
                item.duration
            } >
                  <div class="pose-card-title">${name}</div>
                  <img src=${imageRef || "./assets/yoga-stick.png"} />
                  <h6>Duration: ${item.duration} min</h6>
                  <p class="description">${description || "No description"}</p>
              </div>`;
        });
    });

    $("#pose-container").html(output);

    // Cycle through all poses on.
    const $poses = $(".pose-card");

    const setPose = () => {
        // If not paused and poses remaining, play next pose.
        if (!isPaused && poseIndex < $poses.length) {
            $poses.removeClass("active-pose-first active-pose-second");

            // if (miniSequenceInProgress) {
            //     currentPose.addClass("active-pose-second");
            // } else {
            //     $poses.removeClass("active-pose-first active-pose-second");
            //     currentPose.addClass("active-pose-first");
            // }

            currentPose = $poses.eq(poseIndex);
            currentPose.addClass("active-pose-first");

            currentPoseDuration = currentPose.data("duration") * 1000;
            poseStartTime = new Date();

            poseTimeoutId = setTimeout(() => {
                // IF NON-LAST CARD IN MINI-SEQUENCE.
                if (otherSideStart[poseIndex] === -1) {
                    // Set "otherSide" data attribute to opposite value after first switch. this is required for the click to set pose feature to work smoothly
                    // currentPose.data().otherside = !currentPose.data()
                    //     .otherside;
                    // miniSequenceInProgress = true;
                    poseIndex++;
                    setPose();
                } else {
                    // IF LAST CARD IN MINI-SEQUENCE.
                    if (otherSideStart[poseIndex - 1] === -1) {
                        poseIndex = otherSideStart[poseIndex];
                        otherSideStart = [0, 1, 2, 3, 4, 5, 6, 7];
                        // miniSequenceInProgress = false;
                        setPose();
                    } else {
                        // IF POSE REQUIRES R/L
                        if (currentPose.data("otherside")) {
                            currentPose.data().otherside = !currentPose.data()
                                .otherside;
                            setPose();
                            currentPose
                                .addClass("switch-side active-pose-second")
                                .removeClass("almost-done");

                            // IF POSE R/L DONE OR ONE-SIDED
                        } else {
                            currentPose
                                .addClass("done hidden")
                                .removeClass("almost-done");
                            playNextPoseAudio();
                            poseIndex++;
                            setPose();
                        }
                    }
                }
            }, poseTimeRemaining || currentPoseDuration);

            poseEndWarningTimeoutId = setTimeout(() => {
                if (!currentPose.data("otherside")) {
                    currentPose.addClass("almost-done");
                }
            }, poseTimeRemaining - poseEndWarningTime || currentPoseDuration - poseEndWarningTime);
        }
    };

    // Set pose to target card on click
    $(".pose-card").click(function () {
        $("#pause-play-btn").trigger("click");

        clickedPoseIndex = $(".pose-card").index(this);

        // Get number of poses that preceded the clicked card and change appropriate classes
        let prevPosesLength = $(".pose-card").filter(function () {
            return $(".pose-card").index(this) < clickedPoseIndex;
        }).length;

        for (let i = 0; i < prevPosesLength; i++) {
            $poses.eq(i).removeClass().addClass("done pose-card");
        }

        for (let i = clickedPoseIndex; i < $poses.length; i++) {
            $poses.eq(i).removeClass().addClass("pose-card");
        }

        // Refreshing relevant variables and timeouts
        // clearTimeout(poseEndWarningTimeoutId);
        clearTimeout(poseTimeoutId);
        poseIndex = clickedPoseIndex;
        poseStartTime = null;
        timeOfPause = null;
        poseTimeRemaining = null;
        currentPoseDuration = null;

        // if pose is already done, reset its otherside value to the original
        $poses.each(function () {
            if ($(this).hasClass("done") && isPaused) {
                $(this).data().otherside = !$(this).data().otherside;
            }
        });
        setPose();
    });

    // Start routine and timer on click, or pause if already started.
    $("#pause-play-btn").click(() => {
        $("#timer").stopwatch().stopwatch("toggle");

        if (isPaused) {
            $("#play-pause-img").attr("src", "./assets/pause-button.png");

            poseStartTime = new Date();
            isPaused = false;

            setPose();
        } else {
            $("#play-pause-img").attr("src", "./assets/play-button.png");

            timeOfPause = new Date();
            isPaused = true;

            clearTimeout(poseTimeoutId);
            clearTimeout(poseEndWarningTimeoutId);

            // If paused during sequence, then create new variable that takes time pause into account.
            poseTimeRemaining =
                currentPoseDuration - (timeOfPause - poseStartTime);
        }
    });

    // =======================  SOUND  ======================= //

    const playNextPoseAudio = () => {
        document.querySelector("#next-pose-audio").play();
    };
});
