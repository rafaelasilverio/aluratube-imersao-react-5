import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://yylbyulqaaojeydnguis.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bGJ5dWxxYWFvamV5ZG5ndWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzc5OTksImV4cCI6MTk4Mzc1Mzk5OX0.lXlGGE0x_ddUF5LIun8D6vOLAy1tNrTzO1qYmvHIlnU";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
           return supabase.from("videos")
                .select("*");
        }
    }
}