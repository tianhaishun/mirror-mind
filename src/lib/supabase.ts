import { createClient } from '@supabase/supabase-js';

// 为了确保在 Vercel 等平台部署时无需繁琐的环境变量配置也能直接运行，
// 这里提供了默认的 fallback 值。
// 注意：Supabase Anon Key 是设计为可在客户端公开的安全密钥。
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kflxysecqsoqbczledxz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbHh5c2VjcXNvcWJjemxlZHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4Njk2NTAsImV4cCI6MjA4MzQ0NTY1MH0.woucFV_xGuU3CHZZbE2iYbbkTomxeR8eluT2PzY5hzk';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
