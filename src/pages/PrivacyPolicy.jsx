import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect several types of information from and about users of our Platform:

**Personal Information:**
- Name, email address, and phone number when you create an account
- Company information for agency and construction company accounts
- Profile pictures and biographical information (optional)
- Communication preferences and language settings

**Property Search Information:**
- Search queries and filters you use
- Properties you view, save, or inquire about
- Location data if you enable location services

**Technical Information:**
- IP address, browser type, and device information
- Cookies and similar tracking technologies
- Usage data and analytics (page views, clicks, time spent)

**Communication Data:**
- Messages sent through our platform
- Email correspondence with our support team
- Feedback and survey responses`
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect for various purposes:

**To Provide Our Services:**
- Create and manage your account
- Connect buyers with sellers/agents
- Process and respond to inquiries
- Send property alerts and updates

**To Improve Our Platform:**
- Analyze usage patterns and trends
- Develop new features and functionality
- Enhance user experience
- Perform security and fraud prevention

**To Communicate With You:**
- Send service-related notifications
- Respond to your questions and requests
- Send marketing communications (with your consent)
- Provide customer support

**For Legal Compliance:**
- Comply with legal obligations
- Enforce our Terms and Conditions
- Protect our rights and property
- Prevent fraud and abuse`
    },
    {
      title: "3. How We Share Your Information",
      content: `We may share your information in the following circumstances:

**With Agents and Sellers:**
When you contact an agent or seller about a property, we share your contact information (name, email, phone) so they can respond to your inquiry.

**With Service Providers:**
We work with third-party service providers who perform services on our behalf, such as:
- Hosting and data storage
- Analytics and performance monitoring
- Email delivery services
- Payment processing (for subscriptions)

**For Legal Reasons:**
We may disclose information if required by law or if we believe such action is necessary to:
- Comply with legal process
- Enforce our policies
- Respond to claims of violation of rights
- Protect the safety of users or the public

**Business Transfers:**
If 101Elver is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.

**With Your Consent:**
We may share information with third parties when you give us explicit permission to do so.`
    },
    {
      title: "4. Data Retention",
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy.

**Active Accounts:**
We keep your account data as long as your account remains active.

**Inactive Accounts:**
If you don't log in for 24 months, we may delete your account and associated data after providing notice.

**Legal Requirements:**
We may retain certain information for longer periods if required by law or for legitimate business purposes (e.g., fraud prevention, dispute resolution).

**Deletion Requests:**
You can request deletion of your account and data at any time by contacting us at privacy@101elver.com.`
    },
    {
      title: "5. Your Rights and Choices",
      content: `You have certain rights regarding your personal information:

**Access and Correction:**
You can access and update your account information at any time through your profile settings.

**Data Portability:**
You can request a copy of your personal data in a machine-readable format.

**Deletion:**
You can request deletion of your account and personal information. Note that some information may be retained as required by law.

**Marketing Communications:**
You can opt out of marketing emails by clicking the "unsubscribe" link in any marketing email or adjusting your communication preferences in account settings.

**Cookies:**
Most web browsers accept cookies by default. You can usually modify your browser settings to decline cookies if you prefer.

**Location Data:**
You can disable location services through your device settings at any time.

To exercise any of these rights, please contact us at privacy@101elver.com.`
    },
    {
      title: "6. Security",
      content: `We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it:

**Data Encryption:**
- All data transmitted between your device and our servers is encrypted using SSL/TLS
- Sensitive data is encrypted at rest

**Access Controls:**
- Access to personal information is restricted to authorized personnel only
- Multi-factor authentication for admin accounts
- Regular security audits and penetration testing

**Security Monitoring:**
- 24/7 monitoring for suspicious activity
- Automated threat detection systems
- Regular security updates and patches

**Data Backups:**
- Regular encrypted backups
- Disaster recovery procedures in place

While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.`
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to enhance your experience:

**Essential Cookies:**
Required for the Platform to function properly (e.g., authentication, security).

**Analytics Cookies:**
Help us understand how users interact with the Platform (e.g., Google Analytics).

**Functionality Cookies:**
Remember your preferences and settings (e.g., language, search filters).

**Marketing Cookies:**
Used to deliver relevant advertisements and track campaign effectiveness.

You can control cookies through your browser settings. Note that disabling certain cookies may limit Platform functionality.`
    },
    {
      title: "8. Third-Party Links",
      content: `The Platform may contain links to third-party websites, plugins, or applications. We are not responsible for the privacy practices of these third parties.

We encourage you to read the privacy policies of any third-party sites you visit. This Privacy Policy applies only to information collected by 101Elver.`
    },
    {
      title: "9. Children's Privacy",
      content: `Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@101elver.com, and we will delete that information from our systems.`
    },
    {
      title: "10. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from your jurisdiction.

When we transfer information internationally, we ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.`
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons.

We will notify you of any material changes by:
- Posting the new Privacy Policy on this page
- Updating the "Last Updated" date
- Sending an email notification (for significant changes)

We encourage you to review this Privacy Policy periodically. Your continued use of the Platform after changes constitutes acceptance of the updated Privacy Policy.`
    },
    {
      title: "12. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** privacy@101elver.com
**Phone:** +90 533 123 4567
**Address:** 123 Kyrenia Avenue, Girne, North Cyprus, 99300

**Data Protection Officer:**
For data protection inquiries, contact our DPO at: dpo@101elver.com

We will respond to your inquiry within 30 days.

**Last Updated:** October 24, 2025`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your data.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-12">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-8 text-lg">
                At 101Elver, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, share, and safeguard your data when you use our platform.
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}

              <div className="bg-green-50 border-l-4 border-green-600 p-6 mt-8">
                <p className="text-gray-700">
                  <strong>Your Trust Matters:</strong> We are committed to transparency and protecting your privacy. 
                  If you have any questions or concerns about how we handle your data, please don't hesitate to contact us.
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

export default PrivacyPolicy;
