    # CodeSift - AI-Powered Code Editor

    ## 📋 Table of Contents
    - [Overview](#overview)
    - [Features](#features)
    - [Architecture](#architecture)
    - [Tech Stack](#tech-stack)
    - [Getting Started](#getting-started)
    - [Project Structure](#project-structure)
    - [Core Features Explained](#core-features-explained)
    - [API Routes](#api-routes)
    - [Database Schema](#database-schema)
    - [Environment Variables](#environment-variables)
    - [Usage Guide](#usage-guide)
    - [Development](#development)

    ---

    ## 🎯 Overview

    **CodeSift** is an AI-powered collaborative code editor built with Next.js 14, featuring real-time code editing, AI-assisted code completion, intelligent code suggestions, and an integrated AI chat assistant. It combines the power of modern web technologies with advanced AI models to provide a seamless coding experience.

    ### Key Highlights
    - 🤖 **AI Code Completion**: Real-time code suggestions powered by OpenAI GPT-4
    - ✨ **Quick Edit**: Select code and edit it with natural language instructions
    - 💬 **AI Chat Assistant**: Context-aware conversations about your code
    - 📁 **Project Management**: Create, organize, and manage multiple projects
    - 🎨 **Modern Code Editor**: Built on CodeMirror 6 with syntax highlighting
    - 🔐 **Authentication**: Secure user authentication with Clerk
    - 📊 **Real-time Database**: Powered by Convex for instant updates

    ---

    ## ✨ Features

    ### 1. **AI-Powered Code Suggestions**
    - Automatic code completion as you type
    - Context-aware suggestions based on file content
    - Debounced API calls to optimize performance
    - Press `Tab` to accept suggestions

    ### 2. **Quick Edit with AI**
    - Select any code block
    - Press `Cmd/Ctrl + K` to open quick edit
    - Describe changes in natural language
    - AI edits the code while maintaining formatting
    - Supports URL scraping for documentation context

    ### 3. **AI Chat Assistant**
    - Project-specific conversations
    - Ask questions about your code
    - Get explanations and suggestions
    - Conversation history saved per project

    ### 4. **Advanced Code Editor**
    - Syntax highlighting for 15+ languages
    - Minimap for code navigation
    - Indentation markers
    - Custom dark theme
    - Auto-save functionality (1.5s debounce)

    ### 5. **Project Management**
    - Create multiple projects
    - File explorer with folder structure
    - Create, rename, and organize files/folders
    - Real-time file updates
    - Project search with `Cmd/Ctrl + K`

    ### 6. **File Explorer**
    - Tree view with expand/collapse
    - Create files and folders
    - Rename and organize
    - Visual file type indicators
    - Keyboard shortcuts

    ---

    ## 🏗️ Architecture

    ### Frontend Architecture
    ```
    ┌─────────────────────────────────────────┐
    │           Next.js 14 App Router         │
    ├─────────────────────────────────────────┤
    │  ┌─────────────┐  ┌──────────────────┐ │
    │  │   Pages     │  │   Components     │ │
    │  │  - Home     │  │  - Editor        │ │
    │  │  - Project  │  │  - FileExplorer  │ │
    │  │             │  │  - Chat          │ │
    │  └─────────────┘  └──────────────────┘ │
    ├─────────────────────────────────────────┤
    │  ┌─────────────┐  ┌──────────────────┐ │
    │  │   Hooks     │  │   Extensions     │ │
    │  │  - Editor   │  │  - Suggestion    │ │
    │  │  - Files    │  │  - QuickEdit     │ │
    │  │  - Projects │  │  - Theme         │ │
    │  └─────────────┘  └──────────────────┘ │
    └─────────────────────────────────────────┘
    ```

    ### Backend Architecture
    ```
    ┌─────────────────────────────────────────┐
    │          API Routes (Next.js)           │
    ├─────────────────────────────────────────┤
    │  /api/messages      - Chat messages     │
    │  /api/suggestion    - Code completion   │
    │  /api/quick-edit    - Code editing      │
    │  /api/inngest       - Background jobs   │
    └─────────────────────────────────────────┘
            ↓                    ↓
    ┌──────────────────┐  ┌──────────────────┐
    │  Convex Database │  │   AI Services    │
    │  - Projects      │  │  - OpenAI        │
    │  - Files         │  │  - Google AI     │
    │  - Conversations │  │  - Firecrawl     │
    │  - Messages      │  │                  │
    └──────────────────┘  └──────────────────┘
    ```

    ---

    ## 🛠️ Tech Stack

    ### Frontend
    - **Framework**: Next.js 14 (App Router)
    - **Language**: TypeScript
    - **Styling**: Tailwind CSS 4
    - **UI Components**: Radix UI
    - **Code Editor**: CodeMirror 6
    - **State Management**: Zustand
    - **Animations**: Framer Motion

    ### Backend
    - **Database**: Convex (Real-time)
    - **Authentication**: Clerk
    - **API**: Next.js API Routes
    - **Background Jobs**: Inngest
    - **Monitoring**: Sentry

    ### AI Services
    - **Code Completion**: OpenAI GPT-4o-mini
    - **Code Editing**: Google Gemini 2.5 Flash
    - **Web Scraping**: Firecrawl
    - **AI SDK**: Vercel AI SDK

    ### Development Tools
    - **Package Manager**: npm
    - **Linting**: ESLint
    - **Type Checking**: TypeScript
    - **Version Control**: Git

    ---

    ## 🚀 Getting Started

    ### Prerequisites
    - Node.js 18+ installed
    - npm or yarn package manager
    - Clerk account for authentication
    - Convex account for database
    - OpenAI API key
    - Google AI API key
    - Firecrawl API key (optional)

    ### Installation

    1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/codesift.git
    cd codesift
    ```

    2. **Install dependencies**
    ```bash
    npm install
    ```

    3. **Set up environment variables**
    Create a `.env.local` file in the root directory:
    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    # Convex Database
    CONVEX_DEPLOYMENT=your_convex_deployment
    NEXT_PUBLIC_CONVEX_URL=your_convex_url

    # AI Services
    OPENAI_API_KEY=your_openai_api_key
    GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
    FIRECRAWL_API_KEY=your_firecrawl_key

    # Inngest
    INNGEST_EVENT_KEY=your_inngest_event_key
    INNGEST_SIGNING_KEY=your_inngest_signing_key

    # Sentry (Optional)
    SENTRY_AUTH_TOKEN=your_sentry_token
    ```

    4. **Set up Convex**
    ```bash
    npx convex dev
    ```

    5. **Run the development server**
    ```bash
    npm run dev
    ```

    6. **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000)

    ---

    ## 📁 Project Structure

    ```
    codesift/
    ├── app/                          # Next.js App Router
    │   ├── api/                      # API Routes
    │   │   ├── messages/            # Chat message handling
    │   │   ├── suggestion/          # AI code suggestions
    │   │   ├── quick-edit/          # AI code editing
    │   │   └── inngest/             # Background jobs
    │   ├── project/[projectId]/     # Project pages
    │   ├── layout.tsx               # Root layout
    │   ├── page.tsx                 # Home page
    │   └── globals.css              # Global styles
    │
    ├── components/                   # Reusable components
    │   ├── ui/                      # UI primitives (buttons, inputs, etc.)
    │   └── ai-elements/             # AI-specific components
    │
    ├── features/                     # Feature modules
    │   ├── components/
    │   │   └── projects/            # Project management
    │   │       ├── components/      # Project UI components
    │   │       └── hooks/           # Project hooks
    │   ├── conversations/           # Chat functionality
    │   │   ├── components/          # Chat UI
    │   │   └── hooks/               # Chat hooks
    │   └── editor/                  # Code editor
    │       ├── components/          # Editor UI
    │       ├── extension/           # CodeMirror extensions
    │       │   ├── suggestion/      # AI suggestions
    │       │   ├── quick-edit/      # Quick edit feature
    │       │   ├── theme.ts         # Editor theme
    │       │   └── language-extension.ts
    │       ├── hooks/               # Editor hooks
    │       └── store/               # Editor state
    │
    ├── convex/                       # Convex backend
    │   ├── schema.ts                # Database schema
    │   ├── projects.ts              # Project queries/mutations
    │   ├── files.ts                 # File operations
    │   ├── conversations.ts         # Chat operations
    │   └── auth.ts                  # Authentication
    │
    ├── inngest/                      # Background jobs
    │   ├── client.ts                # Inngest client
    │   └── functions.ts             # Job functions
    │
    ├── lib/                          # Utility libraries
    │   ├── convex-client.ts         # Convex client setup
    │   ├── firecrawl.ts             # Firecrawl client
    │   └── utils.ts                 # Helper functions
    │
    ├── public/                       # Static assets
    ├── package.json                  # Dependencies
    ├── tsconfig.json                # TypeScript config
    ├── next.config.ts               # Next.js config
    └── tailwind.config.ts           # Tailwind config
    ```

    ---

    ## 🔧 Core Features Explained

    ### 1. AI Code Suggestions

    **How it works:**
    1. User types in the code editor
    2. After 300ms of inactivity (debounce), the system captures:
    - Current line content
    - Text before/after cursor
    - 5 previous lines
    - 5 next lines
    - Full file content
    3. Sends context to OpenAI GPT-4o-mini
    4. AI analyzes and returns suggestion
    5. Suggestion appears as ghost text
    6. User presses `Tab` to accept

    **Files involved:**
    - `features/editor/extension/suggestion/index.ts` - Main logic
    - `features/editor/extension/suggestion/fetcher.ts` - API calls
    - `app/api/suggestion/route.ts` - Backend endpoint

    **Key features:**
    - Debounced requests (300ms)
    - Abort controller for cancellation
    - Context-aware suggestions
    - Smart completion logic

    ### 2. Quick Edit Feature

    **How it works:**
    1. User selects code in editor
    2. Presses `Cmd/Ctrl + K`
    3. Tooltip appears with input field
    4. User types natural language instruction
    5. If instruction contains URLs, scrapes documentation
    6. Sends to Google Gemini 2.5 Flash
    7. AI returns edited code
    8. Replaces selection with edited version

    **Files involved:**
    - `features/editor/extension/quick-edit/index.ts` - UI and logic
    - `features/editor/extension/quick-edit/fetcher.ts` - API calls
    - `app/api/quick-edit/route.ts` - Backend endpoint

    **Example instructions:**
    - "Add error handling"
    - "Convert to async/await"
    - "Add TypeScript types"
    - "Refactor using https://react.dev/reference/react/useState"

    ### 3. AI Chat Assistant

    **How it works:**
    1. User types message in chat sidebar
    2. Message saved to Convex database
    3. API creates assistant response (placeholder)
    4. Conversation history maintained per project
    5. Real-time updates via Convex subscriptions

    **Files involved:**
    - `features/conversations/components/conversation-sidebar.tsx` - UI
    - `features/conversations/hooks/use-conversation.ts` - Hooks
    - `app/api/messages/route.ts` - Message handling
    - `convex/conversations.ts` - Database operations

    **Features:**
    - Multiple conversations per project
    - Conversation history
    - Real-time updates
    - Copy responses
    - Create new conversations

    ### 4. Code Editor

    **Built with CodeMirror 6:**
    - **Syntax Highlighting**: 15+ languages supported
    - **Minimap**: Overview of entire file
    - **Indentation Markers**: Visual guides
    - **Custom Theme**: Dark theme optimized for coding
    - **Auto-save**: Saves after 1.5s of inactivity
    - **Selection Tooltip**: Shows on text selection

    **Supported Languages:**
    - JavaScript/TypeScript
    - Python
    - Java
    - C/C++
    - Go
    - Rust
    - PHP
    - SQL
    - HTML/CSS
    - Markdown
    - JSON
    - And more...

    ### 5. File Management

    **Features:**
    - Create files and folders
    - Rename items
    - Nested folder structure
    - File type icons
    - Expand/collapse folders
    - Real-time updates

    **Operations:**
    - **Create File**: Click + icon or use shortcut
    - **Create Folder**: Click folder+ icon
    - **Rename**: Click on item name
    - **Open**: Click to open in editor
    - **Navigate**: Use file explorer tree

    ---

    ## 🔌 API Routes

    ### 1. `/api/messages` (POST)
    **Purpose**: Handle chat messages

    **Request:**
    ```json
    {
    "conversationId": "conversation_id",
    "message": "User message text"
    }
    ```

    **Response:**
    ```json
    {
    "messageId": "message_id"
    }
    ```

    **Authentication**: Required (Clerk)

    ---

    ### 2. `/api/suggestion` (POST)
    **Purpose**: Generate code suggestions

    **Request:**
    ```json
    {
    "fileName": "example.ts",
    "code": "full file content",
    "currentLine": "const x = ",
    "textBeforeCursor": "const x = ",
    "textAfterCursor": "",
    "previousLines": "previous 5 lines",
    "nextLines": "next 5 lines",
    "lineNumber": 10
    }
    ```

    **Response:**
    ```json
    {
    "suggestion": "suggested code"
    }
    ```

    **AI Model**: OpenAI GPT-4o-mini
    **Authentication**: Required (Clerk)

    ---

    ### 3. `/api/quick-edit` (POST)
    **Purpose**: Edit code with AI

    **Request:**
    ```json
    {
    "selectedCode": "code to edit",
    "fullCode": "entire file content",
    "instruction": "add error handling"
    }
    ```

    **Response:**
    ```json
    {
    "editedCode": "edited version"
    }
    ```

    **AI Model**: Google Gemini 2.5 Flash
    **Features**: 
    - URL scraping for documentation
    - Context-aware editing
    - Maintains formatting

    **Authentication**: Required (Clerk)

    ---

    ### 4. `/api/inngest` (POST/PUT)
    **Purpose**: Handle background jobs

    **Used for**: 
    - Long-running AI tasks
    - Web scraping
    - Batch operations

    **Authentication**: Inngest signing key

    ---

    ## 💾 Database Schema

    ### Convex Schema

    #### **Projects Table**
    ```typescript
    {
    _id: Id<"projects">,
    name: string,
    ownerId: string,
    updatedAt: number,
    importStatus?: "importing" | "completed" | "failed",
    exportStatus?: "exporting" | "completed" | "failed" | "canceled",
    exportRepoUrl?: string
    }
    ```

    **Indexes:**
    - `by_owner`: [ownerId]

    ---

    #### **Files Table**
    ```typescript
    {
    _id: Id<"files">,
    projectId: Id<"projects">,
    parentId?: Id<"files">,
    name: string,
    updatedAt: number,
    type: "file" | "folder",
    content?: string,        // For text files
    storageId?: Id<"_storage"> // For binary files
    }
    ```

    **Indexes:**
    - `by_project`: [projectId]
    - `by_parent`: [parentId]
    - `by_project_parent`: [projectId, parentId]

    ---

    #### **Conversations Table**
    ```typescript
    {
    _id: Id<"conversations">,
    projectId: Id<"projects">,
    title: string,
    updatedAt: number
    }
    ```

    **Indexes:**
    - `by_project`: [projectId]

    ---

    #### **Messages Table**
    ```typescript
    {
    _id: Id<"messages">,
    conversationId: Id<"conversations">,
    projectId: Id<"projects">,
    role: "user" | "assistant",
    content: string,
    status?: "processing" | "completed" | "canceled"
    }
    ```

    **Indexes:**
    - `by_conversation`: [conversationId]
    - `by_project_status`: [projectId, status]

    ---

    ## 🔐 Environment Variables

    ### Required Variables

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    # Convex Database
    CONVEX_DEPLOYMENT=prod:your-deployment
    NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

    # OpenAI (for code suggestions)
    OPENAI_API_KEY=sk-...

    # Google AI (for code editing)
    GOOGLE_GENERATIVE_AI_API_KEY=...

    # Firecrawl (for URL scraping)
    FIRECRAWL_API_KEY=fc-...

    # Inngest (for background jobs)
    INNGEST_EVENT_KEY=...
    INNGEST_SIGNING_KEY=...
    ```

    ### Optional Variables

    ```env
    # Sentry (Error tracking)
    SENTRY_AUTH_TOKEN=...
    NEXT_PUBLIC_SENTRY_DSN=...

    # Development
    NODE_ENV=development
    ```

    ---

    ## 📖 Usage Guide

    ### Creating a Project

    1. **From Home Page:**
    - Click "New" button
    - Or press `Ctrl/Cmd + J`
    - Project is created automatically

    2. **Import from GitHub:**
    - Click "Import" button
    - Or press `Ctrl/Cmd + I`
    - Enter GitHub URL (feature in development)

    ### Working with Files

    1. **Create File:**
    - Click file+ icon in project header
    - Enter filename with extension
    - Press Enter

    2. **Create Folder:**
    - Click folder+ icon
    - Enter folder name
    - Press Enter

    3. **Open File:**
    - Click on file name in explorer
    - File opens in editor

    4. **Edit File:**
    - Type in editor
    - Auto-saves after 1.5 seconds
    - See save indicator

    ### Using AI Features

    #### Code Suggestions:
    1. Start typing code
    2. Wait 300ms
    3. Ghost text appears
    4. Press `Tab` to accept
    5. Continue typing

    #### Quick Edit:
    1. Select code block
    2. Press `Cmd/Ctrl + K`
    3. Type instruction
    4. Press Enter or click Submit
    5. Code is replaced

    #### AI Chat:
    1. Type question in chat sidebar
    2. Press Enter
    3. AI responds with answer
    4. Copy response if needed
    5. Create new conversation with + icon

    ### Keyboard Shortcuts

    | Shortcut | Action |
    |----------|--------|
    | `Ctrl/Cmd + K` | Open command palette / Quick edit |
    | `Ctrl/Cmd + J` | Create new project |
    | `Ctrl/Cmd + I` | Import from GitHub |
    | `Tab` | Accept AI suggestion |
    | `Ctrl/Cmd + S` | Manual save (auto-save enabled) |

    ---

    ## 🔨 Development

    ### Running Locally

    ```bash
    # Install dependencies
    npm install

    # Start Convex dev server
    npx convex dev

    # Start Next.js dev server (in another terminal)
    npm run dev
    ```

    ### Building for Production

    ```bash
    # Build the application
    npm run build

    # Start production server
    npm start
    ```

    ### Code Structure Guidelines

    1. **Components**: Place in `components/` or feature-specific folders
    2. **Hooks**: Create custom hooks in `hooks/` folders
    3. **API Routes**: Add to `app/api/`
    4. **Convex Functions**: Add to `convex/`
    5. **Types**: Define in component files or shared types file

    ### Adding New Features

    1. **New AI Feature:**
    - Create API route in `app/api/`
    - Add extension in `features/editor/extension/`
    - Create fetcher for API calls
    - Integrate in code editor

    2. **New Database Table:**
    - Update `convex/schema.ts`
    - Create queries/mutations file
    - Add hooks in feature folder
    - Update TypeScript types

    3. **New UI Component:**
    - Create in `components/ui/` or feature folder
    - Use Radix UI primitives
    - Style with Tailwind CSS
    - Export from index

    ### Testing

    ```bash
    # Run linter
    npm run lint

    # Type check
    npx tsc --noEmit
    ```

    ---

    ## 🎨 Customization

    ### Changing Editor Theme

    Edit `features/editor/extension/theme.ts`:
    ```typescript
    export const customTheme = EditorView.theme({
    "&": {
        backgroundColor: "your-color",
        color: "your-text-color"
    },
    // ... more styles
    })
    ```

    ### Adding Language Support

    Edit `features/editor/extension/language-extension.ts`:
    ```typescript
    import { yourLanguage } from "@codemirror/lang-yourlang"

    // Add to getLanguageExtension function
    case "yourlang":
    return yourLanguage()
    ```

    ### Customizing AI Prompts

    Edit prompts in API routes:
    - `app/api/suggestion/route.ts` - Code suggestions
    - `app/api/quick-edit/route.ts` - Code editing

    ---

    ## 🐛 Troubleshooting

    ### Common Issues

    1. **AI suggestions not working:**
    - Check OPENAI_API_KEY is set
    - Verify API key is valid
    - Check browser console for errors

    2. **Database errors:**
    - Ensure Convex dev server is running
    - Check CONVEX_URL is correct
    - Verify authentication is working

    3. **Build errors:**
    - Clear `.next` folder
    - Delete `node_modules` and reinstall
    - Check TypeScript errors

    4. **Authentication issues:**
    - Verify Clerk keys are correct
    - Check Clerk dashboard settings
    - Clear browser cookies

    ---

    ## 📝 License

    This project is private and proprietary.

    ---

    ## 🤝 Contributing

    This is a personal project. For suggestions or issues, please contact the maintainer.

    ---

    ## 📧 Support

    For questions or support, please open an issue on GitHub or contact the development team.

    ---

    ## 🎉 Acknowledgments

    - Next.js team for the amazing framework
    - Convex for real-time database
    - CodeMirror for the editor
    - OpenAI and Google for AI models
    - Clerk for authentication
    - All open-source contributors

    ---

    **Built with ❤️ using Next.js, TypeScript, and AI**
