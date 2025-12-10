import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FeatureCardProps {
  title: string;
  description: string;
  media: ReactNode;
}

export const FeatureCard = ({ title, description, media }: FeatureCardProps) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-white/20 bg-white/5 text-white backdrop-blur-xl">
      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
        {media}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      </div>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold tracking-tight text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between text-base text-white/80">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
