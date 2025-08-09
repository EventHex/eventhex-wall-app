import {WallImage} from '../../../public';
const photos = [
  { src: WallImage?.src || WallImage, alt: 'Corporate gala celebration' },
  { src: WallImage?.src || WallImage, alt: 'Wedding reception moment' },
  { src: WallImage?.src || WallImage, alt: 'Conference networking' },
  { src: WallImage?.src || WallImage, alt: 'Birthday party celebration' },
  { src: WallImage?.src || WallImage, alt: 'Graduation ceremony' },
  { src: WallImage?.src || WallImage, alt: 'Music concert crowd' },
  { src: WallImage?.src || WallImage, alt: 'Corporate team building' },
  { src: WallImage?.src || WallImage, alt: 'Award ceremony' },
  { src: WallImage?.src || WallImage, alt: 'Food festival' },
  { src: WallImage?.src || WallImage, alt: 'Art gallery opening' },
  { src: WallImage?.src || WallImage, alt: 'Sports tournament' },
  { src: WallImage?.src || WallImage, alt: 'Charity gala' },
];

export const PhotoFlow = () => {
  console.log('Animation config - float-left duration: 40s, float-right duration: 40s');

  return (
    <div className="relative w-full h-full overflow-hidden" style={{height: '100%', minHeight: '100%'}}>
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(60)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Light rays effect */}
        {/* <div className="absolute inset-0 transform rotate-12 animate-shimmer" /> */}
      </div>

      {/* Photos flowing LEFT TO RIGHT */}
      {[...Array(75)].map((_, i) => {
        const photoIndex = i % photos.length;
        const photo = photos[photoIndex];
        const rotation = (Math.random() - 0.5) * 120; // -60 to +60 degrees for dramatic tilt
        // const horizontalOffset = (Math.random() - 0.5) * 100; // Random horizontal slide -50px to +50px
        const speed = 30 + Math.random() * 30; // Random speed between 30s and 60s
        const delay = -Math.random() * 40;
        return (
          <div
            key={`left-${i}`}
            className="absolute animate-float-left opacity-90 hover:opacity-100 transition-opacity duration-300 will-change-transform"
            style={{
              top: `${Math.random() * 80 + 5}%`,
              left: 0,
              animation: `float-left ${speed}s linear ${delay}s infinite`,
              zIndex: 10 + i,
              '--rotation': `${rotation}deg`,
            }}
          >
            <div className="relative group">
              {/* Small white album frame */}
              <div className="bg-white p-1.5 rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl opacity-50" />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="relative w-48 h-32 object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Photos flowing RIGHT TO LEFT */}
      {[...Array(75)].map((_, i) => {
        const photoIndex = (i + 8) % photos.length;
        const photo = photos[photoIndex];
        const rotation = (Math.random() - 0.5) * 120; // -60 to +60 degrees for dramatic tilt
        // const horizontalOffset = (Math.random() - 0.5) * 100; // Random horizontal slide -50px to +50px
        const speed = 30 + Math.random() * 30; // Random speed between 30s and 60s
        const delay = -Math.random() * 40;
        return (
          <div
            key={`right-${i}`}
            className="absolute animate-float-right opacity-90 hover:opacity-100 transition-opacity duration-300 will-change-transform"
            style={{
              top: `${Math.random() * 80 + 5}%`,
              left: 0,
              animation: `float-right ${speed}s linear ${delay}s infinite`,
              zIndex: 15 + i,
              '--rotation': `${rotation}deg`,
            }}
          >
            <div className="relative group">
              {/* Small white album frame */}
              <div className="bg-white p-1.5 rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg blur-xl opacity-50" />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="relative w-48 h-32 object-cover rounded-sm"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};