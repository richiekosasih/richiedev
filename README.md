# Richie Kosasih Portfolio

Recruiter-facing personal portfolio for Richie Kosasih, built with React, Vite, Tailwind CSS, and Framer Motion.

## Focus

- Editorial monochrome portfolio direction
- Frontend, ICT support, and business systems positioning
- Responsive desktop and mobile layout
- Recruiter-friendly sections: hero, career signals, about, skills, work, and contact
- Resume download from `public/RichiePKosasih_Resume.pdf`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- React Router
- Lucide React
- React Icons
- Vercel Analytics and Speed Insights

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Project Structure

```text
src/
  app/
    App.jsx
    routes.jsx
    layouts/SiteLayout.jsx
    providers/PreloaderProvider.jsx
  components/
    accessibility/SkipToContent.jsx
    nav/Header.jsx
    nav/Footer.jsx
    ui/
      Container.jsx
      KineticMarquee.jsx
      PreloaderSequence.jsx
      RotatingText.jsx
      Skeleton.jsx
      SkillTicker.jsx
      StaggeredMenu.jsx
      TiltCard.jsx
  features/
    about/About.jsx
    career/CareerSnapshot.jsx
    contact/Contact.jsx
    experience/Experience.jsx
    hero/Hero.jsx
    projects/Projects.jsx
  pages/
    Home.jsx
    NotFound.jsx
  styles/globals.css
```

## Resume

The public resume file is:

```text
public/RichiePKosasih_Resume.pdf
```

Keep this filename stable unless the resume links in the website are updated too.
