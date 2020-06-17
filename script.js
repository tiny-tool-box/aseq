$(document).ready(function () {
    // Generate yoga pose cards from hard-coded json.
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

    function nextPose() {
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
    }

    // Start routine on click.
    $("#play-pause-btn").click(nextPose);
});

// Hard-coded sequence from Kit.
const sequence = {
    0: {
        name: "5 mins Classical sun salutations",
        duration: 5,
        switch: false,
    },
    1: {
        name: "Knee up",
        duration: 1,
        switch: true,
    },
    2: {
        name: "Resolve w palms together",
        duration: 3,
        switch: true,
    },
    3: {
        name: "Hands to sides/back",
        duration: 1,
        switch: false,
    },
    4: {
        name: "Triangle",
        duration: 2,
        switch: true,
    },
    5: {
        name: "Resolved triangle",
        duration: 1,
        switch: true,
    },
    6: {
        name: "Tadasana -> W1 -> humble -> heel-up -> prep for W3",
        duration: 1,
        switch: true,
    },
    7: {
        name: "Tadasana -> W1 -> heel-up -> W3",
        duration: 1,
        switch: true,
    },
};
