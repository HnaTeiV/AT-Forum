'use client';

import { useEffect, useState } from 'react';

type Post = {
  _id: string;
  threadId: {
    _id: string;
    title: string;
  };
  userId: {
    _id: string;
    username: string;
  };
  content: string;
  createdAt: string;
};

export default function ProjectPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/post')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Forum Posts</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-1">{post.threadId.title}</h2>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <div className="text-sm text-gray-500">
              By <span className="font-medium">{post.userId.username}</span> on{' '}
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
