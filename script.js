$(document).ready(() => {
    let currentPoseStartTime, timeOfPause, poseTimeRemaining, poseTimeoutId, currentPose, currentPoseDuration;
    let totalDuration = 0;
    let currentPoseSide = "first";
    let poseIndex = 0;
    let isPaused = true;
    let flowInProgress = false;
    let lastPoseInFlow = false;
    const poseEndWarningTime = 1000;

    // Calculate total duration of given yoga sequence in seconds.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    // ====================== GENERATE YOGA CARDS ======================= /

    let flowStart = [];
    let otherSideIndex = 0;
    let output = "";
    $.each(sequence, (i, info) => {
        info.forEach((item, key, arr) => {
            // If only 1 item in mini-sequence, or last item in mini-sequence, set array value = to its poseIndex
            if (arr.length == 1 || Object.is(arr.length - 1, key)) {
                // If last part of mini sequence, push first index of mini sequence
                if (flowStart[otherSideIndex - 1] === -1) {
                    flowStart.push(flowStart.indexOf(-1));
                } else {
                    flowStart.push(otherSideIndex);
                }
            } else if (arr.some((x) => x.pose.twoSided)) {
                flowStart.push(-1);
            }

            otherSideIndex++;

            let { twoSided, name, description, imageRef } = item.pose;

            output += `<div class="pose-card" data-twosided=${twoSided} data-duration=${item.duration} >
                  <div class="pose-card-title">${name}</div>
                  <img src=${imageRef || "./assets/yoga-stick.png"} />
                   <p class=${description ? "description" : "no-description"}>${description}</p>
                  <h6>Duration: ${twoSided ? item.duration + " mins — each side" : item.duration + " mins"} </h6>
              </div>`;
        });
    });

    $("#pose-container").html(output);

    const $poses = $(".pose-card");

    const updatePoseState = (currentPoseSide, poseIndex) => {
        // Check if not paused and poses in sequence remaining.
        if (!isPaused && poseIndex < $poses.length) {
            // Set first pose, and timeout for following pose.
            currentPoseDuration = getPoseData("duration", poseIndex) * 1000;
            currentPoseStartTime = new Date();
            currentPose = $poses.eq(poseIndex);

            // Check if flow is in progress.
            flowStart[poseIndex] < 0 ? (flowInProgress = true) : (flowInProgress = false);

            // Check if last pose of flow.
            flowStart[poseIndex] < poseIndex && !flowInProgress ? (lastPoseInFlow = true) : (lastPoseInFlow = false);

            // Add "first" or "second" class depending on given side.
            addClassToPose(currentPoseSide, poseIndex);

            poseTimeoutId = setTimeout(() => {
                if (flowInProgress) {
                    // After first pass, reset poseIndexes to the appropriate non-zero values.
                    flowStart[poseIndex] = poseIndex;
                    addClassToPose("first-flow", poseIndex);
                    updatePoseState("first", ++poseIndex);
                } else if (lastPoseInFlow) {
                    lastPoseInFlow = false;
                    updatePoseState("second", flowStart[poseIndex]);
                    flowStart[poseIndex] = poseIndex;
                    // If first side of flow completed, move on to second side.
                } else if (currentPose.hasClass("first-flow")) {
                    updatePoseState("second", ++poseIndex);
                    addClassToPose("done", poseIndex - 1);
                } else if (getPoseData("twosided", poseIndex) && currentPoseSide == "first") {
                    updatePoseState("second", poseIndex);
                } else {
                    updatePoseState("first", ++poseIndex);
                    addClassToPose("done", poseIndex - 1);
                }
            }, poseTimeRemaining || currentPoseDuration);

            // TIMEOUT FOR WARNING BORDER.
            poseEndWarningTimeoutId = setTimeout(() => {
                // If one-sided pose or on second side, add warning border.
                if (!getPoseData("twosided", poseIndex) || currentPoseSide == "second") {
                    addClassToPose("almost-done", poseIndex);
                }
            }, poseTimeRemaining - poseEndWarningTime || currentPoseDuration - poseEndWarningTime);
        } else {
            $("#timer").stopwatch().stopwatch("toggle");
            alert("Sequence is finished");
        }
    };

    // ============ HELPER FUNCTIONS ============ //
    const addClassToPose = (targetClass, poseIndex) => {
        $poses.eq(poseIndex).addClass(targetClass);
    };

    const getPoseData = (targetData, poseIndex) => $poses.eq(poseIndex).data(targetData);

    const updateUserInterface = (poseInFocus, poseSide, poseHasBorder, poseIsRotating) => {};

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
        updatePoseState(currentPoseSide, poseIndex);
    });

    // Start routine and timer on click, or pause if already started.
    $("#pause-play-btn").click(() => {
        $("#timer").stopwatch().stopwatch("toggle");

        if (isPaused) {
            $("#play-pause-img").attr("src", "./assets/pause-button.png");

            poseStartTime = new Date();
            isPaused = false;

            updatePoseState(currentPoseSide, poseIndex);
        } else {
            $("#play-pause-img").attr("src", "./assets/play-button.png");

            timeOfPause = new Date();
            isPaused = true;

            clearTimeout(poseTimeoutId);
            clearTimeout(poseEndWarningTimeoutId);

            // If paused during sequence, then create new variable that takes time pause into account.
            poseTimeRemaining = currentPoseDuration - (timeOfPause - poseStartTime);
        }
    });

    // =======================  SOUND  ======================= //

    const playNextPoseAudio = () => {
        document.querySelector("#next-pose-audio").play();
    };
});
