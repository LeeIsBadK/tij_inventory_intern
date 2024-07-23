import { NextResponse } from 'next/server';
import { supabase } from '../../../supabase';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { data, error } = await supabase
            .from('maintenance_record')
            .select('created_at,status,note,ref,inventory_id(id,TIJ_ID,name,model),schedule')
            .eq('id', params.slug)
            .single();

        if (error) {
            console.log('error', error);
            return NextResponse.error();
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log('error', error);
        return NextResponse.error();
    }
}
