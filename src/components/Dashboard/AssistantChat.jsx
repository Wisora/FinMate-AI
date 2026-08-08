// Assistant chat widget: rule-based intent matching (assistantService), with
// simulated async (spinner while "thinking") and localized replies.

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { useSettings } from "../../contexts/SettingsContext";
import { formatCurrency, getMonths } from "../../i18n/translations";
import { getReply } from "../../services/assistantService";
import { Spinner } from "../common/Spinner";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function AssistantChat({ goals, history }) {
  const { t, lang, locale } = useLanguage();
  const { settings } = useSettings();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  // Greeting once (re-localized whenever the language changes).
  useEffect(() => {
    setMessages([
      { role: "assistant", text: t("dashboard.assistantGreeting") },
    ]);
  }, [lang, t]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const send = async (raw) => {
    const question = (raw ?? input).trim();
    if (!question || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setTyping(true);
    await delay(650 + Math.random() * 450);
    const reply = getReply(question, {
      goals,
      history,
      t,
      lang,
      locale,
      currency: settings.currency,
    });
    const params = {};
    for (const [k, v] of Object.entries(reply.params || {})) {
      params[k] =
        typeof v === "number"
          ? formatCurrency(v, settings.currency, locale)
          : v;
    }
    const text = t(reply.key, params);
    setMessages((prev) => [...prev, { role: "assistant", text }]);
    setTyping(false);
  };

  const suggestions = [
    t("assistant.suggestion1"),
    t("assistant.suggestion2", {
      month: getMonths(lang)[Math.max(0, new Date().getMonth() - 1)],
    }),
    t("assistant.suggestion3"),
    t("assistant.suggestion4"),
  ].filter(Boolean);

  return (
    <section
      className="card chat-card"
      aria-label={t("dashboard.assistantTitle")}
    >
      <header className="card-head chat-head">
        <h2 className="card-title">
          {t("dashboard.assistantTitle")}{" "}
          <span className="chat-live-dot" aria-hidden="true" />
        </h2>
      </header>

      <div className="chat-messages" ref={listRef} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg chat-${m.role}`}>
            <div className="chat-bubble">{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="chat-msg chat-assistant">
            <div className="chat-bubble chat-typing">
              <Spinner label={t("common.loading")} size={14} />
              <span>{t("dashboard.assistantTyping")}</span>
            </div>
          </div>
        )}
      </div>

      <div
        className="chat-suggestions"
        role="group"
        aria-label={t("assistant.suggestionsLabel")}
      >
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className="chip"
            onClick={() => send(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <label className="sr-only" htmlFor="chat-input">
          {t("dashboard.assistantPlaceholder")}
        </label>
        <input
          id="chat-input"
          className="input"
          type="text"
          autoComplete="off"
          placeholder={t("dashboard.assistantPlaceholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!input.trim() || typing}
        >
          {t("dashboard.assistantSend")}
        </button>
      </form>
    </section>
  );
}
