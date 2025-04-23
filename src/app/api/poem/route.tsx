import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
// import prisma from "@prisma/client";

export async function POST(req: NextRequest) {
    console.log('Received request to create a new poem...');
    try {
        const { title, verses, tags, authorId } = await req.json();
        console.log('Received data:', { title, verses, tags, authorId });

        if (!title || !Array.isArray(verses) || !verses.length  ) {
            return NextResponse.json({ error: 'Please provide a title, verses, tags, and authorId' }, { status: 400 });
        }

        const newPoem = await prisma.poem.create({
            data: {
                title,
                tags,
                authorId,
                verses: {
                    create: verses.map((verse: any, index: number) => ({
                        sadr: verse.sadr,
                        ajz: verse.ajz,
                        order: index + 1
                    }))
                }
            },
            include: {
                verses: true,
                author: true
            }
        });

        return NextResponse.json(newPoem, { status: 201 });
    } catch (error:any) {
        console.error('Error creating poem:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {

    console.log('Fetching all poems...');
    try {
        const poems = await prisma.poem.findMany({
            include: {
                verses: {
                    orderBy: {
                        order: 'asc'
                    }
                },
                author: true
            }
        });
        console.log('Fetched poems:', poems[0]);
        return NextResponse.json(poems);
    } catch (error) {
        console.error('Error getting poems:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function getPoembyID(id: string ){
    try {
        const poem = await prisma.poem.findUnique({
            where: {
                id: id,
            },
        });
        if (poem) {
            return NextResponse.json(poem, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error getting poem by ID:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function deletePoem(id:string){
    try{
         await prisma.poem.delete({
            where:{
                id:id
            }
        })
    }
    catch(error){
        console.error('error deleting poem', error)
        NextResponse.json({error:"Internal Server Errror" , status:500})
    }
}