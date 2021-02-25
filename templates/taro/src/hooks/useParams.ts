import { useState, useEffect } from 'react';
import { getParams } from '@/utils/helper';

export default function useParams(tid: string) {
  const [state, setState] = useState<any>(getParams(tid));

  return state;
}