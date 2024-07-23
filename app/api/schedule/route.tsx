'use server'
import { supabase } from '../../supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('schedule_record')
            .select('schedule_name');
        if (error) {
            return NextResponse.error();
        }
        return NextResponse.json(data);
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

// request body example  body:{schedule_name: "3/2567"}
export async function POST(req: NextRequest) {
    const json = await req.json();
    try {
        const { data, error } = await supabase
            .from('schedule_record')
            .insert(json);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({
            message: `Added schedule ${json.schedule_name} successfully`,
            status: 200
        });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const json = await req.json();
    try {
        const { data, error } = await supabase
            .from('schedule_record')
            .delete()
            .eq('schedule_name', json.schedule_name);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({
            message: `Deleted schedule ${json.schedule_name} successfully`,
            status: 200
        });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const json = await req.json();
    try {
        const { data, error } = await supabase
            .from('schedule_record')
            .update({ schedule_name: json.new_schedule_name })
            .eq('schedule_name', json.schedule_name);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({
            message: `Updated schedule to ${json.new_schedule_name} successfully`,
            status: 200
        });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
