import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 p-2 rounded-full bg-white/90 
        shadow-md hover:shadow-lg transition-all duration-200 
        hover:scale-105 backdrop-blur-sm"
    >
      <ArrowLeft className="text-gray-700" size={24} />
    </button>
  );
};