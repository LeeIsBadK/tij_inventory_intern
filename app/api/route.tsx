import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { supabase } from '../supabase';
import 'dotenv/config';



async function searchByKeywordPaginated(keyword: string, page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit - 1;
    try {
        const { data, error } = await supabase
            .from('inventory')
            .select('*')
            .or(`TIJ_ID.match.${keyword},name.fts.${keyword},category.match.${keyword},model.fts.${keyword}`)
            .range(startIndex, endIndex);

        if (error) {
            return error;
        }
        return data;
    } catch (error) {
        return error;
    }
}

export async function GET(req: NextRequest) {
    const { data, error } = await supabase
        .from('inventory')
        .select('*');
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { TIJ_ID, name, category, model, size, color, sn, status, owner, date_added } = body;
    const infobody = {
        TIJ_ID: TIJ_ID.toString(),
        name: name.toString(),
        category: category.toString(),
        model: model.toString(),
        size: size.toString(),
        color: color.toString(),
        sn: sn.toString(),
        status: status.toString(),
        owner: owner.toString(),
        date_added,
    };
    console.log(infobody);
    const { data, error } = await supabase
        .from('inventory')
        .insert([infobody]);
    if (error) {
        console.error('error', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Item added', status: 200 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { id, ...updateFields } = body;
    const { data, error } = await supabase
        .from('inventory')
        .update(updateFields)
        .eq('id', id);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Item updated', status: 200 });
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const { id } = body;
    const { data, error } = await supabase
        .from('inventory')
        .delete()
        .eq('id', id);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Item deleted', status: 200 });
}
