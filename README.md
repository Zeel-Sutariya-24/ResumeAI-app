# ResumeAI - AI Resume Analyzer (Frontend)

ResumeAI is an AI-powered resume analysis platform that helps users upload their resumes, extract relevant information, and receive AI-based feedback to improve ATS compatibility.

This repository contains the frontend application built with React.

## Overview

The application provides a user interface for:
- Uploading resumes
- Viewing extracted resume information
- Receiving ATS analysis and improvement suggestions
- Managing resume-related workflows
- Build Resumes
- 2 Templeates for Resumes
- Local Storage (cookies)

The frontend communicates with a Node.js/Express backend API for authentication, resume processing, and AI-powered analysis.

## Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS

### API Communication
- REST APIs
- Axios

### Deployment
- Vercel

## Features

### Resume Upload
Users can upload resume files for processing and analysis.

Supported document workflows include:
- PDF resumes
- DOCX resumes
- Image-based resumes

### AI-Powered Feedback
The application displays AI-generated:
- ATS compatibility feedback
- Resume improvement suggestions
- Content recommendations

### User Experience
- Responsive UI
- Resume analysis workflow
- Error handling for failed requests
- Loading states during AI processing

## Application Flow

## Engineering Notes

A major challenge was handling different resume formats and ensuring users received meaningful feedback even when document extraction or AI processing produced unexpected results.

The frontend includes validation and error handling to provide a reliable experience when communicating with backend services.

## Future Improvements

- Migration to the newer Next.js implementation
- Improved resume preview experience
- Additional user customization features
