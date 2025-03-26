import { createClient } from "@supabase/supabase-js";

const supaBase = createClient(
    process.env.EXPO_PUBLIC_API_HOST,
    process.env.EXPO_PUBLIC_API_KEY
);


export default supaBase;
