import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

export default function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <AppLayout>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="card-gov flex items-center justify-center h-64">
        <p className="text-sm text-gov-text-body">This module is under development.</p>
      </div>
    </AppLayout>
  );
}
