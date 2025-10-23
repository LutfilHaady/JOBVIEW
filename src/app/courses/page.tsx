import { AppShell } from '@/components/layout/app-shell';
import { CourseSearch } from '@/components/courses/course-search';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CoursesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">SkillsFuture Course Search</CardTitle>
                <CardDescription>
                    Search for courses from SkillsFuture Singapore to upgrade your skills and advance your career.
                </CardDescription>
            </CardHeader>
        </Card>
        <CourseSearch />
      </div>
    </AppShell>
  );
}
