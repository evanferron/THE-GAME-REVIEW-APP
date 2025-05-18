import { UUID } from "crypto";

export interface ReviewData {
    id: UUID;
    gameId: bigint;
    userId: string;
    owner_pseudo: string;
    owner_picture: number;
    rating: number;
    review: string | null;
    likes: number;
    createdAt: string;
    updatedAt: string;
}