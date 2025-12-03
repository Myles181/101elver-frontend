import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using 101Elver ("the Platform"), you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use the Platform. We reserve the right to modify these terms at any time, and your continued use of the Platform constitutes acceptance of those modifications.`
    },
    {
      title: "2. Use of the Platform",
      content: `You agree to use the Platform only for lawful purposes and in accordance with these Terms. You are prohibited from using the Platform:
      
- In any way that violates any applicable national or international law or regulation
- To transmit or procure sending of any advertising or promotional material without our prior written consent
- To impersonate or attempt to impersonate 101Elver, an employee, another user, or any other person or entity
- To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform`
    },
    {
      title: "3. User Accounts",
      content: `When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

We offer three types of accounts:
- Buyer/Renter accounts - for individuals searching for properties
- Agency accounts - for real estate agencies listing properties
- Construction Company accounts - for construction companies listing developments`
    },
    {
      title: "4. Property Listings",
      content: `Agencies and Construction Companies listing properties on the Platform agree to:

- Provide accurate and truthful information about all properties
- Upload only genuine photographs of the properties
- Update listing information promptly when details change
- Respond to inquiries in a timely and professional manner
- Comply with all applicable real estate laws and regulations

101Elver reserves the right to remove any listing that violates these terms or appears fraudulent.`
    },
    {
      title: "5. Communications",
      content: `The Platform facilitates direct communication between buyers/renters and sellers/agents. 101Elver is not responsible for:

- The content of communications between users
- Agreements made between buyers and sellers
- The accuracy of information provided by sellers or agents
- Any disputes arising from transactions

All transactions are conducted directly between users. 101Elver acts only as a platform connecting parties.`
    },
    {
      title: "6. Payment and Fees",
      content: `• Browsing properties is free for all users
- Contacting agents and viewing property details is free
- Agency and Construction Company accounts require a subscription fee
- All fees are clearly stated before purchase
- Subscription fees are non-refundable unless required by law
- We reserve the right to change our pricing structure with 30 days notice`
    },
    {
      title: "7. Intellectual Property",
      content: `The Platform and its entire contents, features, and functionality (including but not limited to information, software, text, displays, images, video, and audio) are owned by 101Elver, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from the Platform without our express written permission.`
    },
    {
      title: "8. Prohibited Activities",
      content: `Users are strictly prohibited from:

- Posting false, misleading, or fraudulent listings
- Scraping or automated data collection from the Platform
- Attempting to gain unauthorized access to the Platform
- Transmitting viruses, malware, or any harmful code
- Harassing, threatening, or defaming other users
- Using the Platform for any illegal activities
- Creating multiple accounts to circumvent restrictions
- Copying or reselling Platform content without permission`
    },
    {
      title: "9. Disclaimer of Warranties",
      content: `THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. 101ELVER MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- The accuracy, reliability, or completeness of property information
- The Platform's availability or error-free operation
- The fitness of properties for any particular purpose
- The legitimacy or credentials of agents or sellers

You use the Platform at your own risk. We recommend conducting independent verification of all property information and agent credentials.`
    },
    {
      title: "10. Limitation of Liability",
      content: `To the fullest extent permitted by law, 101Elver shall not be liable for:

- Any direct, indirect, incidental, consequential, or punitive damages
- Loss of profits, revenue, data, or use
- Property purchase disputes or transaction failures
- Agent or seller misconduct or fraud
- Any damages arising from your use of the Platform

Your sole remedy for dissatisfaction with the Platform is to stop using it.`
    },
    {
      title: "11. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless 101Elver and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:

- Your use of the Platform
- Your violation of these Terms
- Your violation of any rights of another party
- Any content you post on the Platform`
    },
    {
      title: "12. Termination",
      content: `We reserve the right to terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason, including:

- Breach of these Terms
- Fraudulent activity or misrepresentation
- Abusive behavior toward other users
- Non-payment of subscription fees (for paid accounts)
- At our sole discretion for any other reason

Upon termination, your right to use the Platform will immediately cease.`
    },
    {
      title: "13. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of North Cyprus, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in North Cyprus.`
    },
    {
      title: "14. Changes to Terms",
      content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use the Platform after revisions become effective, you agree to be bound by the revised terms.`
    },
    {
      title: "15. Contact Information",
      content: `If you have any questions about these Terms, please contact us at:

Email: legal@101elver.com
Phone: +90 533 123 4567
Address: 123 Kyrenia Avenue, Girne, North Cyprus, 99300

Last Updated: October 24, 2025`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using 101Elver
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-12">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8 text-lg">
                These Terms and Conditions ("Terms") govern your access to and use of the 101Elver platform. 
                By using our services, you agree to comply with and be bound by these Terms.
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              ))}

              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
                <p className="text-gray-700">
                  <strong>Important:</strong> By using 101Elver, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and Conditions. If you do not agree to these terms, 
                  please do not use our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
