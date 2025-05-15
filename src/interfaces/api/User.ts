
export interface User {
    email: string | null;
    pseudo: string | null;
}

export interface UserDetailsData {
    email: string | null;
    pseudo: string | null;
    nbrGame: number | null;
    nbrReview: number | null;
    profilePictureId: number | null;
    bannerId: number | null;
}