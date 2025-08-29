
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  type: 'theory' | 'practical' | 'code' | 'advanced';
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  topics: Topic[];
}

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchModule = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/modules/${moduleId}`, {
          credentials: 'include'
        });

        if (response.status === 404) {
          setError('Module not found');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch module');
        }

        const data = await response.json();
        setModule(data.data.module);

        // TODO: Fetch user progress from backend
        // For now, simulate some completed topics
        setCompletedTopics(new Set(['what_is_pandas'])); // Example completed topic

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (moduleId) {
      fetchModule();
    }
  }, [moduleId]);

  // 🎯 WORKING QUICK ACTIONS HANDLERS
  const handlePracticeDatasets = () => {
    // Show available datasets with sample data
    alert(`📊 Practice Datasets Available:

1. Sales Dataset (CSV) - Product sales data with 1000+ records
2. Employee Dataset (JSON) - HR data with departments & salaries  
3. Weather Dataset (CSV) - Temperature & precipitation data
4. Student Grades (Excel) - Academic performance data
5. Financial Dataset (CSV) - Stock prices & trading volume

Feature coming soon: Interactive dataset explorer!`);

    // In a real app, this would navigate to datasets page
    // window.open('/datasets', '_blank');
  };

  const handleTakeNotes = () => {
    // Simple notes interface
    const existingNotes = localStorage.getItem(`notes_${moduleId}`) || '';
    const notes = prompt(`📝 Take Notes for "${module?.title}":

Enter your learning notes, thoughts, or questions:`, existingNotes);

    if (notes !== null) {
      if (notes.trim()) {
        localStorage.setItem(`notes_${moduleId}`, notes);
        alert('✅ Notes saved successfully!\n\nYour notes are saved locally and will persist between sessions.');
      } else {
        localStorage.removeItem(`notes_${moduleId}`);
        alert('📝 Notes cleared.');
      }
    }
  };

  const handlePracticeExercises = () => {
    // Navigate to the next uncompleted topic for practice
    if (module) {
      const nextTopic = module.topics.find(topic => !completedTopics.has(topic.id));
      if (nextTopic) {
        alert(`🎯 Starting Practice Exercise!

You'll be taken to: "${nextTopic.title}"

This topic includes:
• Interactive code examples
• Hands-on practice exercises  
• Self-assessment quiz
• Real-world applications

Ready to practice pandas skills?`);
        router.push(`/modules/${moduleId}/${nextTopic.id}`);
      } else {
        alert(`🎉 All topics completed!

Great job! You can:
• Review any topic for reinforcement
• Practice with real datasets
• Take the final module assessment

Would you like to review the first topic?`);
        router.push(`/modules/${moduleId}/${module.topics[0].id}`);
      }
    }
  };

  const handleViewProgress = () => {
    // Show progress details
    const completionRate = progress.percentage;
    const timeEstimate = module ? parseInt(module.estimatedTime) : 0;
    const timeSpent = Math.round((completionRate / 100) * timeEstimate * 60); // minutes

    alert(`📈 Your Learning Progress:

Module: ${module?.title}
Progress: ${progress.completed}/${progress.total} topics (${completionRate}%)
Estimated Time Remaining: ${Math.max(0, timeEstimate * 60 - timeSpent)} minutes

Completed Topics:
${Array.from(completedTopics).map(id => 
  module?.topics.find(t => t.id === id)?.title || id
).join('\n')}

Keep up the great work! 🐼📚`);

    // In a real app, this would navigate to a detailed progress page
    // router.push('/progress');
  };

  // Helper functions
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  // Calculate progress
  const progress = module ? {
    completed: completedTopics.size,
    total: module.topics.length,
    percentage: Math.round((completedTopics.size / module.topics.length) * 100)
  } : { completed: 0, total: 0, percentage: 0 };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading module...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error:</strong> {error}
          </div>
          <Link 
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <Link 
            href="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link 
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 mr-4"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                🐼 <span className="ml-2">{module.title}</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900">{module.title}</h2>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(module.difficulty)}`}>
              {module.difficulty}
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-6">{module.description}</p>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-sm text-gray-500 space-x-6">
              <span className="flex items-center">
                <span className="mr-2">📅</span>
                Estimated Time: {module.estimatedTime}
              </span>
              <span className="flex items-center">
                <span className="mr-2">📝</span>
                {module.topics.length} Topics
              </span>
              <span className="flex items-center">
                <span className="mr-2">✅</span>
                {progress.completed}/{progress.total} Completed
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-900">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Learning Topics</h3>

          <div className="space-y-4">
            {module.topics.map((topic, index) => {
              const isCompleted = completedTopics.has(topic.id);

              return (
                <div 
                  key={topic.id} 
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                    isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{topic.title}</h4>
                      <p className="text-sm text-gray-500">Topic ID: {topic.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTopicTypeColor(topic.type)}`}>
                      {topic.type}
                    </span>

                    {isCompleted && (
                      <span className="text-green-600 font-medium text-sm">Completed</span>
                    )}

                    <Link href={`/modules/${moduleId}/${topic.id}`}>
                      <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}>
                        {isCompleted ? 'Review Topic' : 'Start Topic'}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✨ WORKING QUICK ACTIONS ✨ */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Practice with Datasets */}
            <button 
              onClick={handlePracticeDatasets}
              className="group text-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <div className="text-2xl mb-2 group-hover:animate-bounce">📊</div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Practice with Datasets</p>
            </button>

            {/* Take Notes */}
            <button 
              onClick={handleTakeNotes}
              className="group text-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              <div className="text-2xl mb-2 group-hover:animate-pulse">📝</div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-green-600">Take Notes</p>
            </button>

            {/* Practice Exercises */}
            <button 
              onClick={handlePracticeExercises}
              className="group text-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <div className="text-2xl mb-2 group-hover:animate-spin">🎯</div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Practice Exercises</p>
            </button>

            {/* View Progress */}
            <button 
              onClick={handleViewProgress}
              className="group text-center p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <div className="text-2xl mb-2 group-hover:animate-bounce">📈</div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600">View Progress</p>
            </button>
          </div>

          {/* Quick Actions Hint */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Click any Quick Action button above to try out the interactive features!
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link 
            href="/dashboard"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Back to Dashboard
          </Link>

          <div className="space-x-4">
            <Link href={`/modules/${moduleId}/${module.topics[0].id}`}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                {progress.completed === 0 ? 'Start Module' : 'Continue Learning'}
              </button>
            </Link>

            {progress.completed > 0 && (
              <Link href={`/modules/${moduleId}/${module.topics[progress.completed]?.id || module.topics[0].id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  Next Topic
                </button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
