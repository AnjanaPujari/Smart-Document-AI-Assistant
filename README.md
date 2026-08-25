# Smart Document AI Assistant

An AI-powered document question-answering system that allows users to upload PDF or DOCX documents and ask questions about their contents.

The system extracts text from the uploaded document, divides it into smaller overlapping chunks, converts the chunks into embeddings, retrieves the most relevant information using FAISS, and uses a Groq-powered LLM to generate answers based on the retrieved document context.

## Features

- Upload PDF and DOCX documents
- Automatic text extraction
- Document chunking with overlapping chunks
- Semantic search using Sentence Transformers
- Vector similarity search using FAISS
- AI-powered question answering using Groq
- Answers grounded in the uploaded document context
- Instructs the LLM to answer only from the retrieved document context
- Returns a clear message when information is not found
- Handles empty questions
- Handles invalid file types
- Handles documents with no readable text
- Modern and responsive web interface
- Drag-and-drop document upload
- Loading and error states

## Technologies Used

### Backend

- Python
- FastAPI
- Uvicorn
- Sentence Transformers
- FAISS
- PyPDF
- python-docx
- LangChain Groq

### AI / NLP

- Sentence Transformers: `all-MiniLM-L6-v2`
- Groq LLM: `openai/gpt-oss-20b`

### Frontend

- HTML
- CSS
- JavaScript

## How It Works

The application follows a Retrieval-Augmented Generation (RAG) workflow:

User uploads document
        ->
Text extraction
        ->
Text chunking
        ->
Sentence embeddings
        ->
FAISS vector index
        ->
User asks a question
        ->
Question embedding
        ->
Relevant chunks retrieved
        ->
Retrieved context sent to LLM
        ->
Answer generated from document context
        ->
Answer displayed in UI


## Installation

### 1. Clone the repository

git clone https://github.com/AnjanaPujari/Smart-Document-AI-Assistant.git

### 2. Open the project

cd Smart-Document-AI-Assistant

### 3. Create a virtual environment

python -m venv venv

### 4. Activate the virtual environment

Windows:

venv\Scripts\activate

### 5. Install dependencies

pip install fastapi uvicorn python-multipart sentence-transformers faiss-cpu pydantic pypdf python-docx langchain-groq

## Environment Variables

The Groq API key should be stored securely and should not be committed to GitHub.

Set the `GROQ_API_KEY` environment variable with your Groq API key.

Example:

GROQ_API_KEY=your_groq_api_key

Never commit your actual API key to GitHub.

Make sure `.env` is included in `.gitignore` if you choose to store environment variables in a `.env` file.

## Running the Application

Start the FastAPI server:

uvicorn main:app --reload

Open the web application:

http://127.0.0.1:8000/app

The FastAPI Swagger documentation is available at:

http://127.0.0.1:8000/docs

## API Endpoints

### Upload Document

POST /upload

Uploads a PDF or DOCX document, extracts its text, creates chunks, generates embeddings, and stores them in the FAISS index.

### Ask a Question

POST /search

Accepts a question and retrieves relevant document content before generating an answer.

### Application

GET /app

Opens the web-based Smart Document AI Assistant interface.

## Supported Documents

Currently supported:

- PDF (.pdf)
- Microsoft Word (.docx)

## Error Handling

The application handles several common situations:

- Asking a question before uploading a document
- Empty questions
- Unsupported file types
- Documents with no readable text
- Questions whose answers are not present in the document

When information cannot be found in the uploaded document, the assistant responds:

Information not found in the document.

## Important Security Note

Never commit API keys, `.env` files, virtual environments, uploaded documents, or cache files to GitHub.

Keep sensitive information in environment variables and add sensitive files to `.gitignore`.

## Future Improvements

- Support for more document formats
- Conversation history
- Multiple document support
- Authentication and user accounts
- Persistent vector database
- Better document metadata handling
- Source citations for retrieved information
- Deployment to a cloud platform
- Improved UI and accessibility

## Project Status

The current version supports document upload, text extraction, semantic retrieval, AI-powered question answering, error handling, and a responsive web interface.