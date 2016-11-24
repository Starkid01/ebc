export interface BackandHeader {
	header_name: string;
	header_value: string;
}

export interface BackandUrls {
	 signup: string;
	 token: string;
	 requestResetPassword: string;
	 resetPassword: string;
	 changePassword: string;
	 socialLoginWithCode: string;
	 socialSignupWithCode: string;
	 socialLoginWithToken: string;
}

export interface BackandUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	pic: string;
	since: Date;
	subscribed: boolean;
	items?: any;
	user?: any;
}

export interface BackandItem {
	id: number;
	name: string;
	desc: string;
	media: string;
	pic: string;
	flyer: boolean;
	ready: boolean;
	disable: boolean;
	data?: string;
	item?: any;
	user?: any;
}

export interface BackandSvg {
	id: number;
	path: string;
	disable: boolean;
	itemID: number;
}