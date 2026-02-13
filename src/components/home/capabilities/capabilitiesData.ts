export interface PillarScreenshot {
  src: string;
  alt: string;
  title: string;
}

export interface Pillar {
  title: string;
  badge?: string;
  screenshots: PillarScreenshot[];
}

export const PILLARS: Pillar[] = [
  {
    title: "AI-Powered Document Generation",
screenshots: [
      {
        src: "/capabilities/Draft Page - Main Page.png",
        alt: "Draft page main interface showing document generation options",
        title: "Draft Dashboard",
      },
      {
        src: "/capabilities/Draft page - drafting canvas opened up.png",
        alt: "Drafting canvas expanded for full-screen editing",
        title: "Drafting Canvas",
      },
      {
        src: "/capabilities/Asking Lexi to draft a motion from main page - part 1.png",
        alt: "Asking Lexi AI to draft a motion, step 1",
        title: "AI Draft Request",
      },
      {
        src: "/capabilities/Creating a motion from main page - drafting in action - part 2.png",
        alt: "Motion drafting in progress with AI assistance, step 2",
        title: "Drafting in Action",
      },
      {
        src: "/capabilities/Drafting Canvas In Action - Drafting a Motion to Supress for a case.png",
        alt: "Drafting canvas showing a motion to suppress being generated",
        title: "Motion Generation",
      },
      {
        src: "/capabilities/Drafting from Main Page - Draft Complete - Part 3 Final.png",
        alt: "Completed motion draft ready for review",
        title: "Draft Complete",
      },
    ],
  },
  {
    title: "Intelligent Legal Research & Analysis",
screenshots: [
      {
        src: "/capabilities/Legal Research Page.png",
        alt: "Legal research interface with precedent search results",
        title: "Legal Research",
      },
      {
        src: "/capabilities/Document Analysis Page.png",
        alt: "Document analysis page showing AI-extracted insights",
        title: "Document Analysis",
      },
    ],
  },
  {
    title: "Unified Case & Workflow Management",
screenshots: [
      {
        src: "/capabilities/Matters View.png",
        alt: "Matters management view with case list",
        title: "Matters",
      },
      {
        src: "/capabilities/Dashboard View.png",
        alt: "Dashboard overview showing key metrics and tasks",
        title: "Dashboard",
      },
      {
        src: "/capabilities/Notes Page.png",
        alt: "Notes page for case-specific note-taking",
        title: "Notes",
      },
      {
        src: "/capabilities/Calendar Page - Lexi in action creating a event.png",
        alt: "Calendar page with Lexi creating an event",
        title: "Calendar",
      },
      {
        src: "/capabilities/EFILE TRIAGE PAGE - Scans inbox for important efiles and flags them here.png",
        alt: "E-file triage page flagging important electronic filings",
        title: "E-File Triage",
      },
    ],
  },
  {
    title: "Seamless Client Communication",
screenshots: [
      {
        src: "/capabilities/Communications Page - Slack Style - Create matter channels - talk with team members - talk with clients.png",
        alt: "Slack-style communications page with matter channels",
        title: "Messaging",
      },
      {
        src: "/capabilities/Email Page.png",
        alt: "Integrated email client for matter-based correspondence",
        title: "Email",
      },
      {
        src: "/capabilities/Phone Page.png",
        alt: "Phone integration page for client calls",
        title: "Phone",
      },
      {
        src: "/capabilities/Video Confrencing Page.png",
        alt: "Video conferencing page for remote meetings",
        title: "Video Conferencing",
      },
    ],
  },
  {
    title: "Automated Firm Operations & Intake",
screenshots: [
      {
        src: "/capabilities/Leads Page.png",
        alt: "Leads management page for client intake",
        title: "Leads",
      },
      {
        src: "/capabilities/Time Tracking Page - Next Time.png",
        alt: "Time tracking interface for billing entries",
        title: "Time Tracking",
      },
      {
        src: "/capabilities/Contacts Page.png",
        alt: "Contacts directory for firm relationships",
        title: "Contacts",
      },
      {
        src: "/capabilities/Profile Page.png",
        alt: "User profile settings page",
        title: "Profile",
      },
      {
        src: "/capabilities/Settings Page.png",
        alt: "Firm settings and configuration page",
        title: "Settings",
      },
      {
        src: "/capabilities/Documents Page.png",
        alt: "Document management page with file browser",
        title: "Documents",
      },
    ],
  },
  {
    title: "AI-Powered 24/7 Receptionist",
badge: "Coming Soon",
    screenshots: [
      {
        src: "/capabilities/AI Receptionist Page - Coming Soon - Have Lexi answer your phones!.png",
        alt: "AI receptionist page showing automated phone answering interface",
        title: "AI Receptionist",
      },
    ],
  },
];
