'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';

const roadmapSteps = [
  { title: 'Complete "Advanced Python" course', completed: true },
  { title: 'Build a portfolio project with Django', completed: true },
  { title: 'Start learning about Cloud Deployment', completed: false },
  { title: 'Prepare for technical interviews', completed: false },
];

export function CareerRoadmapPreview() {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Career Roadmap</CardTitle>
        <CardDescription>Your next steps to becoming a Senior Software Engineer.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {roadmapSteps.map((step, index) => (
            <li key={index} className="flex items-center gap-3">
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              <span className={step.completed ? 'text-muted-foreground line-through' : 'font-medium'}>
                {step.title}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href="/roadmap">
            View Full Roadmap <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
