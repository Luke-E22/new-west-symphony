/**
 * New West Symphony's privacy notice, ported verbatim from the live site
 * (newwestsymphony.org/privacy-policy/, last updated November 04, 2024).
 *
 * This is a legal document: the wording is reproduced as published and must not
 * be paraphrased, summarised, or "tidied" without the organisation's sign-off.
 * Section ids match the original anchors (#infocollect, #uslaws, …) so deep
 * links to the old URL survive the /privacy-policy → /privacy redirect.
 *
 * Inline links use a markdown-style [label](href); bare URLs and email
 * addresses are linkified by the renderer.
 */

export type PolicyBlock =
  | { kind: "p"; text: string }
  | { kind: "inShort"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "address"; lines: string[] }
  | { kind: "table"; head: string[]; rows: string[][] };

export interface PolicySection {
  /** Anchor id, matching the original document. */
  id: string;
  /** Position in the table of contents. */
  n: number;
  title: string;
  blocks: PolicyBlock[];
}

const DSAR = "https://app.termly.io/notify/1452d4c4-67c2-4399-84f3-23996ba6398b";

export const PRIVACY_UPDATED = "November 04, 2024";

export const PRIVACY_INTRO: PolicyBlock[] = [
  {
    kind: "p",
    text: "This Privacy Notice for New West Symphony Association (“we,” “us,” or “our”), describes how and why we might access, collect, store, use, and/or share (“process”) your personal information when you use our services (“Services”), including when you:",
  },
  {
    kind: "ul",
    items: [
      "Visit our website at https://www.newwestsymphony.org, or any website of ours that links to this Privacy Notice",
      "Engage with us in other related ways, including any sales, marketing, or events",
    ],
  },
  {
    kind: "p",
    text: "Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at symphony@newwestsymphony.org.",
  },
];

export const PRIVACY_SUMMARY: PolicyBlock[] = [
  {
    kind: "p",
    text: "This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our [table of contents](#toc) below to find the section you are looking for.",
  },
  {
    kind: "ul",
    items: [
      "What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about [personal information you disclose to us](#infocollect).",
      "Do we process any sensitive personal information? Some of the information may be considered “special” or “sensitive” in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.",
      "Do we collect any information from third parties? We do not collect any information from third parties.",
      "How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about [how we process your information](#infouse).",
      "In what situations and with which parties do we share personal information? We may share information in specific situations and with specific third parties. Learn more about [when and with whom we share your personal information](#whoshare).",
      "How do we keep your information safe? We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about [how we keep your information safe](#infosafe).",
      "What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about [your privacy rights](#privacyrights).",
      `How do you exercise your rights? The easiest way to exercise your rights is by submitting a [data subject access request](${DSAR}), or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.`,
    ],
  },
  {
    kind: "p",
    text: "Want to learn more about what we do with any information we collect? [Review the Privacy Notice in full](#toc).",
  },
];

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "infocollect",
    n: 1,
    title: "WHAT INFORMATION DO WE COLLECT?",
    blocks: [
      { kind: "h3", text: "Personal information you disclose to us" },
      { kind: "inShort", text: "We collect personal information that you provide to us." },
      {
        kind: "p",
        text: "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.",
      },
      {
        kind: "p",
        text: "Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:",
      },
      {
        kind: "ul",
        items: [
          "names",
          "phone numbers",
          "email addresses",
          "mailing addresses",
          "billing addresses",
          "debit/credit card numbers",
        ],
      },
      { kind: "p", text: "Sensitive Information. We do not process sensitive information." },
      {
        kind: "p",
        text: "All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.",
      },
      { kind: "h3", text: "Information automatically collected" },
      {
        kind: "inShort",
        text: "Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.",
      },
      {
        kind: "p",
        text: "We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.",
      },
      { kind: "p", text: "The information we collect includes:" },
      {
        kind: "ul",
        items: [
          "Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called “crash dumps”), and hardware settings).",
          "Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.",
          "Location Data. We collect location data such as information about your device’s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.",
        ],
      },
    ],
  },
  {
    id: "infouse",
    n: 2,
    title: "HOW DO WE PROCESS YOUR INFORMATION?",
    blocks: [
      {
        kind: "inShort",
        text: "We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.",
      },
      {
        kind: "p",
        text: "We process your personal information for a variety of reasons, depending on how you interact with our Services, including:",
      },
      {
        kind: "ul",
        items: [
          "To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.",
          "To fulfill and manage your orders. We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.",
          "To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.",
          "To determine the effectiveness of our marketing and promotional campaigns. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.",
        ],
      },
    ],
  },
  {
    id: "whoshare",
    n: 3,
    title: "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    blocks: [
      {
        kind: "inShort",
        text: "We may share information in specific situations described in this section and/or with the following third parties.",
      },
      { kind: "p", text: "We may need to share your personal information in the following situations:" },
      {
        kind: "ul",
        items: [
          "Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.",
        ],
      },
    ],
  },
  {
    id: "cookies",
    n: 4,
    title: "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    blocks: [
      {
        kind: "inShort",
        text: "We may use cookies and other tracking technologies to collect and store your information.",
      },
      {
        kind: "p",
        text: "We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.",
      },
      {
        kind: "p",
        text: "We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.",
      },
      {
        kind: "p",
        text: "To the extent these online tracking technologies are deemed to be a “sale”/“sharing” (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section “[DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?](#uslaws)”",
      },
      {
        kind: "p",
        text: "Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.",
      },
      { kind: "h3", text: "Google Analytics" },
      {
        kind: "p",
        text: "We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout. You can opt out of Google Analytics Advertising Features through [Ads Settings](https://adssettings.google.com/) and Ad Settings for mobile apps. Other opt out means include http://optout.networkadvertising.org/ and http://www.networkadvertising.org/mobile-choice. For more information on the privacy practices of Google, please visit the [Google Privacy & Terms page](https://policies.google.com/privacy).",
      },
    ],
  },
  {
    id: "inforetain",
    n: 5,
    title: "HOW LONG DO WE KEEP YOUR INFORMATION?",
    blocks: [
      {
        kind: "inShort",
        text: "We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.",
      },
      {
        kind: "p",
        text: "We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).",
      },
      {
        kind: "p",
        text: "When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.",
      },
    ],
  },
  {
    id: "infosafe",
    n: 6,
    title: "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    blocks: [
      {
        kind: "inShort",
        text: "We aim to protect your personal information through a system of organizational and technical security measures.",
      },
      {
        kind: "p",
        text: "We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.",
      },
    ],
  },
  {
    id: "infominors",
    n: 7,
    title: "DO WE COLLECT INFORMATION FROM MINORS?",
    blocks: [
      {
        kind: "inShort",
        text: "We do not knowingly collect data from or market to children under 18 years of age.",
      },
      {
        kind: "p",
        text: "We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at symphony@newwestsymphony.org.",
      },
    ],
  },
  {
    id: "privacyrights",
    n: 8,
    title: "WHAT ARE YOUR PRIVACY RIGHTS?",
    blocks: [
      {
        kind: "inShort",
        text: "You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.",
      },
      {
        kind: "p",
        text: "Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section “[HOW CAN YOU CONTACT US ABOUT THIS NOTICE?](#contact)” below.",
      },
      {
        kind: "p",
        text: "However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.",
      },
      {
        kind: "p",
        text: "Opting out of marketing and promotional communications: You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section “[HOW CAN YOU CONTACT US ABOUT THIS NOTICE?](#contact)” below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.",
      },
      {
        kind: "p",
        text: "If you have questions or comments about your privacy rights, you may email us at symphony@newwestsymphony.org.",
      },
    ],
  },
  {
    id: "DNT",
    n: 9,
    title: "CONTROLS FOR DO-NOT-TRACK FEATURES",
    blocks: [
      {
        kind: "p",
        text: "Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.",
      },
      {
        kind: "p",
        text: "California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.",
      },
    ],
  },
  {
    id: "uslaws",
    n: 10,
    title: "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    blocks: [
      {
        kind: "inShort",
        text: "If you are a resident of California, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.",
      },
      { kind: "h3", text: "Categories of Personal Information We Collect" },
      {
        kind: "p",
        text: "We have collected the following categories of personal information in the past twelve (12) months:",
      },
      {
        kind: "table",
        head: ["Category", "Examples", "Collected"],
        rows: [
          [
            "A. Identifiers",
            "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name",
            "NO",
          ],
          [
            "B. Personal information as defined in the California Customer Records statute",
            "Name, contact information, education, employment, employment history, and financial information",
            "YES",
          ],
          [
            "C. Protected classification characteristics under state or federal law",
            "Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data",
            "NO",
          ],
          [
            "D. Commercial information",
            "Transaction information, purchase history, financial details, and payment information",
            "YES",
          ],
          ["E. Biometric information", "Fingerprints and voiceprints", "NO"],
          [
            "F. Internet or other similar network activity",
            "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements",
            "NO",
          ],
          ["G. Geolocation data", "Device location", "YES"],
          [
            "H. Audio, electronic, sensory, or similar information",
            "Images and audio, video or call recordings created in connection with our business activities",
            "NO",
          ],
          [
            "I. Professional or employment-related information",
            "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us",
            "NO",
          ],
          ["J. Education Information", "Student records and directory information", "NO"],
          [
            "K. Inferences drawn from collected personal information",
            "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics",
            "NO",
          ],
          ["L. Sensitive personal Information", "", "NO"],
        ],
      },
      {
        kind: "p",
        text: "We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:",
      },
      {
        kind: "ul",
        items: [
          "Receiving help through our customer support channels;",
          "Participation in customer surveys or contests; and",
          "Facilitation in the delivery of our Services and to respond to your inquiries.",
        ],
      },
      {
        kind: "p",
        text: "We will use and retain the collected personal information as needed to provide the Services or for:",
      },
      {
        kind: "ul",
        items: [
          "Category B - As long as the user has an account with us",
          "Category D - As long as the user has an account with us",
          "Category G - As long as the user has an account with us",
        ],
      },
      { kind: "h3", text: "Sources of Personal Information" },
      {
        kind: "p",
        text: "Learn more about the sources of personal information we collect in “[WHAT INFORMATION DO WE COLLECT?](#infocollect)”",
      },
      { kind: "h3", text: "How We Use and Share Personal Information" },
      {
        kind: "p",
        text: "Learn more about how we use your personal information in the section, “[HOW DO WE PROCESS YOUR INFORMATION?](#infouse)”",
      },
      { kind: "h3", text: "Will your information be shared with anyone else?" },
      {
        kind: "p",
        text: "We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, “[WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?](#whoshare)”",
      },
      {
        kind: "p",
        text: "We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be “selling” of your personal information.",
      },
      {
        kind: "p",
        text: "We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.",
      },
      { kind: "h3", text: "Your Rights" },
      {
        kind: "p",
        text: "You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:",
      },
      {
        kind: "ul",
        items: [
          "Right to know whether or not we are processing your personal data",
          "Right to access your personal data",
          "Right to correct inaccuracies in your personal data",
          "Right to request the deletion of your personal data",
          "Right to obtain a copy of the personal data you previously shared with us",
          "Right to non-discrimination for exercising your rights",
          "Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California’s privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects (“profiling”)",
        ],
      },
      {
        kind: "p",
        text: "Depending upon the state where you live, you may also have the following rights:",
      },
      {
        kind: "ul",
        items: [
          "Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including California's privacy law)",
          "Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including California’s privacy law)",
        ],
      },
      { kind: "h3", text: "How to Exercise Your Rights" },
      {
        kind: "p",
        text: `To exercise these rights, you can contact us by submitting a [data subject access request](${DSAR}), by emailing us at symphony@newwestsymphony.org, or by referring to the contact details at the bottom of this document.`,
      },
      {
        kind: "p",
        text: "Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.",
      },
      { kind: "h3", text: "Request Verification" },
      {
        kind: "p",
        text: "Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.",
      },
      {
        kind: "p",
        text: "If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.",
      },
      { kind: "h3", text: "California “Shine The Light” Law" },
      {
        kind: "p",
        text: "California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section “[HOW CAN YOU CONTACT US ABOUT THIS NOTICE?](#contact)”",
      },
    ],
  },
  {
    id: "policyupdates",
    n: 11,
    title: "DO WE MAKE UPDATES TO THIS NOTICE?",
    blocks: [
      {
        kind: "inShort",
        text: "Yes, we will update this notice as necessary to stay compliant with relevant laws.",
      },
      {
        kind: "p",
        text: "We may update this Privacy Notice from time to time. The updated version will be indicated by an updated “Revised” date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.",
      },
    ],
  },
  {
    id: "contact",
    n: 12,
    title: "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    blocks: [
      {
        kind: "p",
        text: "If you have questions or comments about this notice, you may email us at symphony@newwestsymphony.org or contact us by post at:",
      },
      {
        kind: "address",
        lines: [
          "New West Symphony Association",
          "2100 Thousand Oaks Blvd, Suite D",
          "Thousand Oaks, CA 91362",
          "United States",
        ],
      },
    ],
  },
  {
    id: "request",
    n: 13,
    title: "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
    blocks: [
      {
        kind: "p",
        text: `Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a [data subject access request](${DSAR}).`,
      },
    ],
  },
];
