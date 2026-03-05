
import { createClient } from '@supabase/supabase-js';
// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing. Interactions will not be logged.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const logAIInteraction = async (moduleName: string, prompt: string, response: string) => {
    if (!supabaseUrl || !supabaseAnonKey) return;

    try {
        const { error } = await supabase
            .from('ai_logs')
            .insert([
                {
                    module_name: moduleName,
                    prompt: prompt,
                    response: response
                }
            ]);

        if (error) throw error;
    } catch (err) {
        console.error("Failed to log interaction to Supabase:", err);
    }
};

export interface AIActivity {
    id: number;
    created_at: string;
    module_name: string;
    prompt: string;
}

export const getRecentActivity = async (): Promise<AIActivity[]> => {
    if (!supabaseUrl || !supabaseAnonKey) return [];
    try {
        const { data, error } = await supabase
            .from('ai_logs')
            .select('id, created_at, module_name, prompt')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error("Failed to fetch recent activity:", err);
        return [];
    }
};

export const getUserStats = async () => {
    if (!supabaseUrl || !supabaseAnonKey) return { totalTasks: 0, favoriteTool: 'None', activeDays: 0 };
    try {
        const { data, error } = await supabase
            .from('ai_logs')
            .select('module_name, created_at');

        if (error) throw error;
        if (!data || data.length === 0) return { totalTasks: 0, favoriteTool: 'None', activeDays: 0 };

        const totalTasks = data.length;

        const counts: Record<string, number> = {};
        const days = new Set<string>();

        data.forEach(row => {
            counts[row.module_name] = (counts[row.module_name] || 0) + 1;
            const date = new Date(row.created_at).toDateString();
            days.add(date);
        });

        const activeDays = days.size;
        let favoriteTool = 'None';
        let maxCount = 0;
        for (const [tool, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                favoriteTool = tool;
            }
        }

        // Format the favorite tool name to be readable (e.g. "LectureNotes" -> "Lecture Notes")
        const formattedFavorite = favoriteTool.replace(/([A-Z])/g, ' $1').trim() || 'None';

        return { totalTasks, favoriteTool: formattedFavorite, activeDays };
    } catch (err) {
        console.error("Failed to fetch user stats:", err);
        return { totalTasks: 0, favoriteTool: 'None', activeDays: 0 };
    }
};
