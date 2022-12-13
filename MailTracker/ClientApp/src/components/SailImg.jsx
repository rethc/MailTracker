import { 
  styled,
} from "@mui/material";

export const SailImg = styled("img")({
  backgroundRepeat: "no-repeat",
  position: "fixed",
  bottom: 0,
  right: 0,
  width: "30vw",
  height: "auto",
  //Fix blurry Image on transform scale
  transform: "translateZ(0)",
  WebkitBackfaceVisibility: "hidden",
  filter: "blur(0)",
  imageRendering: "-webkit-optimize-contrast",
});

export default SailImg;