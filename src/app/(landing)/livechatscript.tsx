import { useEffect } from "react";

// Extending the Window interface to add LiveChat properties
declare global {
  interface Window {
    __lc: any;
    LiveChatWidget: any;
  }
}

const LiveChatScript = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__lc = window.__lc || {};
      window.__lc.license = 18553233;
      window.__lc.integration_name = "manual_channels";
      window.__lc.product_name = "livechat";

      (function (window, document) {
        type WidgetType = {
          _h: Function | null;
          _q: any[];
          _v: string;
          on: Function;
          once: Function;
          off: Function;
          get: Function;
          call: Function;
          init: Function;
        };

        function handleEvent(args: any) {
          return widget._h ? widget._h.apply(null, args) : widget._q.push(args);
        }

        const widget: WidgetType = {
          _q: [],
          _h: null,
          _v: "2.0",
          on: function () {
            handleEvent(["on", [].slice.call(arguments)]);
          },
          once: function () {
            handleEvent(["once", [].slice.call(arguments)]);
          },
          off: function () {
            handleEvent(["off", [].slice.call(arguments)]);
          },
          get: function () {
            if (!widget._h)
              throw new Error(
                "[LiveChatWidget] You can't use getters before load."
              );
            handleEvent(["get", [].slice.call(arguments)]);
          },
          call: function () {
            handleEvent(["call", [].slice.call(arguments)]);
          },
          init: function () {
            const script = document.createElement("script");
            script.async = true;
            script.type = "text/javascript";
            script.src = "https://cdn.livechatinc.com/tracking.js";
            document.head.appendChild(script);
          },
        };

        if (!window.__lc.asyncInit) widget.init();
        window.LiveChatWidget = window.LiveChatWidget || widget;
      })(window, document);
    }
  }, []);

  return (
    <>
      <noscript>
        <a href="https://www.livechat.com/chat-with/18553233/" rel="nofollow">
          Chat with us
        </a>
        , powered by{" "}
        <a
          href="https://www.livechat.com/?welcome"
          rel="noopener nofollow"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>
    </>
  );
};

export default LiveChatScript;
