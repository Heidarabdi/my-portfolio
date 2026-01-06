// Site-wide data
// Note: Projects have been moved to Content Collections at src/content/projects/
// To add a new project, create a new .md file in src/content/projects/

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
