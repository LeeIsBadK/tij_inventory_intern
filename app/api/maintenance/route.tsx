'use server';

import { supabase } from "../../supabase";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('maintenance_record')
            .select('id,schedule,inventory_id(id,TIJ_ID,name,model),status,note,ref,created_at');

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

export async function POST(req: NextRequest) {
    try {
        const json = await req.json();
        
        const { data, error } = await supabase
            .from('maintenance_record')
            .insert(json);

        if (error) {
            console.log('error', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: `Added maintenance item successfully` }, { status: 200 });
    } catch (error) {
        console.log('error', error as string);
        const err = error as Error;
        return NextResponse.json({ error: err.message}, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const json = await req.json();
        console.log(json);

        const { data, error } = await supabase
            .from('maintenance_record')
            .update(json)
            .eq('id', json.id);

        if (error) {
            console.log('error', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: `Updated maintenance item successfully` }, { status: 200 });
    } catch (error) {
        console.log('error', error);
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const json = await req.json();
        console.log(json);

        const { data, error } = await supabase
            .from('maintenance_record')
            .delete()
            .eq('id', json.id);

        if (error) {
            console.log('error', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: `Deleted maintenance info successfully` }, { status: 200 });
    } catch (error) {
        console.log('error', error);
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
