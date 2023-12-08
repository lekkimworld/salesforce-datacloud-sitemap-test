const initSitemap = async () => {
    console.log("before SalesforceInteractions.init");
    await SalesforceInteractions.init({
        consents: [
            {
                provider: "My Provider",
                purpose: "Tracking",
                status: SalesforceInteractions.ConsentStatus.OptIn,
            },
        ],
    });
    console.log("after SalesforceInteractions.init");

    // set debugging
    SalesforceInteractions.log.level = "debug";

    // initialize the sitemap
    console.log("before SalesforceInteractions.initSitemap");
    SalesforceInteractions.initSitemap({
        global: {
            listeners: [
                SalesforceInteractions.listener("click", "body", (ev) => {
                    console.log("global - body-tag click listener", ev);
                }),
            ],
        },

        // default page type if a specific page type doesn't match. The interaction 
        // key is not listed in the documentation but works just fine
        pageTypeDefault: {
            name: "defaultPage",
            locale: "da_DK",
            interaction: {
                name: "Default Page",
            },
            listeners: [
                SalesforceInteractions.listener("click", "h1", (ev) => {
                    console.log("defaultPage - h1-tag click listener", ev);
                    ev.preventDefault();
                    ev.stopPropagation();
                }),
            ],
            onActionEvent: (ev) => {
                console.log("defaultPage - onActionEvent", ev);
                return ev;
            },
        },
        pageTypes: [
            {
                name: "Foo",
                isMatch: () => {
                    return /\/foo.html/.test(window.location.href);
                },
                listeners: [
                    SalesforceInteractions.listener("click", ".btn", (ev) => {
                        const emailAddress = window && window._userInfo && window._userInfo.email;
                        console.log(`emailAddress ${emailAddress}`);
                        if (emailAddress) {
                            SalesforceInteractions.sendEvent({
                                interaction: {
                                    name: "Email Sign Up",
                                },
                                user: {
                                    attributes: {
                                        email: emailAddress,
                                        eventType: "contactPointEmail",
                                    },
                                },
                            });
                            console.log("send event");
                        }
                    }),
                ],
                onActionEvent: (actionEvent) => {
                    const email = window && window._userInfo && window._userInfo.email;
                    if (email) {
                        actionEvent.user = actionEvent.user || {};
                        actionEvent.user.attributes = actionEvent.user.attributes || {};
                        actionEvent.user.attributes.emailAddress = email;
                    }
                    return actionEvent;
                },
            },
        ],
    });
    console.log("after SalesforceInteractions.initSitemap");
};
initSitemap();
