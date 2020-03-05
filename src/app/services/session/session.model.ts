export class Session {
    constructor(
        readonly token: string
    ) {
        // No-op.
    }
}

export interface LoginResponseDto {
    readonly status: string
    readonly acsTok: string
}
