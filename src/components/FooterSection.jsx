import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

export default function FooterSection({ darkMode }) {
  const TwitterIcon = getIcon('Twitter');
  const FacebookIcon = getIcon('Facebook');
  const InstagramIcon = getIcon('Instagram');
  const LinkedinIcon = getIcon('Linkedin');
  const GithubIcon = getIcon('Github');

  const footerLinks = [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#features" },
        { text: "Pricing", url: "#pricing" },
        { text: "Dashboard", url: "/dashboard" },
        { text: "Roadmap", url: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Documentation", url: "#" },
        { text: "Guides", url: "#" },
        { text: "API", url: "#" },
        { text: "Blog", url: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Privacy", url: "#" },
      ]
    }
  ];

  const socialIcons = [
    { icon: <TwitterIcon size={20} />, url: "#" },
    { icon: <FacebookIcon size={20} />, url: "#" },
    { icon: <InstagramIcon size={20} />, url: "#" },
    { icon: <LinkedinIcon size={20} />, url: "#" },
    { icon: <GithubIcon size={20} />, url: "#" },
  ];

  return (
    <footer className="bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 pt-12 pb-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="md:w-1/3">
            <Link to="/" className="text-primary dark:text-primary-light text-2xl font-bold">FreeLance</Link>
            <p className="mt-4 text-surface-600 dark:text-surface-400 max-w-md">
              The complete toolkit for freelancers to manage projects, track time, invoice clients, and grow their business.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialIcons.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  className="text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10">
            {footerLinks.map((column, i) => (
              <div key={i}>
                <h4 className="font-bold text-lg mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-200 dark:border-surface-800 text-sm text-surface-500 dark:text-surface-400 text-center">
          <p>© {new Date().getFullYear()} FreeLance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}