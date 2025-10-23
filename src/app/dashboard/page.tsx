'use client';
import { AppShell } from '@/components/layout/app-shell';
import { UserProfileCard } from '@/components/dashboard/user-profile-card';
import { KeyMetricsCards } from '@/components/dashboard/key-metrics-cards';
import { SalaryChart } from '@/components/dashboard/salary-chart';
import { Recommendations } from '@/components/dashboard/recommendations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CareerRoadmapPreview } from '@/components/dashboard/career-roadmap-preview';
import { JobHeatmap } from '@/components/dashboard/job-heatmap';
import { CourseSearch } from '@/components/dashboard/course-searchbar';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState<'checking' | 'not_verified' | 'verified'>('checking');
 
  useEffect(() => {
    let mounted = true;
    async function checkVerification() {
      const { data, error } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push('/login');
        return;
      }
      if (!data.user.email_confirmed_at) {
        if (mounted) setStatus('not_verified');
        router.push('/verify');
      } else {
        if (mounted) setStatus('verified');
      }
    }
    checkVerification();
    return () => { mounted = false; };
  }, [router]);

  if (status === 'checking' || status === 'not_verified') return null;


  return (
    <AppShell>
      <div className="space-y-8">
        {/* Search bar at the top */}
        <CourseSearch />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* LEFT COLUMN — Profile + Metrics */}
          <div className="col-span-1 flex flex-col gap-6 lg:gap-8">
            <UserProfileCard key={refresh} />
            <KeyMetricsCards />
          </div>

          {/* RIGHT COLUMN — Heatmap + Salary + Recommendations + Roadmap */}
          <div className="col-span-1 space-y-6 lg:col-span-2 lg:space-y-8">
            {/* Heatmap FIRST */}
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">
                  Job Availability Heatmap (Singapore)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <JobHeatmap />
              </CardContent>
            </Card>

            {/* Salary Trends BELOW the Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Salary Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <SalaryChart />
              </CardContent>
            </Card>

            {/* Recommendations + Career Roadmap stay the same */}
            <Recommendations />
            <CareerRoadmapPreview />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
