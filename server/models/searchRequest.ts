
export default interface SearchRequest {
    keywords: string;
    take: number;
    offset: number;
    latitude: number;
    longitude: number;
    radius: number;
    firstDateFilter: Date;
    lastDateFilter: Date;
    salaryMin: number;
    orderBy: OrderBy;
}

export enum OrderBy {
    Relevance = "relevance",
    Distance = "distance",
}
