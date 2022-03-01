import "./App.css";
import Navbar from "./components/Navbar";
import ninjaSupport from "./images/ninjasupport.png";
import FeatureItem from "./components/FeatureItem";
import chain from "./images/chain.png";
import controller from "./images/controller.png";
import viewer from "./images/viewer.png";
import crystals from "./images/crystals.png";
import polygon from "./images/polygon.png";
import chest from "./images/chest2.png";
import FAQPanel from "./components/FAQPanel";
import FAQs from "./constants/FAQs";

const App = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#e7d7ff] to-white">
        <Navbar />
        <div className="flex flex-col justify-center align-center py-24">
          <div className="flex align-center justify-center lg:mt-14">
            <img
              src={ninjaSupport}
              className="h-24 w-30 lg:h-32 lg:w-50"
              alt="Ninja Support"
            ></img>
          </div>
          <div className="text-4xl font-serif font-black text-black text-center lg:text-7xl mt-4 ">
            Support streamers, <br></br>get crypto
          </div>
          <div className="text-md lg:text-2xl text-black80 font-normal font-sans text-center my-8">
            Turn your channel’s donations and subs <br></br> into crypto-based
            rewards for fans
          </div>
          <button className="flex bg-primary py-4 px-8 font-black text-white font-serif text-center align-center justify-center self-center rounded-md hover:bg-primary-light">
            GET STARTED
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center align-center pt-12">
        <div className="text-3xl font-serif font-bold text-black33 text-center lg:text-4xl mt-48 mb-12 lg:mb-24">
          How it works
        </div>
        <div className="grid grod-cols-1 lg:grid-cols-11 align-center place-content-center lg:mb-48">
          <div />
          <FeatureItem
            title="Customize"
            subtitle="Streamers can customize and mint their own Loot Set on the blockchain, which connects to Twitch donations and subs"
            imgSrc={crystals}
            alt="crystals"
          />
          <FeatureItem
            title="Claim"
            subtitle="As viewers donate and sub on stream, their Stream Loot is automatically reserved. They can mint it on the blockchain on demand"
            imgSrc={chain}
            alt="chain"
          />
          <FeatureItem
            title="Trade"
            subtitle="Loot is decentralized and tradeable. It can be incorporated into promotions, events, and much more."
            imgSrc={polygon}
            alt="polygon"
          />
          <div />
        </div>
        <div className="text-3xl font-serif font-bold text-black33 text-center lg:text-4xl mt-48 mb-2">
          Learn more
        </div>
        <div className="text-sm lg:text-lg text-black80 font-normal font-sans text-center italic mb-16">
          FAQs and common questions
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center">
          <div className="flex flex-col align-center justify-center">
            <div className="flex align-center justify-center">
              <img
                src={controller}
                className="h-10 w-12 mb-2"
                alt="controller"
              />
            </div>
            <div className="text-center font-sans text-lg text-black80 italic mb-4">
              Streamers
            </div>
            <FAQPanel faqs={FAQs.streamers} />
          </div>
          <div className="flex flex-col align-center justify-center">
            <div className="flex align-center justify-center">
              <img src={viewer} className="h-10 w-12 mb-2" alt="controller" />
            </div>
            <div className="text-center font-sans text-lg text-black80 italic mb-4">
              Viewers
            </div>
            <FAQPanel faqs={FAQs.streamers} />
          </div>
        </div>
        <div className="flex flex-col justify-center py-48 bg-gradient-to-t from-[#FFFAED] to-white">
          <FeatureItem
            title="View your loot"
            subtitle="Log in to Twitch to see what's ready for you!"
            imgSrc={chest}
            alt="chest"
          />
          <button className="flex bg-primary mt-6 py-4 px-8 font-black text-white font-serif text-center align-center justify-center self-center rounded-md hover:bg-primary-light">
            GET STARTED
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
