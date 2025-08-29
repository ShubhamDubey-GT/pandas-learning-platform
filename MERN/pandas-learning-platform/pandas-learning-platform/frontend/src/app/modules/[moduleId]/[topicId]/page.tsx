'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { topicData, TopicContent } from '@/lib/topicData';
import { useEffect, useState } from 'react';

export default function TopicPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const topicId = params.topicId as string;

  const [topic, setTopic] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Get topic content from local data
    const content = topicData[topicId];
    if (content) {
      setTopic(content);
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [topicId]);

  // Custom markdown components with syntax highlighting
  const markdownComponents = {
    code({node, inline, className, children, ...props}: any) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      
      return !inline ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          PreTag="div"
          className="rounded-lg my-4"
          customStyle={{
            backgroundColor: '#1a202c',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono" 
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({children}: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">{children}</h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">{children}</h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">{children}</h3>
    ),
    p: ({children}: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed text-lg">{children}</p>
    ),
    ul: ({children}: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 ml-4">{children}</ul>
    ),
    ol: ({children}: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 ml-4">{children}</ol>
    ),
    li: ({children}: any) => (
      <li className="text-gray-700 text-lg">{children}</li>
    ),
    strong: ({children}: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({children}: any) => (
      <em className="italic text-gray-800">{children}</em>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 my-4 italic">
        {children}
      </blockquote>
    ),
  };

  const copyCodeToClipboard = async () => {
    if (topic?.content.codeExample) {
      try {
        // Extract code from markdown if it's in markdown format
        let codeText = topic.content.codeExample;
        
        // If it contains markdown code blocks, extract just the code
        const codeBlockRegex = /```[\s\S]*?\n([\s\S]*?)```/g;
        const matches = codeText.match(codeBlockRegex);
        
        if (matches) {
          // Extract all code blocks and join them
          codeText = matches
            .map(match => match.replace(/```[\s\S]*?\n/, '').replace(/```$/, ''))
            .join('\n\n');
        }
        
        await navigator.clipboard.writeText(codeText);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = topic.content.codeExample;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    }
  };

  const markAsCompleted = async () => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          moduleId,
          topicId,
          completed: true,
          timeSpent: 15
        })
      });

      if (response.ok) {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Error marking topic as completed:', error);
      // Still mark as completed locally even if API fails
      setCompleted(true);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getNextTopicId = (): string | null => {
    const topics = ['what_is_pandas', 'installation_setup', 'importing_pandas', 'intro_series', 'intro_dataframe'];
    const currentIndex = topics.indexOf(topicId);
    return currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;
  };

  const getPrevTopicId = (): string | null => {
    const topics = ['what_is_pandas', 'installation_setup', 'importing_pandas', 'intro_series', 'intro_dataframe'];
    const currentIndex = topics.indexOf(topicId);
    return currentIndex > 0 ? topics[currentIndex - 1] : null;
  };

  const getTopicTypeColor = (type: string): string => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-green-100 text-green-800';
      case 'code': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading topic content...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
          <p className="text-gray-600 mb-4">The topic "{topicId}" could not be found.</p>
          <Link 
            href={`/modules/${moduleId}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Module
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link 
                href={`/modules/${moduleId}`}
                className="text-gray-500 hover:text-gray-700 mr-4 transition-colors"
              >
                ← Back to Module
              </Link>
              <h1 className="text-xl font-bold text-gray-900">{topic.title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              {completed && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Completed
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTopicTypeColor(topic.type)}`}>
                {topic.type}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Topic Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{topic.title}</h2>

          {/* Explanation - Now with Markdown Support */}
          <div className="prose prose-lg max-w-none mb-8">
            <ReactMarkdown components={markdownComponents}>
              {topic.content.explanation}
            </ReactMarkdown>
          </div>

          {/* Code Example - Now with Markdown Support */}
          {topic.content.codeExample && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">💻 Code Example</h3>
                <button 
                  onClick={copyCodeToClipboard}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    copiedCode 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {copiedCode ? '✅ Copied!' : '📋 Copy Code'}
                </button>
              </div>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown components={markdownComponents}>
                  {topic.content.codeExample}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Practical Exercise - Now with Markdown Support */}
          {topic.content.practicalExercise && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Practice Exercise</h3>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown components={markdownComponents}>
                    {topic.content.practicalExercise}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* Key Points */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔑 Key Points</h3>
            <ul className="space-y-3">
              {topic.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-gray-700 text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz Section */}
          {topic.content.quiz && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🧠 Quick Quiz</h3>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <p className="text-lg font-medium mb-4">{topic.content.quiz.question}</p>
                <div className="space-y-2 mb-4">
                  {topic.content.quiz.options.map((option, index) => (
                    <label key={index} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="quiz"
                        value={index}
                        onChange={() => setQuizAnswer(index)}
                        className="mr-3"
                        disabled={quizSubmitted}
                      />
                      <span className={`${
                        quizSubmitted && index === topic.content.quiz!.correct
                          ? 'text-green-600 font-medium'
                          : quizSubmitted && index === quizAnswer && index !== topic.content.quiz!.correct
                          ? 'text-red-600'
                          : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className={`p-3 rounded-md ${
                    quizAnswer === topic.content.quiz.correct
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {quizAnswer === topic.content.quiz.correct
                      ? '🎉 Correct! Well done!'
                      : `❌ Incorrect. The correct answer is: ${topic.content.quiz.options[topic.content.quiz.correct]}`
                    }
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {getPrevTopicId() ? (
              <Link href={`/modules/${moduleId}/${getPrevTopicId()}`}>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  ← Previous Topic
                </button>
              </Link>
            ) : (
              <Link href={`/modules/${moduleId}`}>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  ← Back to Module
                </button>
              </Link>
            )}
          </div>

          <div className="flex space-x-4">
            {!completed && (
              <button 
                onClick={markAsCompleted}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                ✓ Mark Complete
              </button>
            )}
            {getNextTopicId() ? (
              <Link href={`/modules/${moduleId}/${getNextTopicId()}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  Next Topic →
                </button>
              </Link>
            ) : (
              <Link href={`/modules/${moduleId}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  Finish Module
                </button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}