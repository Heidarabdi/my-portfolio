export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    link: string;
    category: "Machine Learning" | "Web Development" | "IT Support" | "Other";
    longDescription: string;
    features: string[];
    gallery: string[];
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: "Machine Learning" | "Web Development" | "IT Operations";
    imageUrl: string;
    content: string;
}

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "ML Integration Platform",
        description:
            "Designed and developed machine learning models integrated into web-based applications for the Setsom Institute.",
        technologies: [
            "Machine Learning",
            "Python",
            "Web Development",
            "API Integration",
        ],
        imageUrl: "https://picsum.photos/600/400?random=10",
        link: "#",
        category: "Machine Learning",
        longDescription:
            "At the Setsom Institute for Robotics Engineering and Technology, I led the design and development of machine learning models. The core focus was on optimizing algorithms for real-world applications to enhance accuracy and performance. These models were seamlessly integrated into scalable web-based applications, enabling research teams to deploy reliable AI-driven solutions.",
        features: [
            "Custom ML Model Development",
            "Web-based Model Serving",
            "Algorithm Optimization for Real-world Data",
            "Scalable Deployment Architecture",
        ],
        gallery: [
            "https://picsum.photos/800/600?random=11",
            "https://picsum.photos/800/600?random=12",
        ],
    },
    {
        id: "2",
        title: "SNWO Official Portal",
        description:
            "Built and maintained the official website for the Somali National Women Organization to improve digital communication.",
        technologies: ["Web Development", "Responsive Design", "UI/UX", "CMS"],
        imageUrl: "https://picsum.photos/600/400?random=20",
        link: "#",
        category: "Web Development",
        longDescription:
            "This project involved a complete overhaul of the Somali National Women Organization (SNWO) digital presence. I built and maintained the official website with a strong emphasis on accessibility and user experience. The solution implemented responsive design principles to ensure seamless usability across all devices, significantly improving the organization's digital communication capabilities.",
        features: [
            "Responsive & Accessible Design",
            "User Experience (UX) Optimization",
            "Content Management System",
            "Digital Communication Tools",
        ],
        gallery: [
            "https://picsum.photos/800/600?random=21",
            "https://picsum.photos/800/600?random=22",
        ],
    },
    {
        id: "3",
        title: "Campus IT Infrastructure",
        description:
            "Provided comprehensive technical solutions and system maintenance for Jamhuriya University (JUST).",
        technologies: [
            "IT Support",
            "Hardware Troubleshooting",
            "System Admin",
            "Software Deployment",
        ],
        imageUrl: "https://picsum.photos/600/400?random=30",
        link: "#",
        category: "IT Support",
        longDescription:
            "As an IT Support Specialist at Jamhuriya University of Science & Technology, I improved the efficiency of computer labs through rigorous system setup and maintenance. The role involved providing technical assistance to students, troubleshooting hardware issues (keyboard, battery replacements), and managing large-scale software installations across the campus network.",
        features: [
            "Hardware Troubleshooting & Repair",
            "Lab Efficiency Optimization",
            "Software Lifecycle Management",
            "Student Technical Support",
        ],
        gallery: [
            "https://picsum.photos/800/600?random=31",
            "https://picsum.photos/800/600?random=32",
        ],
    },
    {
        id: "4",
        title: "Sentiment Analysis Tool",
        description:
            "A Python-based NLP tool for analyzing customer feedback and social media sentiment.",
        technologies: ["Python", "NLP", "Scikit-learn", "Data Visualization"],
        imageUrl: "https://picsum.photos/600/400?random=40",
        link: "#",
        category: "Machine Learning",
        longDescription:
            "Developed a natural language processing tool to categorize and analyze text data from various sources. This project utilizes Python libraries like Scikit-learn and NLTK to provide real-time sentiment scoring.",
        features: [
            "Real-time text analysis",
            "Sentiment scoring algorithm",
            "Visual reporting dashboard",
            "Multi-source data ingestion",
        ],
        gallery: [
            "https://picsum.photos/800/600?random=41",
            "https://picsum.photos/800/600?random=42",
        ],
    },
    {
        id: "5",
        title: "Hospital Management System",
        description:
            "A comprehensive Java-based system for managing patient records and appointments.",
        technologies: ["Java", "SQL", "Swing", "Database Design"],
        imageUrl: "https://picsum.photos/600/400?random=50",
        link: "#",
        category: "Other",
        longDescription:
            "Architected a desktop application for healthcare facilities to streamline patient registration, appointment scheduling, and record keeping. The system uses a robust SQL backend for data integrity.",
        features: [
            "Patient Record Management",
            "Appointment Scheduling",
            "Secure Login System",
            "Report Generation",
        ],
        gallery: [
            "https://picsum.photos/800/600?random=51",
            "https://picsum.photos/800/600?random=52",
        ],
    },
    {
        id: "6",
        title: "Auto-Backup Script Suite",
        description:
            "Automated shell scripts for server maintenance and data redundancy.",
        technologies: ["Bash", "Linux", "Cron", "Cloud Storage API"],
        imageUrl: "https://picsum.photos/600/400?random=60",
        link: "#",
        category: "IT Support",
        longDescription:
            "Created a suite of Bash scripts to automate critical server maintenance tasks, including daily backups to remote cloud storage, log rotation, and system health checks.",
        features: [
            "Automated Daily Backups",
            "Cloud Storage Integration",
            "Error Logging & Alerts",
            "Cron Job Management",
        ],
        gallery: [
            "https://picsum.photos/800/600?random=61",
            "https://picsum.photos/800/600?random=62",
        ],
    },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        title: "Bridging the Gap: Integrating AI Models into Modern Web Apps",
        excerpt:
            "A comprehensive guide on deploying Python-based Machine Learning models to production web interfaces using Flask and React.",
        date: "Jan 15, 2025",
        readTime: "8 min read",
        category: "Machine Learning",
        imageUrl: "https://picsum.photos/800/400?random=4",
        content: `
      <p class="mb-4">Bringing machine learning models from a Jupyter notebook to a production web application is a common challenge for many developers. The disconnect between the data science environment (typically Python-heavy) and the web development ecosystem (JavaScript/TypeScript) requires a robust integration strategy.</p>

      <p class="mb-8">In this post, I will share the methodology I used at the <strong>Setsom Institute</strong> to deploy predictive models for real-time usage.</p>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">The Architecture: Decoupling Frontend and Backend</h2>
      <p class="mb-4">The most effective approach is to treat the ML model as a microservice. This ensures that heavy computation does not block the main application thread and allows for independent scaling.</p>

      <ul class="list-disc list-inside space-y-2 mb-8 ml-4">
        <li><strong>Frontend:</strong> React (TypeScript) for a responsive user interface.</li>
        <li><strong>API Layer:</strong> Flask or FastAPI to expose model endpoints.</li>
        <li><strong>Model Serving:</strong> Scikit-learn or TensorFlow models serialized with Pickle/Joblib.</li>
      </ul>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Step 1: Serializing the Model</h2>
      <p class="mb-4">Before you can serve a model, it must be saved in a format that can be loaded without retraining. Here is a simple example using Python's pickle module:</p>

      <pre class="bg-paper-dim p-4 border border-line-medium overflow-x-auto mb-8 font-mono text-sm"><code class="language-python">import pickle
from sklearn.linear_model import LogisticRegression

# Train your model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the model to disk
filename = 'finalized_model.sav'
pickle.dump(model, open(filename, 'wb'))</code></pre>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Step 2: Creating the API Endpoint</h2>
      <p class="mb-4">Once serialized, we can wrap the model in a Flask route. This endpoint accepts JSON input from the frontend, transforms the data into the format the model expects, and returns the prediction.</p>

      <blockquote class="border-l-4 border-accent pl-4 italic text-stone-600 my-8">
        "The key to a responsive AI application is ensuring your inference time remains low. If a model takes more than 500ms to predict, consider using background workers like Celery."
      </blockquote>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Conclusion</h2>
      <p class="mb-4">Integrating AI into web apps doesn't have to be overwhelming. By isolating the model logic behind a clean API, we can build powerful, intelligent applications that leverage the best of both Python and JavaScript ecosystems.</p>
    `,
    },
    {
        id: "2",
        title: "Optimizing Web Accessibility for Public Sector Portals",
        excerpt:
            "Why inclusive design matters and how I implemented WCAG 2.1 standards for the Somali National Women Organization website.",
        date: "Nov 20, 2024",
        readTime: "6 min read",
        category: "Web Development",
        imageUrl: "https://picsum.photos/800/400?random=5",
        content: `
      <p class="mb-4">Building for the public sector means building for everyone. When I was tasked with developing the official portal for the <strong>Somali National Women Organization (SNWO)</strong>, accessibility wasn't just a "nice-to-have"—it was a fundamental requirement.</p>

      <p class="mb-8">Digital inclusion ensures that people with disabilities—visual, auditory, motor, or cognitive—can navigate, understand, and interact with the web. Here is how we achieved WCAG 2.1 compliance.</p>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Semantic HTML: The Foundation</h2>
      <p class="mb-4">Using correct HTML tags is the first and most impactful step. Screen readers rely on the document object model (DOM) to interpret content.</p>

      <ul class="list-disc list-inside space-y-2 mb-8 ml-4">
        <li>Use <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code> landmarks.</li>
        <li>Ensure heading levels (<code>h1</code> through <code>h6</code>) follow a logical hierarchy.</li>
        <li>Use <code>&lt;button&gt;</code> for actions and <code>&lt;a&gt;</code> for navigation links.</li>
      </ul>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Color Contrast and Visual Hierarchy</h2>
      <p class="mb-4">We adhered to a strict contrast ratio of at least 4.5:1 for normal text. This is crucial for users with low vision. Additionally, we ensured that color was not the only method used to convey information (e.g., adding text labels to error fields, not just red borders).</p>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Keyboard Navigation</h2>
      <p class="mb-4">A mouse is not the only way to browse the web. We rigorously tested the site using only a keyboard to ensure focus states were visible and logical tab order was preserved.</p>

      <pre class="bg-paper-dim p-4 border border-line-medium overflow-x-auto mb-8 font-mono text-sm"><code class="language-css">/* Example of high-visibility focus state */
button:focus-visible {
  outline: 3px solid #ea580c;
  outline-offset: 2px;
}</code></pre>

      <p class="mb-4">By prioritizing accessibility, we didn't just meet a standard; we expanded the reach of the organization's critical resources to the widest possible audience.</p>
    `,
    },
    {
        id: "3",
        title: "Effective IT Support: Managing Large-Scale Campus Infrastructure",
        excerpt:
            "Lessons learned from managing university computer labs, troubleshooting hardware, and maintaining software at Jamhuriya University.",
        date: "Aug 10, 2023",
        readTime: "5 min read",
        category: "IT Operations",
        imageUrl: "https://picsum.photos/800/400?random=6",
        content: `
      <p class="mb-4">Hardware fails, software crashes, and networks slow down. Being an IT Support Specialist at a major institution like <strong>Jamhuriya University of Science & Technology (JUST)</strong> is about more than just fixing broken printers—it's about ensuring the continuity of education.</p>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Proactive vs. Reactive Maintenance</h2>
      <p class="mb-4">The biggest shift I implemented was moving from a "break-fix" model to a proactive maintenance schedule. Instead of waiting for a computer to fail during a crucial exam, we established a weekly audit routine.</p>

      <ul class="list-disc list-inside space-y-2 mb-8 ml-4">
        <li><strong>Weekly:</strong> Software updates and antivirus scans.</li>
        <li><strong>Monthly:</strong> Disk cleanup and hardware dust removal.</li>
        <li><strong>Semester:</strong> Full system reimaging to clear temporary student data.</li>
      </ul>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Standardization is Key</h2>
      <p class="mb-4">Managing over 200 workstations individually is impossible. We utilized disk cloning tools to create a "Golden Image"—a master configuration with all necessary drivers and software installed.</p>

      <h2 class="text-2xl font-bold text-ink mb-4 mt-8 font-serif">Troubleshooting under Pressure</h2>
      <p class="mb-4">When a projector fails five minutes before a lecture, panic is the enemy. I developed a quick triage protocol:</p>
      <ol class="list-decimal list-inside space-y-2 mb-8 ml-4">
        <li><strong>Verify physical connections:</strong> Is it plugged in? Are cables secure?</li>
        <li><strong>Isolate variables:</strong> Swap the cable, then the laptop, then the port.</li>
        <li><strong>Software check:</strong> Are drivers updated? Is the output source correct?</li>
      </ol>

      <p class="mb-4">These experiences taught me that technical skills are only half the job; communication and calmness under pressure are what truly define a successful IT professional.</p>
    `,
    },
];
