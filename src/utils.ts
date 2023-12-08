export const isEnvironmentVarTrueish = (name: string) : boolean => {
    const v = process.env[name];
    if (!v) return false;
    return v === "1" || v.toLowerCase().startsWith("t");
}

export const buildHandlebarContext = (ctx: object) : object => {
    const baseCtx = {
        websdkUrl: process.env.WEBSDK_URL,
        isLocalSiteMap: isEnvironmentVarTrueish("LOCAL_SITEMAP")
    }
    return Object.assign(baseCtx, ctx); 
}