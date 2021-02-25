import { useState, useCallback } from 'react';

export default function usePostModel() {
  const [ post, setPost ] = useState<{cookies: any[]}>({
    cookies: []
  });

  return {
    post
  }
  
}