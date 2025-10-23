import { AppShell } from '@/components/layout/app-shell';
import { CareerRoadmap } from '@/components/roadmap/career-roadmap';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoadmapPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Career Roadmap</CardTitle>
            <CardDescription>
              A personalized, step-by-step guide to help you achieve your career goals.
            </CardDescription>
          </CardHeader>
        </Card>
        <CareerRoadmap />
      </div>
    </AppShell>
  );
}
