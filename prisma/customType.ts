import {Poem , User , Verse} from '@prisma/client'
export interface PoemFullType extends Poem {
    verses: Verse[];
    author: User;
}