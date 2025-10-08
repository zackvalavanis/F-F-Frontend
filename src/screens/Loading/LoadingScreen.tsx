import { Player } from "@lottiefiles/react-lottie-player";
import prepareFood from "../../assets/Prepare-Food.json";
import { useNavigate } from "react-router-dom";

export function LoadingScreen() {
  const navigate = useNavigate()
  return (
    <Player
      autoplay
      speed={2}
      src={prepareFood}
      loop={false}
      style={{ height: 300, width: 300 }}
      onEvent={(event) => {
        if (event === "complete") {
          navigate('/recipes')
        }
      }}
    />
  )
}