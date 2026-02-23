
import SettingsForm from '@/components/admin/SettingsForm';
import { getContent } from '@/lib/content';

export default async function SettingsPage() {
    const content = await getContent();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white/90 font-oswald uppercase">Settings</h2>
                <p className="text-zinc-400 font-manrope">Manage configuration and public content.</p>
            </div>

            <SettingsForm initialContent={content} />
        </div>
    );
}
