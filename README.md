# 🛡️ AI-Auditor

**Automated Accessibility Compliance Engine**

AI-Auditor is a powerful tool designed to scan live websites for accessibility (A11y) violations and provide instant, AI-generated fixes using the Gemini 2.5/1.5 Flash models. Built with a modern tech stack, it combines the precision of industry-standard auditing tools with the creative problem-solving of Generative AI.

---

## ✨ Features

- **🚀 Live Website Auditing**: Simply enter a URL to perform a comprehensive accessibility scan using Puppeteer and Axe-core.
- **🤖 AI-Driven Fixes**: Automatically generates WCAG 2.1 AA compliant HTML fixes for every detected violation.
- **📊 Interactive Dashboard**: A premium, dark-themed UI built with Next.js for a professional experience.
- **🔍 Side-by-Side Diff**: Compare your existing "broken" code with the AI's suggested fixes using an integrated diff viewer.
- **⚡ Supercharged Performance**: Backend built with TypeScript and Express for reliability and speed.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/API**: [Axios](https://axios-http.com/)
- **UI Components**: [React Diff Viewer Continued](https://github.com/praneshr/react-diff-viewer-continued)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Auditing**: [@axe-core/puppeteer](https://www.deque.com/axe/) & [Puppeteer](https://pptr.dev/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/) (gemini-2.5-flash / gemini-1.5-flash)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A [Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-auditor.git
   cd ai-auditor
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage

1. Launch both the frontend and backend servers.
2. Enter the full URL of the website you want to audit (e.g., `https://example.com`).
3. Click **"Start Audit"**.
4. Review the results:
   - **Violation Description**: Understand what's wrong and why it matters.
   - **Impact Level**: Critical, Serious, or Moderate.
   - **AI Fix**: See exactly how to change your code to pass the audit.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
