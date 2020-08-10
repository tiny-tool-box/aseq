
const poses = [
    {
        name: "Swings",
        twoSided: false,
        description:
            "Inhale reach the arms up. Exhale bend the knees and hinge forward from the hips, " +
            "and find a forward fold. Let the hand swing behind you and up, as far as comfortable.  " +
            "<br><Br>(1) First find a fold with knees bent generously; (2) then begin to straighten the legs."+
            "<br><Br>Explore feet at hips-width apart, vs. together (toes touching, heels slightly apart).",
        imageRef: "../assets/aseq_swings.png",
    },
    {
        name: "Tip-toes",
        twoSided: false,
        description:
            "Inhale arms up; exhale bing shoulders down and back away form the ears. " +
            "Next inhale, start to lift the heels up as much as still allows staying in balance. " +
            "Next exhale, bring the hand to heart center (keeping space around the next - shoulders down and back) "+
            "and start to find a squat down. If you want, stay a few breaths in the squat.",
        imageRef: "../assets/aseq_toes.png",
    },
    {
        name: "Wide-kneed Child + Sidebends",
        twoSided: true,
        description:
            "With backs of the feet grounded and knees wide, hinge forward and crawl your hands forward. " +
            "Imagine (on inhale) a lot of space around the neck: eg, by sending shoulders away from the ears. " +
            "Imagine (on exhale) the heart melting toward the ground. " +
            "<br>Exhale and contract one side (first right), walking your hands to that side. "+
            " Inhale into the opposite (first left) flank, expanding on this side.",
        imageRef: "../assets/aseq_wide-child-sidebend.png",
    },
    {
        name: "Seated Twist",
        twoSided: true,
        description: "Bring one (first, Right) foot near you, inhale the opposite hand up, and exhale find a twist "+
            "to the (first, Right) side. With every inhale, imagine a long line from the seat through the spine, neck, "+
            "and the crown of the head. If you want to find deeper twist, you can do that on the exhales.",
        imageRef: "../assets/aseq_marichyasanaC.png",
    },
    {
        name: "Supine Pigeon",
        twoSided: true,
        description: "Lying flat on your back, bring both feet on the floor. Bring (first, Right) ankle to opposite knee "+
            "and optionally walk the (Left) foot closer, or use your hands, to find a sensation in the (Right) hip to stay with." +
            "<br><br>Commit to stillness for 15 seconds, then optionally adjust, then find stillness again for 15-30 if comfortable.",
        imageRef: "../assets/aseq_supine_pigeon.png",
    },
    {
        name: "Deep Twist",
        twoSided: true,
        description: "Right after the previous pose, bring the (first, Left) foot to the floor, bring the (Right) leg completely "+
            "crossing the (Left), and let both legs fall to the (left). You can reach the (right) hand to the side, whatever feels nice. "+
            "<br><br>With each exhale, notice anything that is working that doesn't need to be working, that can become relaxed.",
        imageRef: "../assets/aseq_deeptwist.png",
    },
    {
        name: "Legs Up",
        twoSided: false,
        description: "Lying flat on your back, bring your legs up. Optionally, also arms; in this case, keep the shoulders on the ground. "+
        " Experiment with flexing your feet, making circles with your feet, etc. Consider committing to stillness for 10-15 seconds.",
        imageRef: "../assets/aseq-VK.png",
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
            duration: 0.5,
        },
    ],
    [
        {
            pose: poses[2],
            duration: 0.5,
        },
    ],
    [
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
        {
            pose: poses[5],
            duration: 1,
        },
    ],
    [
        {
            pose: poses[6],
            duration: 0.5,
        },
    ]
];

const config = {
    warningTime: 1000,
};
