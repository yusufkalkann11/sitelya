import { Composition } from "remotion";
import { SitelyaReel, REEL_DURATION } from "./SitelyaReel";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SitelyaReel"
      component={SitelyaReel}
      durationInFrames={REEL_DURATION}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
