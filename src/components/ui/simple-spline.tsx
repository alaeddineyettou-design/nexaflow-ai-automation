import Spline from '@splinetool/react-spline';

interface SimpleSplineProps {
  scene: string;
  className?: string;
}

export const SimpleSpline = ({ scene, className = '' }: SimpleSplineProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Spline 
        scene={scene}
        className="w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          willChange: 'transform'
        }}
      />
    </div>
  );
};