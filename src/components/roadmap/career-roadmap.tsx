import { CheckCircle2, Circle, GraduationCap, Briefcase, Award } from 'lucide-react';

const roadmapData = [
  {
    icon: GraduationCap,
    title: 'Learn Advanced Python',
    description: 'Complete the "Advanced Python for Developers" course on Coursera.',
    status: 'completed',
    date: 'Jan 2024',
  },
  {
    icon: Briefcase,
    title: 'Build Portfolio Project',
    description: 'Develop and deploy a full-stack web application using Django and React.',
    status: 'completed',
    date: 'Mar 2024',
  },
  {
    icon: GraduationCap,
    title: 'Master Cloud Technologies',
    description: 'Enroll in the "AWS Certified Developer" course to gain cloud expertise.',
    status: 'in_progress',
    date: 'Current',
  },
  {
    icon: Award,
    title: 'Get AWS Certification',
    description: 'Achieve the AWS Certified Developer - Associate certification.',
    status: 'todo',
    date: 'Upcoming',
  },
   {
    icon: Briefcase,
    title: 'Apply for Senior Roles',
    description: 'Start applying for Senior Software Engineer positions.',
    status: 'todo',
    date: 'Upcoming',
  },
];

export function CareerRoadmap() {
  return (
    <div className="relative pl-6 after:absolute after:inset-y-0 after:left-6 after:w-px after:bg-border">
      {roadmapData.map((item, index) => (
        <div key={index} className="relative grid grid-cols-[auto_1fr] items-start gap-x-6 pb-12">
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card">
            {item.status === 'completed' ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <CheckCircle2 className="h-6 w-6" />
                </div>
            ) : item.status === 'in_progress' ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                </div>
            ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed bg-card">
                     <item.icon className="h-6 w-6 text-muted-foreground" />
                </div>
            )}
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <div className="text-sm text-muted-foreground">{item.date}</div>
            <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
