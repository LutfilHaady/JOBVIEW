import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type CourseCardProps = {
  title: string;
  provider: string;
  imageUrl: string;
  imageHint: string;
};

export function CourseCard({ title, provider, imageUrl, imageHint }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Badge variant="secondary" className="mb-2">{provider}</Badge>
        <CardTitle className="line-clamp-2 text-lg font-semibold">{title}</CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          View Course
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
