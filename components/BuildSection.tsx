"use client";

import React, { useState } from "react";

export default function BuildSection() {
  const [formData, setFormData] = useState({
    personName: "",
    companyName: "",
    companyWebsite: "",
    contactMail: "",
    contactNumber: "",
    problem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { companyName, companyWebsite, contactMail, contactNumber } = formData;

    if (!companyName || !companyWebsite || !contactMail || !contactNumber) {
      setErrorMessage("Please fill in all required fields (Company, Website, Email, and Phone).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit-build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          personName: "",
          companyName: "",
          companyWebsite: "",
          contactMail: "",
          contactNumber: "",
          problem: "",
        });
      } else {
        setErrorMessage("Submission failed. Please check your information and try again.");
      }
    } catch {
      setErrorMessage("Error submitting. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="the-subheadings">Build</h1>

      <div
        className="find-the-build"
        id="find-the-build"
        style={isSubmitted ? { pointerEvents: "none" } : undefined}
      >
        <textarea
          id="find-the-build-textarea"
          name="problem"
          placeholder="Share the thoughts or requirement if you have any...."
          value={formData.problem}
          onChange={handleChange}
          disabled={isSubmitted}
        ></textarea>

        <form onSubmit={handleSubmit}>
          <div className="find-build-collect-data">
            <input
              autoComplete="off"
              type="text"
              placeholder="Full name"
              id="person-name"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              disabled={isSubmitted}
            />
            <input
              autoComplete="off"
              type="text"
              placeholder="Organisation name"
              id="company-name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
            <input
              autoComplete="off"
              type="text"
              placeholder="Website"
              id="company-website"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
            <input
              autoComplete="off"
              type="email"
              placeholder="Business email"
              id="contact-mail"
              name="contactMail"
              value={formData.contactMail}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
            <input
              autoComplete="off"
              type="tel"
              placeholder="Contact number"
              id="contact-number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
            <button
              id="collect-data-button"
              type="submit"
              disabled={isSubmitting || isSubmitted}
              style={{
                opacity: isSubmitted ? 0.5 : 1,
                cursor: isSubmitted ? "default" : "pointer",
              }}
            >
              {isSubmitted ? "Done" : isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {errorMessage && (
            <p style={{ color: "#d9534f", margin: "5px 0", fontSize: "14px" }}>
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
