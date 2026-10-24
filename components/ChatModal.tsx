"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "assist";
  content: string;
  isForm?: boolean;
  formSubmitted?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  initialPrompt?: string;
  onClose: () => void;
}

export default function ChatModal({
  isOpen,
  initialPrompt = "",
  onClose,
}: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Form states for in-chat appointment booking
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "18:30",
  });
  const [formError, setFormError] = useState("");

  const chatContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, scrollToBottom]);

  // Set up date constraints for the booking form
  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();

    const isAfterHours = now.getHours() >= 17 || now.getHours() < 5;
    const startDay = isAfterHours ? day + 1 : day;
    const endDay = isAfterHours ? day + 5 : day + 4;

    const todayStr = `${year}-${month}-${startDay.toString().padStart(2, "0")}`;
    const maxStr = `${year}-${month}-${endDay.toString().padStart(2, "0")}`;

    const currentHour = now.getHours();
    const defaultTime =
      currentHour >= 9 && currentHour < 19
        ? `${currentHour.toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}`
        : "18:30";

    setFormData((prev) => ({
      ...prev,
      date: todayStr,
      time: defaultTime,
    }));
  }, []);

  const sendMessage = useCallback(
    async (textToSend: string) => {
      if (!textToSend.trim()) return;

      const userMsgId = Date.now().toString();
      const newMessages: ChatMessage[] = [
        ...messages,
        { id: userMsgId, role: "user", content: textToSend },
      ];
      setMessages(newMessages);
      setInputValue("");
      setIsThinking(true);

      const updatedHistory = [
        ...history,
        {
          role: "user",
          parts: [{ text: textToSend }],
        },
      ];
      setHistory(updatedHistory);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "main",
            message: textToSend,
            history: updatedHistory,
          }),
        });

        const data = await res.json();
        const responseText = data.text || "I am here to help!";

        const hasForm = responseText.includes('id="chat-submit-form"');
        const cleanContent = responseText.replace(
          /<div id="chat-submit-form">[\s\S]*?<\/div>/gi,
          ""
        );

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assist",
            content: cleanContent || (hasForm ? "<p>Sure! Please fill out the form below to book an appointment with our team.</p>" : responseText),
            isForm: hasForm,
          },
        ]);

        setHistory((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: responseText }],
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assist",
            content: "Sorry! Something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsThinking(false);
      }
    },
    [messages, history]
  );

  // Send initial prompt if opened with one
  useEffect(() => {
    if (isOpen && initialPrompt) {
      sendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (window.innerWidth >= 600) {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const handleBookingSubmit = (e: React.FormEvent, msgId: string) => {
    e.preventDefault();
    const phoneRegex = /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.date &&
      formData.time &&
      formData.phone.trim().length >= 10 &&
      formData.phone.trim().length <= 13 &&
      phoneRegex.test(formData.phone.trim())
    ) {
      setFormError("");
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, formSubmitted: true } : m))
      );
      sendMessage("I succesfully booked my appoiment.");
    } else if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      setFormError("Please enter a valid phone number (10 digits).");
    } else {
      setFormError("Please fill all the fields correctly.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed-screen"
        id="fixed-screen"
        onClick={onClose}
        style={{ display: "block" }}
        role="presentation"
      ></div>

      <div
        className="chat-field"
        id="chat-field"
        style={{ display: "flex" }}
        role="dialog"
        aria-modal="true"
        aria-label="Orgetise AI Chat"
      >
        <div className="chat-field-header">
          <div className="header-icon" aria-hidden="true"></div>
          <h3>Orgetise AI</h3>
          <i
            id="chat-field-close"
            className="bi bi-x"
            onClick={onClose}
            role="button"
            aria-label="Close chat"
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <div className="chat-content" id="chat-content" ref={chatContentRef}>
          {messages.length === 0 && (
            <div className="chat-assist">
              <p>Hi there! How can I assist you with our AI services today?</p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.role === "user" ? "chat-user" : "chat-assist"}
            >
              <div dangerouslySetInnerHTML={{ __html: msg.content }} />

              {msg.isForm && (
                <form
                  id="chat-submit-form"
                  onSubmit={(e) => handleBookingSubmit(e, msg.id)}
                  style={{
                    opacity: msg.formSubmitted ? 0.5 : 1,
                    pointerEvents: msg.formSubmitted ? "none" : "auto",
                  }}
                >
                  <input
                    autoComplete="off"
                    type="text"
                    id="chat-submit-name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={msg.formSubmitted}
                    required
                  />
                  <input
                    autoComplete="off"
                    type="tel"
                    id="chat-submit-phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={msg.formSubmitted}
                    required
                  />
                  <input
                    type="date"
                    id="chat-submit-date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    disabled={msg.formSubmitted}
                    required
                  />
                  <input
                    type="time"
                    id="chat-submit-time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    disabled={msg.formSubmitted}
                    required
                  />
                  <input
                    autoComplete="off"
                    type="submit"
                    id="chat-submit-button"
                    value={msg.formSubmitted ? "Booked" : "Submit"}
                    disabled={msg.formSubmitted}
                  />
                  {formError && !msg.formSubmitted && (
                    <p style={{ color: "#d9534f", fontSize: "12px", margin: "4px 0" }}>
                      {formError}
                    </p>
                  )}
                </form>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="chat-assist" style={{ opacity: 0.6 }}>
              Thinking...
            </div>
          )}
        </div>

        <div className="chat-field-input">
          <textarea
            ref={inputRef}
            placeholder="Message Orgetise"
            autoComplete="off"
            id="chat-input"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 190)}px`;
            }}
            onFocus={scrollToBottom}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(inputValue);
              }
            }}
          ></textarea>
          <div
            className="chat-field-input-send"
            onClick={() => sendMessage(inputValue)}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Send message"
          >
            <i className="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>
    </>
  );
}
