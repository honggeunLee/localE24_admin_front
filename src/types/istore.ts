export interface Istore {
    storeNo: number;
    managerName: string;
    storeName : string;
    storeContact : string;
    storeLatitude : string;
    storeLongitude : string;
    isRentAvailable : boolean;

    delFlag?: boolean;
    regDate?: Date;
    modDate?: Date;
    creator?: string;
}