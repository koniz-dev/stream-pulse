import { Metadata } from 'next';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Admin Debug Panel - StreamPulse',
  description: 'Development and debugging tools for StreamPulse',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <Header />
      {children}
    </div>
  );
}
