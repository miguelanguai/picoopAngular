import { User } from '../../user/model/User';
import { Petition } from '../../petition/model/Petition';

export class Image {
  id: number;
  user: User;
  petition: Petition;
  imgTitle: string;
  img_type: string;
  img_description: string;
  img_uploadingDate: Date;
  img_stage: string;
  img_whyDenied: string;
  image: string;
}
