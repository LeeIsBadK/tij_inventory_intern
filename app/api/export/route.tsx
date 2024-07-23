'use server'

import { NextResponse } from 'next/server';
import { supabase } from "../../supabase";

export async function GET(req: Request, { params }: { params: { slug: string } }){
    const url = new URL(req.url)
    const schedule = url.searchParams.get('schedule')
    try {
        const { data, error } = await supabase
            .from('maintenance_record')
            .select('inventory(TIJ_ID, name, model), created_at, status, note, ref')
            .eq('schedule', schedule)
            .order('created_at', { ascending: false })

        if (error) {
            console.log('error', error)
            return NextResponse.error();  // Ensure you return a Response here
        }
        if (data) {
            const headers = ["TIJ_ID", "name", "model","created_at", "status", "note", "ref"];

            // Convert JSON data to CSV rows
            const csvRows = data.map((item: { [key: string]: any }) => {
                return [
                    item["inventory"]["TIJ_ID"],
                    item["inventory"]["name"],
                    item["inventory"]["model"],
                    item["created_at"],
                    item.status ?? "", // Handle potential missing "status"
                    item.note ?? "", // Handle potential missing "note"
                    item.ref ?? "", // Handle potential missing "ref"
                ];
            });

            // Convert CSV rows to CSV string
            const csvString = [headers].concat(csvRows).map(row => row.join(',')).join('\n');
        
            // Assuming you need to directly manipulate the response for sending CSV data
            const response = new Response(csvString, {
                status: 200,
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename=${schedule}.csv`,
                },
            });
            return response;
        } else {
            return new Response('No data found', { status: 404 });
        }
    }
    catch (error) {
        console.log('error', error)
        return new Response('Internal Server Error', { status: 500 });  // Ensure you return a Response here
    }
}
