import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";

window.addEventListener("DOMContentLoaded", () => {
  const slider = new Slider(".page", ".next");
  slider.render();

  const player = new VideoPlayer(".showup .play", ".overlay");
  player.init();

  new Difference(".officerold", ".officernew", ".officer__card-item").init();
});
