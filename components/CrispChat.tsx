'use client'

import { useEffect } from "react";

export default function CrispChat() {
    useEffect(() => {
        // @ts-ignore
        window.$crisp = [];
        // @ts-ignore
        window.CRISP_WEBSITE_ID = "dd1cb3a6-a234-4561-82ab-3007d4de1683";

        (function () {
            const d = document;
            const s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
    }, []);

    return null;
}
