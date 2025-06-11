import React, { useEffect, useState } from 'react';

export default function Project() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/post')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Forum Posts</h1>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-1">
              {post.threadId?.title || 'No Title'}
            </h2>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <div className="text-sm text-gray-500">
              By{' '}
              <span className="font-medium">
                {post.userId?.username || 'Anonymous'}
              </span>{' '}
              on {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
