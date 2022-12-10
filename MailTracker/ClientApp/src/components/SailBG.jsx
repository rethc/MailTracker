import Sail from "../components/sailbg.webp";

export default function SailBG() {
  return (
    <div
      style={{
        backgroundImage: `url(${Sail})`,
        backgroundRepeat: "no-repeat",
        position: "absolute", 
        bottom: 0,
        right: 0,
        width: 580,
        height: 256,
      }}
    />
  );
}