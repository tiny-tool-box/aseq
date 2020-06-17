$(document).ready(() => {
    // Calculate total duration of given yoga sequence in minutes.
    let sequenceDuration = 0;
    sequence.map((pose) => (sequenceDuration += pose.duration * 60));

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
    const poses = $(".pose-card");
    let index = 0;

    const nextPose = () => {
        poses.removeClass("active-pose");
        const currentPose = poses.eq(index);
        currentPose.addClass("active-pose");

        // If not final pose, play next pose, else reset index.
        if (index < poses.length) {
            index++;
            setTimeout(nextPose, currentPose.data().duration * 500);
        } else {
            index = 0;
        }
    };

    // Start routine on click.
    $("#play-pause-btn").click(nextPose);

    // ====================  GLOBAL TIMER ==================== //

    const setTimer = (duration) => {
        let timer = duration,
            minutes,
            seconds;
        const yogaTimer = setInterval(() => {
            minutes = parseInt(timer / 60);
            seconds = parseInt(timer % 60);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $("#timer").text(`${minutes}:${seconds}`);

            // When timer reaches 0, clear interval
            if (--timer < 0) {
                clearInterval(yogaTimer);
            }
        }, 1000);
    };

    setTimer(sequenceDuration);
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
