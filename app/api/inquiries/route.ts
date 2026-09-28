import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, project_type, location, estimated_budget, message } = body;

    if (!full_name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .insert([
        {
          full_name,
          email,
          phone: phone || null,
          project_type: project_type || 'Residential Interiors',
          location: location || null,
          estimated_budget: estimated_budget || null,
          message,
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.error('Supabase admin insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error('API route error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
