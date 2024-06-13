import mixpanel from 'mixpanel-browser'

mixpanel.init(process.env.NEXT_PUBLIC_MIX_PANEL_KEY, { ignore_dnt: true, debug: (process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev') })

export { mixpanel }