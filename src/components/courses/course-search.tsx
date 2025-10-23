'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { CourseCard } from './course-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockCourses = [
  {
    title: 'Advanced Certificate in Data Analytics for Business',
    provider: 'Singapore Management University',
    image: PlaceHolderImages.find((img) => img.id === 'course2'),
  },
  {
    title: 'Certified ScrumMaster (CSM) Workshop',
    provider: 'Agile Spirit',
    image: PlaceHolderImages.find((img) => img.id === 'course4'),
  },
  {
    title: 'Google Cloud Professional Cloud Architect',
    provider: 'Coursera',
    image: PlaceHolderImages.find((img) => img.id === 'course6'),
  },
  {
    title: 'UI/UX Design Thinking Masterclass',
    provider: 'General Assembly',
    image: PlaceHolderImages.find((img) => img.id === 'course5'),
  },
  {
    title: 'Introduction to Python Programming',
    provider: 'Nanyang Polytechnic',
    image: PlaceHolderImages.find((img) => img.id === 'course1'),
  },
  {
    title: 'Strategic Business Management',
    provider: 'National University of Singapore',
    image: PlaceHolderImages.find((img) => img.id === 'course3'),
  },
];

export function CourseSearch() {
  return (
    <div className="space-y-6">
      <div className="flex w-full max-w-2xl items-center space-x-2">
        <Input type="text" placeholder="Search by skill, e.g. 'Project Management'" className="flex-1" />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => (
          <CourseCard
            key={course.title}
            title={course.title}
            provider={course.provider}
            imageUrl={course.image?.imageUrl || ''}
            imageHint={course.image?.imageHint || 'course'}
          />
        ))}
      </div>
    </div>
  );
}
