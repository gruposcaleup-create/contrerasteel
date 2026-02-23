
import { getSubmissions } from '@/lib/submissions';
import MessagesList from '@/components/admin/MessagesList';

export default async function MessagesPage() {
    const submissions = await getSubmissions();

    return <MessagesList initialSubmissions={submissions} />;
}
