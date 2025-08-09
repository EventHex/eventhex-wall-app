
import { Instasnapbackground, InstaSnapGlitter } from '@/public';
import { PhotoFlow } from '../../components/instasnap/photoWall/left';
import RightSidebar from "@/components/instasnap/RightSidebar";

const Index = () => {
  return (
    <div 
    style={{
               backgroundImage: `url(${Instasnapbackground.src})`,
               backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              minHeight: "100vh",
              height: "auto",
            width: "100%",
      position: "relative",
           }}
    
    className="min-h-screen w-full bg-background flex">
      {/* Main photo display area - no content, just flowing photos */}
      <div className="w-[70%]">
        <PhotoFlow />
      </div>

      {/* Right sidebar */}
      {/* <EventSidebar /> */}
      <div className="w-[30%]">
        <RightSidebar   Glitter={InstaSnapGlitter}/>
      </div>
    </div>
  );
};

export default Index;