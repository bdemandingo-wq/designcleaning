import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Floating chatbot widget. Renders a placeholder chat bubble until an admin
 * configures a real provider (tidio / intercom / custom script) from /admin.
 *
 * Provider behavior:
 *   - "none" (default): shows a friendly placeholder panel.
 *   - "tidio":   loads https://code.tidio.co/<key>.js
 *   - "intercom": loads the Intercom snippet for app_id = key
 *   - "custom":  injects raw <script> markup stored in chatbot_key
 */
const ChatbotWidget = () => {
  const [provider, setProvider] = useState<string>("none");
  const [chatKey, setChatKey] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_content")
        .select("key,value")
        .in("key", ["chatbot_provider", "chatbot_key"]);
      if (data) {
        for (const row of data) {
          if (row.key === "chatbot_provider") setProvider(row.value || "none");
          if (row.key === "chatbot_key") setChatKey(row.value || "");
        }
      }
      setLoaded(true);
    })();
  }, []);

  // Inject third-party script when provider is configured
  useEffect(() => {
    if (!loaded || !chatKey || provider === "none") return;

    const scriptId = "lovable-chatbot-script";
    if (document.getElementById(scriptId)) return;

    if (provider === "tidio") {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = `//code.tidio.co/${chatKey}.js`;
      s.async = true;
      document.body.appendChild(s);
    } else if (provider === "intercom") {
      (window as any).intercomSettings = { app_id: chatKey };
      const s = document.createElement("script");
      s.id = scriptId;
      s.async = true;
      s.innerHTML = `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${chatKey}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`;
      document.body.appendChild(s);
    } else if (provider === "custom") {
      // chatKey contains raw script tag(s) — inject as-is
      const wrapper = document.createElement("div");
      wrapper.id = scriptId;
      wrapper.innerHTML = chatKey;
      // Re-create scripts so browsers execute them
      wrapper.querySelectorAll("script").forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((a) => newScript.setAttribute(a.name, a.value));
        newScript.text = oldScript.text;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
      document.body.appendChild(wrapper);
    }
  }, [loaded, provider, chatKey]);

  // If a real provider is loaded, hide our placeholder UI (the script renders its own)
  if (!loaded) return null;
  if (provider !== "none" && chatKey) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-72 rounded-2xl bg-card shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Design Cleaning</p>
              <p className="text-xs text-primary-foreground/80">Typically replies in 15 minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-foreground">
              Hi! 👋 Have questions about cleaning services, pricing, or scheduling? Reach out and we'll get right back to you.
            </p>
            <div className="grid gap-2">
              <a
                href="tel:+12029359934"
                className="text-sm font-medium text-primary hover:underline"
              >
                📞 Call (202) 935-9934
              </a>
              <a
                href="sms:+12029359934"
                className="text-sm font-medium text-primary hover:underline"
              >
                💬 Text us
              </a>
              <a
                href="mailto:DesignCleaning@proton.me"
                className="text-sm font-medium text-primary hover:underline"
              >
                ✉️ Email us
              </a>
            </div>
          </div>
        </div>
      )}
      <Button
        onClick={() => setOpen((o) => !o)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default ChatbotWidget;
