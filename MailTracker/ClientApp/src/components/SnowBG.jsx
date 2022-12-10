import Snow from "../components/snowbg.webp";

export default function SnowBG() {
  return (
    <div
      style={{
        backgroundImage: `url(${Snow})`,
        backgroundRepeat: "no-repeat",
        position: "fixed", 
        bottom: 0,
        right: 0,
        width: 545,
        height: 273,
        zIndex: -1,
      }}
    />
  );
}