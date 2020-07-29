// ==================== HARD-CODED SEQUENCE ==================== //

const poses = [
    {
        name: "Surya Namaskar — Classical Sun salutation",
        twoSided: false,
        description:
            "For warmup, repeat the sun salutation sequence a few times. " +
            "Alternate the side, starting with the right foot: " +
            "First the right food steps back after a forward fold, and the same right foot " +
            "steps forward after downward-facing dog. Then on the left side. " +
            "Forgetting the details? Check this <a href= https://www.youtube.com/watch?v=AbPufvvYiSw>video</a>.",
        imageRef: "./assets/aseq_SM1.png",
    },
    {
        name: "Inhale: Knee Up",
        twoSided: true,
        description:
            "Transfering weight to the standing leg, lift one knee to " +
            "hip-height. Check that the hips remain squared: facing forward, and parallel to the ground.",
        imageRef: "./assets/aseq_kneeupwarmup1_1.png",
    },
    {
        name: "Exhale: Twist",
        twoSided: true,
        description:
            "Keeping the palms together, twist over the knee that is lifted: " +
            "when the right knee is up, twist to the right. Keep the hips suqared, and " +
            "notice any changes in the quality of the balance on the standing leg.",
        imageRef: "./assets/aseq_kneeupwarmup1_2.png",
    },
    {
        name: "Drop the Hands & Deepen Twist",
        twoSided: true,
        description:
            "Inhaling, drop the shoulders away from the ears, opening the chest. " +
            "Let the hands drop diagonally, or straighted to the sides. Optionally, " +
            "look over your shoulder: if you are twisted to the right, over the right " +
            "lifted knee, look over the right shoudler.",
        imageRef: "./assets/aseq_kneeupwarmup1_3.png",
    },
    {
        name: "Trikonasana — Triangle",
        twoSided: true,
        description:
            "Make a step back, with the back foot and the hips facing the long edge of the mat. " +
            "Keep the front foot facing the short edge of the mat. With hands on the shoulders, or out " +
            "to sides, hinge over the front foot, keeping the hips facing the long edge of the mat. " +
            "Drop the from arm down toward your shin or foot. The other arm can reach for the ceiling, " +
            "or be tucked behind your back, to help keep the chest open.",
        imageRef: "./assets/aseq-triangle.png",
    },
    {
        name: "Revolved Triangle",
        twoSided: true,
        description: null,
        imageRef: "./assets/aseq-revolved-triangle.png",
    },
    {
        name: "Warrior I to Warrior III",
        twoSided: true,
        description:
            "From standing, inhale lift the knee, exhale step back to Warrior I: the back foot " +
            "at a 45-degree angle. Inhale palms together and up, dropping shoulders away form the ears " +
            "and creating space around the neck. Bring the back heel up for high lunge, then start to " +
            "transfer weight to the front foot. Optionally, practice lifting the back foot and straightening " +
            "back leg for Warrior III.",
        imageRef: "./assets/aseq-w1-w3.png",
    },
    {
        name: "Warrior III to Half-Moon",
        twoSided: true,
        description:
            "Transition through Warrior I to Warrior III, then look down. If you are standing on " +
            "the right foot, ground the left palm on the mat or block; bring the other hand to the shoulder. " +
            "Use the exhale to revolve to the right (if you are standign on the right foot). The hips stay " +
            "Pointed the back toes toward the mat, which helps keep the hips squared. Take your time to find " +
            " the twist. You can optionally reach up with the top hand, or tuck the arm behind your back.",
        imageRef: "./assets/aseq_revolved_half_moon.png",
    },
];

const sequence = [
    [
        {
            pose: poses[0],
            duration: 6,
        },
    ],
    [
        {
            pose: poses[1],
            duration: 0.5,
        },
        {
            pose: poses[2],
            duration: 0.5,
        },
        {
            pose: poses[3],
            duration: 1,
        },
    ],
    [
        {
            pose: poses[4],
            duration: 1,
        },
    ],
    [
        {
            pose: poses[5],
            duration: 1,
        },
    ],
    [
        {
            pose: poses[6],
            duration: 1.5,
        },
    ],
    [
        {
            pose: poses[7],
            duration: 1.5,
        },
    ],
];

const config = {
    warningTime: 1000,
};
