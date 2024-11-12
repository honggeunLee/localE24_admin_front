
export interface IMaker {
    makerBizNo: string;
    makerName?: string;
    makerEmail?: string;
    makerPhone?: string;
    makerPostnum?: string;
    makerAddr?: string;
    makerAddrDetail?: string;

    makerStatus?: number;

    attachFileNames?: string[];

    delFlag?: boolean;
    regDate?: Date;
    modDate?: Date;

    creator?: string;
}