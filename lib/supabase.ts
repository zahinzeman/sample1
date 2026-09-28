import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xbndqvzkvzyqvofjjpvg.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_45ISjvn1J6tsfeu5BaUTtw_C7VZzSQZ';

export interface ProjectInquiry {
  id?: string;
  created_at?: string;
  full_name: string;
  email: string;
  phone?: string;
  project_type: string;
  location?: string;
  estimated_budget?: string;
  message: string;
  status?: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
}

export interface NewsletterSubscriber {
  id?: string;
  created_at?: string;
  email: string;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  },
});

/**
 * Submit a project inquiry to Supabase
 */
export async function submitProjectInquiry(inquiry: ProjectInquiry) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([
      {
        full_name: inquiry.full_name,
        email: inquiry.email,
        phone: inquiry.phone || null,
        project_type: inquiry.project_type,
        location: inquiry.location || null,
        estimated_budget: inquiry.estimated_budget || null,
        message: inquiry.message,
        status: 'new',
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting inquiry to Supabase:', error);
    throw error;
  }

  return data;
}

/**
 * Subscribe email to studio newsletter
 */
export async function subscribeToNewsletter(email: string) {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    .select();

  if (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }

  return data;
}
