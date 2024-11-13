export interface Ievent {
    eventNo?: number;
    makerBizNo?: string;
    storeNo?: number;
    makerName?: string;
    storeName?: string;
    eventName?: string;
    eventStart?: Date;
    eventEnd?: Date;
    eventStatus?: string;
    spaceRentStatus?: boolean;

    delFlag?: boolean;
    regDate?: Date;
    modDate?: Date;
    creator?: string;
}

