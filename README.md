"# ED-Tech-MVP" 
# 🎓 RAG-Powered Ed-Tech Platform (MVP)

An **AI-powered tutoring platform** that leverages **RAG (Retrieval-Augmented Generation)** with **Vector Databases** to provide students with **personalized learning support**, and teachers with **insights & tools**.  

This project is a full-stack MVP built with **Node.js + Express (backend)** and **React + Redux Toolkit Query (frontend)**, using **ChromaDB, MongoDB, and Google Gemini API**.

---

## ✨ Features

### 👩‍🎓 Student Features
- **RAG Search**: Ask natural language questions → context-aware answers (powered by ChromaDB + Gemini API).  
- **Essay Scoring**: Write essays → AI scores out of 25 with structured feedback.  
- **Lesson Generator**: Generate concise lessons from video transcripts.  
- **Content Explorer**: Explore course materials by subject and topic.  
- **Personalized Dashboard**: View recommendations and track mastery updates.  

### 👨‍🏫 Teacher Features
- Upload **reference materials** (PDF chapters, YouTube lectures).  
- **Knowledge graph storage** in MongoDB to visualize concept relationships.  
- Monitor student essays and AI evaluations.  

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express** – REST API  
- **MongoDB** – User data, essay storage, knowledge graph  
- **ChromaDB** – Vector DB for semantic search (RAG)  
- **Google Gemini API** – LLM for embeddings & generation  
- **Custom ingestion utils** – PDF parsing, transcript fetching, chunking, embeddings  

### Frontend
- **React + Vite**  
- **Redux Toolkit Query (RTK Query)** – API integration & caching  
- **TailwindCSS** – UI styling  
- **Reusable Components**: SearchBox, EssayForm, LessonGenerator, Dashboard, ContentExplorer  

---

## 🧩 System Architecture

```mermaid
flowchart TD
    subgraph Ingestion
        A[PDF / YouTube Transcript] --> B[Chunking]
        B --> C[Embeddings via Gemini]
        C --> D[ChromaDB Store]
    end

    subgraph Retrieval
        E[Student Query] --> F[Query Embedding]
        F --> G[ChromaDB Similarity Search]
        G --> H[Top-k Context Retrieved]
        H --> I[LLM (Gemini) with Prompt]
        I --> J[Grounded Answer]
    end

    subgraph Essay Evaluation
        K[Essay Submission] --> L[LLM Prompt (Scoring out of 25)]
        L --> M[Score + Feedback Returned]
    end

    subgraph User Personalization
        N[User Interactions] --> O[Update Mastery Scores]
        O --> P[Recommendations via MongoDB]
    end
