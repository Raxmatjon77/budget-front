import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, DollarSign } from 'lucide-react';
import { outcomesApi } from '@/api/outcomes';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatShortDate, formatTime } from '@/utils/format';
import type { Outcome } from '@/types';

export function OutcomeDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [outcome, setOutcome] = useState<Outcome | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOutcome = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await outcomesApi.getOutcome(Number(id));
                setOutcome(data);
            } catch (err) {
                console.error('Failed to fetch outcome:', err);
                setError('Failed to load outcome details');
            } finally {
                setLoading(false);
            }
        };

        fetchOutcome();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (error || !outcome) {
        return (
            <div className="space-y-4">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <Card>
                    <div className="p-8 text-center text-red-600">
                        {error || 'Outcome not found'}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <h1 className="text-2xl font-semibold text-neutral-900">Outcome Details</h1>
            </div>

            <Card>
                <div className="p-6 space-y-6">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-neutral-100 pb-6">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold text-neutral-900">
                                {outcome.description}
                            </h2>
                            <div className="flex items-center gap-3 text-sm text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatShortDate(outcome.createdAt)} at {formatTime(outcome.createdAt)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    Paid by {outcome.createdByName}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold text-outcome-600">
                                -{formatCurrency(outcome.totalAmountCents)}
                            </span>
                            <Badge variant="outcome">Outcome</Badge>
                        </div>
                    </div>

                    {/* Cost Distribution */}
                    <div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-neutral-400" />
                            Cost Distribution
                        </h3>
                        <div className="bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200">
                            <div className="grid grid-cols-12 gap-4 p-3 bg-neutral-100 text-sm font-medium text-neutral-600 border-b border-neutral-200">
                                <div className="col-span-6">Brother</div>
                                <div className="col-span-3 text-right">Share</div>
                                <div className="col-span-3 text-right">Amount</div>
                            </div>
                            <div className="divide-y divide-neutral-200">
                                {outcome.splits.map((split) => (
                                    <div key={split.brotherId} className="grid grid-cols-12 gap-4 p-3 text-sm">
                                        <div className="col-span-6 font-medium text-neutral-900">
                                            {split.brotherName}
                                        </div>
                                        <div className="col-span-3 text-right text-neutral-600 font-mono">
                                            {split.percentage}%
                                        </div>
                                        <div className="col-span-3 text-right text-neutral-900 font-medium">
                                            {formatCurrency(split.amountCents)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-12 gap-4 p-3 bg-neutral-50 border-t border-neutral-200 text-sm font-semibold">
                                <div className="col-span-6">Total</div>
                                <div className="col-span-3 text-right">100%</div>
                                <div className="col-span-3 text-right">
                                    {formatCurrency(outcome.totalAmountCents)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
