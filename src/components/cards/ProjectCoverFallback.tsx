import { ArrowRight, Brain, ChartLine, Database, Wand2 } from 'lucide-react';
import { cn } from '@/lib/cn';

const steps = [Database, Wand2, Brain, ChartLine];

/** Cover for projects without a screenshot (internship work): the ML pipeline as icons. */
export function ProjectCoverFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex items-center justify-center gap-2 bg-gradient-to-br from-accent-soft via-surface-2 to-surface sm:gap-3',
        className,
      )}
    >
      {steps.map((Icon, i) => (
        <span key={i} className="flex items-center gap-2 sm:gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-surface text-accent shadow-card sm:size-14">
            <Icon strokeWidth={1.75} className="size-5 sm:size-6" />
          </span>
          {i < steps.length - 1 && <ArrowRight className="size-4 text-accent/60" />}
        </span>
      ))}
    </div>
  );
}
