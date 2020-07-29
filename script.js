$(document).ready(() => {
    let timeOfPause,
        poseTimeRemaining,
        poseTimeoutId,
        currentPose,
        currentPoseDuration,
        genOutput,
        flowStart,
        otherSideIndex,
        flowStartOnGen;
    let totalDuration = 0;
    let poseIndex = 0;
    let currentPoseSide = "first";
    let isPaused = true;
    let flowInProgress = false;
    let lastPoseInFlow = false;
    let poseEndWarningTime = config.warningTime;

    // ====================== GENERATE YOGA CARDS ======================= /

    // Calculate total duration of given yoga sequence in seconds.
    sequence.map((pose) => (totalDuration += pose.duration * 60));

    flowStart = [];
    otherSideIndex = 0;
    genOutput = "";
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

            genOutput += `<div class="pose-card" data-twosided=${twoSided} data-duration=${item.duration} >
                  <div class="pose-card-title">${name}</div>
                  <img src=${imageRef || "./assets/yoga-stick.png"} />
                   <p class=${description ? "description" : "no-description"}>${description}</p>
                  <h6 class="duration">Duration: ${
                      twoSided ? item.duration + " mins — each side" : item.duration + " mins"
                  } </h6>
              </div>`;
        });
    });

    $("#pose-container").html(genOutput);
    // Clone flowStart array for start pose on click functionality.
    flowStartOnGen = [...flowStart];

    let $poses = $(".pose-card");

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
                    greyOutPreviousPose(poseIndex);
                } else if (getPoseData("twosided", poseIndex) && currentPoseSide == "first") {
                    updatePoseState("second", poseIndex);
                } else {
                    updatePoseState("first", ++poseIndex);
                    greyOutPreviousPose(poseIndex);
                }
            }, poseTimeRemaining || currentPoseDuration);

            poseEndWarningTimeoutId = setTimeout(() => {
                // If one-sided pose or on second side, add warning border.
                if (!getPoseData("twosided", poseIndex) || currentPoseSide == "second") {
                    addClassToPose("almost-done", poseIndex);
                }
            }, poseTimeRemaining - poseEndWarningTime || currentPoseDuration - poseEndWarningTime);
        } else {
            $("#timer").stopwatch().stopwatch("toggle");
        }
    };

    // SET POSE TO TARGET CARD ON CLICK.
    $(".pose-card").click(function () {
        if (isPaused) {
            $("#pause-play-btn").trigger("click");
        }

        clickedPoseIndex = $(".pose-card").index(this);
        flowStart = [...flowStartOnGen];

        // If clicked pose is in flow or at end flow, start from beginning of flow
        if (flowStart[clickedPoseIndex] < 0 || flowStart[clickedPoseIndex] < clickedPoseIndex) {
            clickedPoseIndex = flowStart.indexOf(-1);
        }

        // Get number of poses that preceded the clicked card and change appropriate classes
        let prevPosesLength = $(".pose-card").filter(function () {
            return $(".pose-card").index(this) < clickedPoseIndex;
        }).length;

        for (let i = 0; i < prevPosesLength; i++) {
            $(".pose-card").eq(i).removeClass().addClass("done pose-card");
        }

        for (let i = clickedPoseIndex; i < $poses.length; i++) {
            $(".pose-card").eq(i).removeClass().addClass("pose-card");
        }
        // Resetting relevant variables and timeouts.
        clearTimeout(poseTimeoutId);
        clearTimeout(poseEndWarningTimeoutId);
        poseIndex = clickedPoseIndex;
        poseStartTime = null;
        timeOfPause = null;
        currentPoseDuration = null;
        poseTimeRemaining = undefined;
        flowInProgress = false;
        lastPoseInFlow = false;

        updatePoseState("first", clickedPoseIndex);
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

            // If paused during sequence, then create new variable that takes pause time into account.
            poseTimeRemaining = currentPoseDuration - (timeOfPause - poseStartTime);
        }
    });

    // ============ HELPER FUNCTIONS ============ //
    const addClassToPose = (targetClass, poseIndex) => {
        $poses.eq(poseIndex).addClass(targetClass);
    };

    const getPoseData = (targetData, poseIndex) => $poses.eq(poseIndex).data(targetData);

    const greyOutPreviousPose = (poseIndex) => {
        addClassToPose("done", poseIndex - 1);
    };

    // =======================  SOUND  ======================= //

    const playNextPoseAudio = () => {
        document.querySelector("#next-pose-audio").play();
    };
});
