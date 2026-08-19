# Contributing to FinMate AI

Thank you for your interest in contributing to **FinMate AI**!  
We welcome improvements, bug fixes, and new ideas that align with the project’s vision: a modern, accessible, multilingual finance assistant.

---

## 🚀 Getting Started

1. **Fork the repository**  
   Click the "Fork" button on GitHub to create your own copy.

2. **Clone your fork**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/FinMate-AI.git
   cd FinMate-AI
   ```

3. **Install dependencies**

   ```bash
   npm install
   npm run prisma:generate
   ```

4. **Run the app locally**

   ```bash
   npm run dev
   ```

---

## 🧪 Testing

- Run the full test suite before submitting changes:

  ```bash
  npm test
  ```

- Tests are written in **Jest 29.7.0** with **ts‑jest 29.4.12**.
- Add new tests for any new features or bug fixes.

---

## 📜 Coding Standards

- **TypeScript first** → all new code should be in `.ts` or `.tsx`.
- **Linting** → follow ESLint rules (configured in repo).
- **Formatting** → use Prettier for consistent style.
- **Commit messages** → use clear, descriptive messages:
  - `fix: resolve login bug`
  - `feat: add weekly report generator`
  - `docs: update README with badges`

---

## ⚡ CI/CD Workflows

- **PR Checks Workflow** runs automatically:
  - ✅ Tests must pass
  - ✅ No vulnerabilities (`npm audit`)
- **Maintenance Workflow** runs weekly:
  - Logs outdated packages
  - Confirms repo health

Your PR will not be merged unless all checks pass.

---

## 📂 Repo Map

FinMate-AI/
├── prisma/ # Prisma schema & migrations
├── src/ # Application source code
├── tests/ # Jest test suites
├── jest.config.js # Jest configuration
├── jest.setup.js # Jest setup file
├── package.json # Dependencies & scripts
└── README.md # Project documentation

---

## 🔒 Security & Dependencies

- Run `npm audit` before pushing changes.
- Run `npm outdated` to check for newer versions.
- Do not upgrade major dependencies (e.g., Jest 30.x) without testing compatibility.

---

## 📌 Pull Request Guidelines

- Create a feature branch:

  ```bash
  git checkout -b feature/my-new-feature
  ```

- Push your branch and open a PR against `main`.
- Include a clear description of your changes.
- Reference related issues if applicable.

---

## 🙌 Community

We value:

- Clear documentation
- Accessible design
- Multilingual support
- Cost‑efficient scaling

By contributing, you help make FinMate AI more useful and polished for everyone.

---

## ⚡ Bottom line

This **CONTRIBUTING.md** ensures every contributor follows the same polished workflow: fork, install, test, commit, PR, and pass CI/CD checks. It pairs perfectly with your README and workflows, making your repo investor‑ready and contributor‑friendly.

Would you like me to also prepare a **CODE_OF_CONDUCT.md** so your repo has a clear community standard alongside README and CONTRIBUTING?
