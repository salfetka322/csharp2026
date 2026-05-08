import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './ProtectedRoute.jsx';

export const ROUTER_PATHS = {
  HOME: '/',
  ABOUTUS: '/about',
  SAFETY: '/safety',
  SUPPORT: '/support',
  POLICY: '/policy',
  TERMS: '/terms',
  PROBLEM: '/problem',
  MISSION: '/mission',
  TEAM: '/team',
  PARTNER: '/partner',
  FAQ: '/faq',
  CONTACT: '/contact',
  INSTRUCTION: '/instruction',
  CREATE_PROFILE: '/create',
  FINDING_PROFILE: '/finding',
  SETTINGS: '/settings',
  MATHCES: '/matches',
};

const PublicLayout = lazy(() =>
  import('../components/layout/PublicLayout/PublicLayout.jsx'),
);
const PrivateLayout = lazy(() =>
  import('../components/layout/PrivateLayout/PrivateLayout.jsx'),
);
const HomePage = lazy(() => import('../pages/Home/HomePage'));
const AboutUsPage = lazy(() => import('../pages/AboutUs/AboutPage'));
const SafetyPage = lazy(() => import('../pages/TipsSafety/TipsSafetyPage'));
const PolicyPage = lazy(() =>
  import('../pages/PrivacyPolicy/PrivacyPolicyPage'),
);
const TermsPage = lazy(() =>
  import('../pages/TermsConditions/TermsConditionsPage'),
);
const ReportProblemPage = lazy(() =>
  import('../pages/ReportProblem/ReportProblemPage'),
);
const SupportPage = lazy(() => import('../pages/Support/SupportPage'));
const FAQPage = lazy(() => import('../pages/FAQ/FAQPage'));
const ContactUs = lazy(() => import('../pages/Contact/Contact.jsx'));
const InstructionPage = lazy(() =>
  import('../pages/Instruction/InstructionPage'),
);
const MissionPage = lazy(() => import('../pages/Mission/MissionPage'));
const TeamPage = lazy(() => import('../pages/OurTeam/TeamPage'));
const PartnerPage = lazy(() => import('../pages/OurPartner/PartnerPage'));
const CreateProfilePage = lazy(() =>
  import('../pages/CreateProfilePage/CreateProfilePage'),
);
const FindingProfilePage = lazy(() =>
  import('../pages/FindProfilePage/FindProfilePage.jsx'),
);
const MatchesPage = lazy(() => import('../pages/MatchesPage/MatchesPage.jsx'));
const SettingsPage = lazy(() => import('../pages/SettingsPage/Settings.jsx'));
const NotFoundPage = lazy(() => import('../pages/404/Page404'));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTER_PATHS.ABOUTUS, element: <AboutUsPage /> },
      { path: ROUTER_PATHS.SAFETY, element: <SafetyPage /> },
      { path: ROUTER_PATHS.PROBLEM, element: <ReportProblemPage /> },
      { path: ROUTER_PATHS.POLICY, element: <PolicyPage /> },
      { path: ROUTER_PATHS.TERMS, element: <TermsPage /> },
      { path: ROUTER_PATHS.SUPPORT, element: <SupportPage /> },
      { path: ROUTER_PATHS.FAQ, element: <FAQPage /> },
      { path: ROUTER_PATHS.CONTACT, element: <ContactUs /> },
      { path: ROUTER_PATHS.INSTRUCTION, element: <InstructionPage /> },
      { path: ROUTER_PATHS.MISSION, element: <MissionPage /> },
      { path: ROUTER_PATHS.TEAM, element: <TeamPage /> },
      { path: ROUTER_PATHS.PARTNER, element: <PartnerPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTER_PATHS.CREATE_PROFILE, element: <CreateProfilePage /> },
      { path: ROUTER_PATHS.FINDING_PROFILE, element: <FindingProfilePage /> },
      { path: ROUTER_PATHS.MATHCES, element: <MatchesPage /> },
      { path: ROUTER_PATHS.SETTINGS, element: <SettingsPage /> },
    ],
  },
]);
