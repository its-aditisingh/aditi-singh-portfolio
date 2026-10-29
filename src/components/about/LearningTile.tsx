import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { currentlyLearning } from '@/data/skills';
import { BentoTile } from './BentoTile';

const COLLAPSED_COUNT = 4;

export function LearningTile({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const items = expanded ? currentlyLearning : currentlyLearning.slice(0, COLLAPSED_COUNT);
  const hidden = currentlyLearning.length - COLLAPSED_COUNT;

  return (
    <BentoTile title="Currently learning" icon={Sparkles} className={className}>
      <ul id={listId} className="space-y-4">
        {items.map((item, i) => (
          <li key={item.topic} className="flex gap-3">
            <span aria-hidden className="relative mt-1.5 flex size-2 shrink-0">
              {i === 0 && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <div>
              <h3 className="text-[15px] font-bold leading-snug text-ink">{item.topic}</h3>
              <p className="mt-0.5 text-sm text-muted">{item.note}</p>
              {item.evidence &&
                (item.href ? (
                  <Link
                    to={item.href}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent-ink hover:underline"
                  >
                    {item.evidence}
                    <ArrowUpRight aria-hidden className="size-3" />
                  </Link>
                ) : (
                  <p className="mt-1 text-xs text-muted">{item.evidence}</p>
                ))}
            </div>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-5 text-sm font-semibold text-accent-ink hover:underline"
        >
          {expanded ? 'Show less' : `Show all ${currentlyLearning.length}`}
        </button>
      )}
    </BentoTile>
  );
}
