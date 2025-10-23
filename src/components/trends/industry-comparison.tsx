'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getIndustryComparison } from '@/app/trends/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, BarChart, Download, DollarSign, BookOpen, GraduationCap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { CompareIndustriesOutput } from '@/ai/flows/schemas';

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Entertainment",
  "Construction",
  "Hospitality",
  "Energy"
];

const initialState = {
  data: null,
  error: null,
  downloadableData: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="animate-spin" /> Comparing...
        </>
      ) : (
        <>
          <BarChart /> Compare Industries
        </>
      )}
    </Button>
  );
}

export function IndustryComparison() {
  const [state, formAction] = useFormState(getIndustryComparison, initialState);

  const handleDownload = () => {
    const blob = new Blob([state.downloadableData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'industry-comparison.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry1">Industry 1</Label>
                 <Select name="industry1" defaultValue="Technology">
                  <SelectTrigger id="industry1">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry2">Industry 2</Label>
                <Select name="industry2" defaultValue="Healthcare">
                  <SelectTrigger id="industry2">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
             {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

       {useFormStatus().pending && !state.data && (
         <Card>
           <CardContent className="p-6 text-center">
             <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
             <p className="mt-2 text-muted-foreground">AI is preparing your comparison...</p>
           </CardContent>
         </Card>
      )}

      {state.data && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline">Comparison Results</CardTitle>
               <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
             <CardDescription>{state.data.industry1.name} vs. {state.data.industry2.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <IndustryDetail data={state.data.industry1} />
                <IndustryDetail data={state.data.industry2} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function IndustryDetail({ data }: { data: CompareIndustriesOutput['industry1'] }) {
    return (
        <div className="space-y-6">
            <h3 className="font-headline text-xl font-semibold text-primary">{data.name}</h3>
            <div className="space-y-4">
                <InfoSection icon={DollarSign} title="Salary Trend">
                    <p className="text-sm text-muted-foreground">{data.salaryTrend}</p>
                </InfoSection>
                <InfoSection icon={GraduationCap} title="Relevant Degrees">
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {data.relevantDegrees.map(degree => <li key={degree}>{degree}</li>)}
                    </ul>
                </InfoSection>
                <InfoSection icon={BookOpen} title="Relevant Courses">
                     <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {data.relevantCourses.map(course => <li key={course}>{course}</li>)}
                    </ul>
                </InfoSection>
            </div>
        </div>
    )
}

function InfoSection({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <h4 className="font-semibold">{title}</h4>
                {children}
            </div>
        </div>
    )
}
