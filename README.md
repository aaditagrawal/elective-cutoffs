# Elective Cutoffs

A web application for browsing and filtering elective course cutoffs for MIT Manipal students. A semester toggle switches between VI semester data from Academic Year 2025–26 and VII semester data from Academic Year 2026–27.

## Features

- **Browse Electives**: View all available electives across different categories
- **Semester Toggle**: Switch between VI and VII semester allocation datasets
- **Filter by Type**: Semester-specific OE and PE categories
- **Filter by Department**: Filter electives by offering department
- **Search**: Search by course code, name, or department
- **Sort Options**: Sort by name, cutoff (CGPA), number of students, or difficulty
- **Statistics Dashboard**: Overview of cutoff ranges and available courses

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI and Base UI)
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd elective-cutoffs
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint

## Project Structure

```
elective-cutoffs/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── elective-dashboard.tsx  # Main dashboard component
│   ├── example.tsx              # Component examples
│   └── ui/                      # shadcn/ui components
├── .private-data/               # Gitignored source workbooks and student-level records
├── data/                        # Public course-level aggregate datasets
├── lib/
│   ├── electives.ts        # Elective data & utilities
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## Data

Institutional source workbooks contain student records and must remain under the gitignored `.private-data/` directory. Only sanitized course-level aggregates—course details, cutoff range, and allocation count—are tracked under `data/` and sent to the browser. Do not expose the source workbooks or student-level records.

### UI Components

This project uses shadcn/ui for components. To add a new component:

```bash
bunx shadcn@latest add <component-name>
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy

### Other Platforms

For other hosting platforms, build the production version:

```bash
bun build
bun start
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is for educational purposes. The elective data is sourced from institutional records.

## Authors

- [Lakshit Verma](https://lverma.com)
- [Aadit Agrawal](https://aadit.cc)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
