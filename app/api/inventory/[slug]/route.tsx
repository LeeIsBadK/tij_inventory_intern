'use server'

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { supabase } from "../../../supabase";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const url = new URL(req.url);
    const schedule = url.searchParams.get('schedule');

    try {
        let { data, error } = await supabase
            .from('inventory')
            .select('*, maintenance_record(*)')
            .eq('id', params.slug)
            .single();

        if (error) {
            console.log('error', error);
            return NextResponse.error();
        }

        if (data && schedule) {
            data.maintenance_record = data.maintenance_record.filter((record: { schedule: string }) => record.schedule === schedule);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log('error', error);
        return NextResponse.error();
    }
}
