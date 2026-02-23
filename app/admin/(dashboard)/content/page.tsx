
import { getContent } from '@/lib/content';
import ContentEditor from '@/components/admin/ContentEditor';

export default async function ContentPage() {
    const content = await getContent();

    return <ContentEditor initialContent={content} />;
}
