'use client';

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import { CardDescription } from '../ui/card';

const chartData = [
  { month: 'Jan', salary: 85000 },
  { month: 'Feb', salary: 88000 },
  { month: 'Mar', salary: 90000 },
  { month: 'Apr', salary: 92000 },
  { month: 'May', salary: 95000 },
  { month: 'Jun', salary: 98000 },
];

const chartConfig = {
  salary: {
    label: 'Salary',
    color: 'hsl(var(--primary))',
  },
};

export function SalaryChart() {
  return (
    <>
      <CardDescription>Estimated salary progression for a Software Engineer in Singapore.</CardDescription>
      <div className="h-[250px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="salary"
                type="monotone"
                stroke="var(--color-salary)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-salary)',
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </div>
    </>
  );
}
