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
      <h1 className="text-[40px] min-[825px]:text-[55px] mt-[50px] min-[825px]:mt-[70px] text-center min-[825px]:text-left min-[825px]:ml-[calc(6vw+20px)] opacity-80">
        Build
      </h1>

      <div
        className="flex flex-col px-[20px] min-[825px]:px-[calc(6vw+10px)] py-[10px]"
        id="find-the-build"
        style={isSubmitted ? { pointerEvents: "none" } : undefined}
      >
        <textarea
          id="find-the-build-textarea"
          name="problem"
          className="resize-none p-[20px] grow rounded-[15px] h-[100px] focus:outline-none border border-[rgba(0,77,0,0.233)] bg-white text-black"
          placeholder="Share the thoughts or requirement if you have any...."
          value={formData.problem}
          onChange={handleChange}
          disabled={isSubmitted}
        ></textarea>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 min-[825px]:grid-cols-2 mt-[10px] gap-[10px] mb-[10px]">
            <input
              autoComplete="off"
              type="text"
              placeholder="Full name"
              id="person-name"
              name="personName"
              className="py-[10px] px-[20px] rounded-[10px] border border-[rgba(0,77,0,0.233)] focus:outline-none bg-white text-black"
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
              className="py-[10px] px-[20px] rounded-[10px] border border-[rgba(0,77,0,0.233)] focus:outline-none bg-white text-black"
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
              className="py-[10px] px-[20px] rounded-[10px] border border-[rgba(0,77,0,0.233)] focus:outline-none bg-white text-black"
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
              className="py-[10px] px-[20px] rounded-[10px] border border-[rgba(0,77,0,0.233)] focus:outline-none bg-white text-black"
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
              className="py-[10px] px-[20px] rounded-[10px] border border-[rgba(0,77,0,0.233)] focus:outline-none bg-white text-black"
              value={formData.contactNumber}
              onChange={handleChange}
              disabled={isSubmitted}
              required
            />
            <button
              id="collect-data-button"
              type="submit"
              className="grow select-none text-[18px] font-semibold rounded-[10px] py-[7px] px-[60px] border border-[rgb(0,77,0)] bg-[rgb(0,77,0)] text-white active:bg-[rgb(0,40,0)] transition-opacity"
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
