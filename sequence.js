// ==================== HARD-CODED SEQUENCE ==================== //

const poses = [
    {
        name: "Classical Sun Salutations (Surya Namaskar)",
        otherSide: false,
        description: "",
        imageRef: "./assets/aseq_SM1.png",
    },
    {
        name: "Standing With Inhale Knee up to Hip-Height",
        otherSide: true,
        description: null,
        imageRef: "./assets/aseq_kneeupwarmup1_1.png",
    },
    {
        name: "Palms Together (Anjali Mudra), Exhale Twist",
        otherSide: true,
        description: null,
        imageRef: "./assets/aseq_kneeupwarmup1_2.png",
    },
    {
        name: "Inhale Open Chest, Hand to the Knee, and Look Over Shoulder",
        otherSide: true,
        description:
            "Step back with the (L/R) foot perpendicular to the front of the mat. The R/L foot points to the front of the mat. The hips face the long edge of the mat. With hands on the shoulders, or out to sides, hinge to the (R/L) and then, drop the R/L hand down. The L/R arm can reach for the ceiling, or be tucked behind your back, to help keep the chest open",
        imageRef: "./assets/aseq_kneeupwarmup1_3.png",
    },
    {
        name: "Triangle (Trikonasana)",
        otherSide: true,
        description: null,
        imageRef: "./assets/aseq-triangle.png",
    },
    {
        name: "Revolved Triangle (Parivrtta Trikonasana)",
        otherSide: true,
        description:
            "Tadāsana -> Inhale lift R/L foot -> Exhale step to Warrior 1 -> Inhale palms together and up -> Exhale hands down and interlaced behind the back for Humble Warrior -> Bring the R/L heel up and transfer weight to the L/R foot, optionally lifting the R/L foot and straightening the L/R leg for Warrior 3.",
        imageRef: "./assets/aseq-revolved-triangle.png",
    },
    {
        name: "Tadasana -> W1 -> humble -> heel-up -> prep for W3",
        otherSide: true,
        description: null,
        imageRef: "./assets/aseq-w1-w3.png",
    },
    {
        name: "Tadasana -> W1 -> heel-up -> W3",
        otherSide: true,
        description:
            "Same as previous, but after W3, look down, drop the R/L hand to the floor or a block, and try to use the exhale to revolve to the left. The hips stay facing the mat, and the L/R hand can optionally come behind you or reach up, after you have already found the twist.",
        imageRef: "./assets/aseq_revolved_half_moon.png",
    },
];

const sequence = [
    [
        {
            pose: poses[0],
            duration: 2,
        },
    ],
    [
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
    ],
    [
        {
            pose: poses[4],
            duration: 2,
        },
    ],
    [
        {
            pose: poses[5],
            duration: 4,
        },
    ],
    [
        {
            pose: poses[6],
            duration: 2,
        },
    ],
    [
        {
            pose: poses[7],
            duration: 1,
        },
    ],
];

const config = {
    warningTime: 15000,
};
