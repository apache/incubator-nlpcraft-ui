export interface NlpAllProbesResponse {
    readonly probes: NlpProbe[]
}

export interface NlpProbe {
    readonly probeToken: string
    readonly probeId: string
    readonly probeGuid: string
    readonly probeApiVersion: string
    readonly probeApiDate: string
    readonly osVersion: string
    readonly osName: string
    readonly osArch: string
    readonly startTstamp: number
    readonly tmzId: string
    readonly tmzAbbr: string
    readonly tmzName: string
    readonly userName: string
    readonly javaVersion: string
    readonly javaVendor: string
    readonly hostName: string
    readonly hostAddr: string
    readonly macAddr: string
    readonly models: NlpModel[]
}

export interface NlpModel {
    readonly id: string
    readonly name: string
    readonly version: string
    readonly enabledTokens: string[]
}

export interface NlpAskResponse {
    readonly status: string
    readonly srvReqId: string
}

export interface NlpCheckResponse {
    readonly status: string
    readonly states: NlpQueryState[]
}

export interface NlpQueryState {
    readonly srvReqId: string
    readonly txt: string
    readonly userId: number
    readonly mdlId: string
    readonly status: string
    readonly error: string
    readonly errorCode: number
    readonly createTstamp: number
    readonly updateTstamp: number
    readonly probeId: string
    readonly resType: string
    readonly resBody: any
    readonly logHolder: NlpLogHolder
}

export interface NlpLogHolder {
    readonly queryContext: NlpQueryContext
    readonly intents: NlpIntent[]
}

export interface NlpIntent {
    readonly id: string
    readonly exactMatch: boolean
    readonly tokensGroups: Map<string, NlpIntentTokenGroup[]>
}

export interface NlpIntentTokenGroup {
    readonly token: NlpIntentToken
    readonly used: boolean
    readonly conversation: boolean
}

export interface NlpIntentToken {
    readonly id: string,
    readonly groups: string[]
    readonly metadata: Map<string, any>
}

export interface NlpQueryContext {
    readonly variants: NlpVariant[][]
}

export interface NlpVariant {
    readonly id: string
    readonly groups: string[]
    readonly metadata: Map<string, any>
}
