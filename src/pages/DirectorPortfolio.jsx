import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  CheckCircle,
  Share2,
  Linkedin,
  Twitter,
  Copy,
  Printer,
  Star,
} from "lucide-react";
import BackButton from "../components/BackButton";

const DirectorPortfolio = () => {
  const [copied, setCopied] = useState(false);

  // Director's Information
  const director = {
    name: "Hilary Moses Luckson",
    title: "CEO/MD",
    company: "Luckson Homes",
    tagline: "Own a piece of the earth",
    location: "Abuja, Nigeria",
    email: "hilarymss3@gmail.com",
    phone: "08134101409",
    dob: "14th August",
    photo: "/director-photo.png",
  };

  // Professional Summary/Objective
  const objective =
    "Visionary entrepreneur and real estate developer with a unique background in analytical chemistry and quality control. Seeking to leverage scientific precision, data-driven decision-making, and proven leadership to expand Luckson Homes' impact in providing affordable, high-quality housing solutions across Nigeria. Committed to building communities, creating value, and transforming lives through ethical real estate development.";

  // Education
  const education = [
    {
      degree: "Analytical Chemistry (In View)",
      institution: "Nigeria Defense Academy, Kaduna",
      year: "2025",
      status: "In Progress",
      icon: "🎓",
    },
    {
      degree: "BSc. Chemistry",
      institution: "University of Maiduguri",
      year: "2017",
      grade: "Second Class Upper (2.1)",
      icon: "🎓",
    },
    {
      degree: "Diploma in Computer Application",
      institution: "YAYSIB Computer Institute, Maiduguri, Borno State",
      year: "2012",
      grade: "Credit",
      icon: "💻",
    },
    {
      degree: "Ordinary National Diploma (OND)",
      institution: "Federal Government College, Maiduguri",
      year: "2011",
      grade: "Distinction",
      icon: "📚",
    },
    {
      degree: "Primary School Leaving Certificate",
      institution: "Kauna Primary School, Biu, Borno State",
      year: "2000-2005",
      grade: "Distinction",
      icon: "🏫",
    },
  ];

  // Professional Experience
  const experience = [
    {
      position: "CEO/MD",
      company: "Luckson Homes",
      location: "Abuja, Nigeria",
      period: "2020 - Present",
      description:
        "Founded and built Luckson Homes into a trusted real estate development company, delivering premium residential estates in strategic locations across Abuja.",
      achievements: [
        "Developed 2 major estate projects: Ijaida Estate Karshi and The Highland City Sheretti",
        "Delivered 50+ units to satisfied families",
        "Established transparent pricing and flexible payment plans",
        "Built strong partnerships with construction firms and financial institutions",
        "Achieved 100% client satisfaction through quality and integrity",
      ],
    },
    {
      position: "Chemistry Teacher",
      company: "KAD Academy",
      location: "Kaduna, Nigeria",
      period: "2021 - 2024",
      description:
        "Taught chemistry to secondary school students, developing curriculum and assessment strategies while mentoring students to academic excellence.",
      achievements: [
        "Improved student performance by 35% through innovative teaching methods",
        "Developed practical laboratory sessions for hands-on learning",
        "Mentored students to achieve top grades in WAEC/NECO examinations",
      ],
    },
    {
      position: "LQAS Independent Officer",
      company: "World Health Organization, Kaduna",
      location: "Kaduna, Nigeria",
      period: "2019 - 2021",
      description:
        "Conducted lot quality assurance sampling (LQAS) for immunization campaigns, ensuring data accuracy and program effectiveness across Kaduna State.",
      achievements: [
        "Supervised data collection across 50+ wards",
        "Ensured 98% data accuracy through rigorous quality checks",
        "Trained field officers on ODK data collection tools",
        "Contributed to WHO immunization coverage reports",
      ],
    },
    {
      position: "Intern (Laboratory)",
      company: "NAFDAC Kaduna Laboratory",
      location: "Kaduna, Nigeria",
      period: "February 2016 - September 2016",
      description:
        "Assisted in drug analysis, quality control testing, and laboratory management while observing strict safety protocols.",
      achievements: [
        "Conducted chemical analysis on 200+ pharmaceutical samples",
        "Maintained laboratory equipment and chemical inventory",
        "Prepared reagents and documented test results with precision",
      ],
    },
    {
      position: "Casual Staff (Quality Control)",
      company: "Nigerian Bottling Company",
      location: "Nigeria",
      period: "2012 - 2013",
      description:
        "Performed quality control checks on beverage production lines, ensuring products met company and regulatory standards.",
      achievements: [
        "Monitored production quality for over 10,000 bottles daily",
        "Identified and reported quality deviations promptly",
        "Maintained compliance with NAFDAC quality standards",
      ],
    },
  ];

  // Skills
  const skills = [
    {
      category: "Real Estate & Business",
      items: [
        "Real Estate Development",
        "Project Management",
        "Strategic Planning",
        "Business Development",
        "Client Relations",
        "Financial Planning",
        "Negotiations",
        "Market Analysis",
      ],
    },
    {
      category: "Technical Skills",
      items: [
        "Data Analysis (ODK, Excel, SPSS)",
        "Microsoft Office Suite (Expert)",
        "Quality Control & Assurance",
        "Laboratory Management",
        "Chemical Analysis",
        "Reagent Preparation",
        "Scientific Documentation",
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Leadership & Team Management",
        "Problem Solving",
        "Creativity & Innovation",
        "Fast Learner",
        "Excellent Communication",
        "Active Listening",
        "Attention to Detail",
        "Works Well Under Pressure",
      ],
    },
  ];

  // Professional References
  const references = [
    {
      name: "Dr. Dauda Madubu",
      title: "State Coordinator (Rtd)",
      organization: "World Health Organization",
      phone: "08033494051",
    },
    {
      name: "Prof. N. H. Likki",
      title: "Sub-Dean",
      organization: "University of Maiduguri",
      phone: "07030521829",
    },
    {
      name: "Rev. Moses A. Luckson",
      title: "Pastor in Charge",
      organization: "E.Y.N Jimeta, Adamawa State",
      phone: "08060176708",
    },
  ];

  // Share/Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print Function
  const handlePrint = () => {
    window.print();
  };

  // Download CV
  const handleDownload = () => {
    alert(
      "CV download functionality will be implemented with PDF generation. For now, please use the Print function and save as PDF.",
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <BackButton />

      {/* Action Buttons - Fixed */}
      <div className="fixed top-24 right-6 z-40 flex flex-col gap-3 print:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDownload}
          className="w-12 h-12 bg-gold rounded-full shadow-gold-lg flex items-center justify-center hover:bg-gold-dark transition-colors group"
          title="Download CV"
        >
          <Download size={20} className="text-navy" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrint}
          className="w-12 h-12 bg-teal rounded-full shadow-lg flex items-center justify-center hover:bg-teal-dark transition-colors"
          title="Print"
        >
          <Printer size={20} className="text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCopyLink}
          className="w-12 h-12 bg-navy rounded-full shadow-navy-lg flex items-center justify-center hover:bg-navy-light transition-colors relative"
          title="Copy Link"
        >
          {copied ? (
            <CheckCircle size={20} className="text-gold" />
          ) : (
            <Copy size={20} className="text-white" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
              "_blank",
            )
          }
          className="w-12 h-12 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          title="Share on LinkedIn"
        >
          <Linkedin size={20} className="text-white" />
        </motion.button>
      </div>

      {/* Hero Header with Background Image */}
      <section className="relative bg-gradient-navy py-16 overflow-hidden">
        {/* Background Image with 50% Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80')",
            opacity: 0.5,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/85 to-navy/90"></div>

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gold rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Profile Photo/Avatar - BIGGER CIRCLE! */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-gold shadow-gold-lg overflow-hidden relative">
                <img
                  src={director.photo}
                  alt={director.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
                <div className="w-full h-full hidden items-center justify-center bg-gradient-gold absolute inset-0">
                  <span className="text-8xl md:text-9xl font-bold text-navy">
                    HML
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {director.name}
              </h1>
              <p className="text-xl md:text-2xl text-gold font-semibold mb-4">
                {director.title}
              </p>
              <p className="text-lg text-gray-300 mb-6">
                {director.company} • {director.tagline}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-gray-300 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gold" />
                  <span className="text-sm">{director.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-teal" />
                  <a
                    href={`mailto:${director.email}`}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {director.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-gold" />
                  <a
                    href={`tel:${director.phone}`}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {director.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-teal" />
                  <span className="text-sm">Born: {director.dob}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Professional Summary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-navy mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                <Star size={20} className="text-navy" />
              </div>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{objective}</p>
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            Professional Experience
          </h2>

          <div className="space-y-6">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-premium transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-1">
                      {job.position}
                    </h3>
                    <p className="text-gold font-semibold">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  <span className="text-sm font-semibold text-teal bg-teal/10 px-4 py-2 rounded-full">
                    {job.period}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {job.description}
                </p>

                {job.achievements && (
                  <div>
                    <h4 className="font-semibold text-navy mb-2 text-sm uppercase tracking-wide">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle
                            size={16}
                            className="text-gold mt-1 flex-shrink-0"
                          />
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
              <GraduationCap size={20} className="text-navy" />
            </div>
            Education & Qualifications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-premium transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{edu.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-teal font-semibold text-sm mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} className="text-gold" />
                      <span>{edu.year}</span>
                    </div>
                    {edu.grade && (
                      <div className="mt-2">
                        <span className="inline-block bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">
                          {edu.grade}
                        </span>
                      </div>
                    )}
                    {edu.status && (
                      <div className="mt-2">
                        <span className="inline-block bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-semibold">
                          {edu.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-light rounded-full flex items-center justify-center">
              <Award size={20} className="text-white" />
            </div>
            Skills & Competencies
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-navy mb-4 pb-2 border-b-2 border-gold">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-2 h-2 bg-teal rounded-full"></div>
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* References */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-navy mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-navy" />
            </div>
            Professional References
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {references.map((ref, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-premium transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gold">
                    {ref.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-1">{ref.name}</h3>
                <p className="text-gold font-semibold text-sm mb-1">
                  {ref.title}
                </p>
                <p className="text-gray-600 text-sm mb-3">{ref.organization}</p>
                <a
                  href={`tel:${ref.phone}`}
                  className="text-teal hover:text-teal-dark font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  {ref.phone}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-navy rounded-2xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Interested in collaboration, partnership, or learning more about
            Luckson Homes? I'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={`mailto:${director.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-gold text-navy px-8 py-4 rounded-lg font-bold shadow-gold-lg hover:shadow-gold transition-all duration-300 flex items-center gap-2"
            >
              <Mail size={20} />
              Send Email
            </motion.a>
            <motion.a
              href={`tel:${director.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold hover:bg-gold hover:text-navy transition-all duration-300 flex items-center gap-2"
            >
              <Phone size={20} />
              Call Now
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DirectorPortfolio;
