import { AppShell } from '@/components/layout/app-shell';
import { IndustryComparison } from '@/components/trends/industry-comparison';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TrendsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Industry Comparison</CardTitle>
            <CardDescription>
              Select two industries to compare salary trends, in-demand skills, and recommended education paths.
            </CardDescription>
          </CardHeader>
        </Card>
        <IndustryComparison />
      </div>
    </AppShell>
  );
}
