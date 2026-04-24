import React from 'react';
import {Roboto, Poppins, Jockey_One} from "next/font/google";

import LoveDay from "next/font/local"

const roboto = Roboto({
  weight: ["100", "200", "300","400","500","600","700","800","900"],
  subsets: ["latin"]
})

const poppins = Poppins({
  weight: ["100", "200", "300","400","500","600","700","800","900"],
  subsets: ["latin"]
})

const jockeyOne = Jockey_One({
  weight: ["400"],
  subsets: ["latin"]
})

const loveDay = LoveDay({
  src: "../../public/fonts/love-days.ttf",
})

const FontExample = () => {
  return (
      <div>
        <h1 className={`text-4xl ${poppins.className}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est deserunt adipiscing.</h1>

        <p className={`${roboto.className}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem illum tincidunt nostrud imperdiet duo sit commodi. Fugiat ut adipiscing ullamcorper commodi sit ad sint est feugait sadipscing liber commodo obcaecat. Voluptate ullamcorper velit eleifend cum enim sadipscing. Volutpat sint enim laboris mazim. Nibh dignissim sit.</p>

        <br/>

        <p className={`${jockeyOne.className}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem illum tincidunt nostrud imperdiet duo sit commodi. Fugiat ut adipiscing ullamcorper commodi sit ad sint est feugait sadipscing liber commodo obcaecat. Voluptate ullamcorper velit eleifend cum enim sadipscing. Volutpat sint enim laboris mazim. Nibh dignissim sit.</p>

        <br/>

        <p className={`${loveDay.className}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem illum tincidunt nostrud imperdiet duo sit commodi. Fugiat ut adipiscing ullamcorper commodi sit ad sint est feugait sadipscing liber commodo obcaecat. Voluptate ullamcorper velit eleifend cum enim sadipscing. Volutpat sint enim laboris mazim. Nibh dignissim sit.</p>

      </div>
  );
};

export default FontExample;