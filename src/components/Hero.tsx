
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageSrc?: string;
}

const Hero = ({ title, subtitle, ctaText, ctaLink, imageSrc }: HeroProps) => {
  return (
    <div className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-lg">
              {subtitle}
            </p>
            <Link to={ctaLink}>
              <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 hover:text-brand-accent btn-hover-effect">
                {ctaText}
              </Button>
            </Link>
          </div>
          
          {imageSrc && (
            <div className="md:w-1/2 flex justify-end animate-slide-down">
              <img
                src={imageSrc}
                alt="Hero image"
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
          )}
          
          {!imageSrc && (
            <div className="md:w-1/2 flex justify-center animate-slide-down">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Wireless Noise-Cancelling Headphones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Ultra-Thin Laptop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Smart Fitness Watch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>4K Ultra HD Smart TV</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
