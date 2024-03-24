/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    transitionProperty: {
      500: "500ms ease all",
      800: "1100ms ease all",
    },
    backgroundColor: {
      white: "hsl(120, 100%, 98%)",
      //green: "hsl(129, 100%, 7%)",
      greenGraded: "hsl(112, 85%, 19%, 0.8)",
      green: "hsl(137, 53%, 16%)",
      greenGraded1: "hsl(112, 87%, 19%)",
      greenGradedHov: "hsl(112, 31%, 55%, 0.1)",
      loading: "rgb(165, 165, 165, 0.2)",
      whiteGraded: "hsl(112, 42%, 86%)",
      whiteOpaque: "hsl(0, 14%, 97%)",
      pink: "hsl(303, 73%, 47%)",
    },
    colors: {
      white: "hsl(120, 100%, 98%)",
    },
    textColor: {
      white: "hsl(120, 100%, 98%)",
      pureWhite: "hsl(0, 0%, 100%)",
      whiteHov: "hsl(133, 84%, 56%)",
      greenGraded1: "hsl(112, 87%, 19%)",
      red: "red",
      text: "hsl(139, 61%, 92%)",
    },
    borderColor: {
      grey: "hsl(0, 0%, 68%, 0.7)",
    },
    boxShadowColor: {
      gradedBack: "hsl(0, 0%, 64%)",
    },

    extend: {
      zIndex: {
        "-10": "-10",
      },
      maxWidth: {
        md: "126px",
        hov: "396px",
        md1: "116px",
        xmd: "406px",
        thead: "1200px",
        addCourse: "600px",
      },
      minWidth: {
        addCourse: "800px",
        maxo: "84%",
        innerlay: "80%",
        innerlay3: "100%",
        innerlay2: "20%",
        maxc: "95%",
        form: "100%",
        mino: "16%",
        minc: "5%",
        sidebarImg: "80%",
        grid: "20%",
      },
      maxWidth: {
        maxo: "80%",
        innerlay: "70%",
        maxc: "95%",
        mino: "20%",
        minc: "5%",
        minnelayer: "100%",
        overviewLayer: "60%",
        pixel900: "2800px",
      },
      height: {
        any: "11vh",
        unimport: "auto !important",
        76: "76%",
        gallery1: "180px",
        gallery2: "150px",
        card: "650px",
        thirtyFive: "35rem",
        fortyFive: "45rem",
        fifty: "50rem",
      },
      fontSize: {
        15: "15px",
        16: "16px",
        17: "17px",
      },
      padding: {
        responsive: "max(4vh, 6rem)",
        responsive2: "max(2vh, 3rem)",
        responsive3: "max(1vh, 2rem)",
        responsive4: "max(0vh, 0.9rem)",
        containerpad: "0.7em 0",
        padWidth: "0vh 8em",
        bottom: "0% 100%",
      },
      width: {
        percent90: "100%",
        percen90: "90%",
        percen50: "130px",
        gallery: "280px",
        gallery1: "10rem",
      },
      backgroundColor: {
        // dark: "hsl(98, 89%, 7%)",
      },
      borderWidth: {
        width1px: "0.5px",
      },
      colors: {
        transparent: "transparent",
        dark: "hsl(106, 91%, 5%)",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "hsl(106, 10%, 49%)",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        bubblegum: "#ff77e9",
        bermuda: "#78dcca",
      },
      borderColor: {
        blackui: "black",
        greenui: "hsl(0, 14%, 97%)",
      },
      top: {
        add: "-56%",
      },
      borderRadius: {
        radius50: "50%",
      },
      boxShadow: {
        spread: "6px 6px auto",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    // function ({ addUtilities }) {
    //   const newUtilities = {
    //     ".scrollbar-thin": {
    //       scrollbarWidth: "thin",
    //       scrollbarColor: "hsl(112, 85%, 19%, 0.8)",
    //     },
    //     ".scrollbar-webkit": {
    //       "&::-webkit-scrollbar": {
    //         width: "8px",
    //         "&::-webkit-scrollbar-track": {
    //           background: "hsl(106, 91%, 5%)",
    //         },
    //         "&::-webkit-scrollbar-thumb": {
    //           background: "hsl(106, 91%, 5%)",
    //           borderRadius: "20px",
    //           border: "1px solid white",
    //         },
    //         "&::-webkit-scrollbar": {
    //           background: "hsl(106, 91%, 5%)",
    //         },
    //       },
    //     },
    //   };
    //   addUtilities(newUtilities, ["responsive", "hover"]);
    // },
  ],
};
