import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ArrowUp, Zap } from 'lucide-react';

const inDemandSkills = [
  'Python',
  'React',
  'AWS',
  'SQL',
  'Machine Learning',
  'Go',
];

export function KeyMetricsCards() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Skills in Demand</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {inDemandSkills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Job Availability</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,250+</div>
          <p className="text-xs text-muted-foreground">
            Open roles matching your profile in Singapore
          </p>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <ArrowUp className="h-4 w-4" />
            <span className="ml-1">+12% from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
