import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className }: { children: ReactNode, className?: string }) => (
    <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden", className)}>
        {children}
    </div>
);

export const CardHeader = ({ title, description }: { title: string, description?: string }) => (
    <div className="p-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        {description && <p className="text-sm text-slate-500">{description}</p>}
    </div>
);

export const CardContent = ({ children, className }: { children: ReactNode, className?: string }) => (
    <div className={cn("p-4", className)}>{children}</div>
);