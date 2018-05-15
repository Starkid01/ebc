import { IContactName, IContactField } from '@ionic-native/contacts';

export interface ShareInput {
	messText: string;
	hide: boolean;
	ebcUrl: string;
	disabled: boolean;
	contacts?: IContactField[];
	name?: IContactName;
}

export interface UploadImg {
	img: string;
	opts: UploadOpts;
}

export interface UploadOpts {
	upload_preset: string;
	tags: Array<string>;
}