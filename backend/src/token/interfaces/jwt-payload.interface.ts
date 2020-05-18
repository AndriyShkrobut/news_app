export interface JwtAccessPayload {
    readonly username: string;
    readonly id: string;
}

export interface JwtRefreshPayload {
    readonly userAgent: string;
    readonly id: string;
}
