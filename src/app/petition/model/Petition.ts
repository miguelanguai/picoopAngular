import { User } from '../../user/model/User'

export class Petition {
    petitionId: number;
    petitionTitle: string;
    petitionDescription: string;
    petitionDate: Date;
    user: User;
}
