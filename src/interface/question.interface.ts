export type IType = 'SST' | 'RO' | 'RMMCQ';

export interface IAllQuestion {
	type: IType;
	page: number;
	pageSize: number;
}
