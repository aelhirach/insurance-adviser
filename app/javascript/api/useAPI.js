
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import APIService from "./APIService"

export default function useAPI(method, initialData, skip, ...params) {
    // ---- State
    const [data, setData]           = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState(null);
    const [loaded, setLoaded] = useState(false);
    const cancelled = useRef(false);
    // ---- API
    const fetchData = async (skip = false,...params) => {
        if (skip) {
          setData(null);
          setIsLoading(false);
          setLoaded(false);
        } else {
            setError(null);
            setIsLoading(true);
            try {
                  let resultData = await APIService[method](...params)
                  if (!cancelled.current) {
                        Array.isArray(resultData) && initialData ? setData([...initialData, ...resultData]) : setData(resultData)
                        setLoaded(true)
                  }
        } catch (e) {
            setError(e);
        } finally {
           setIsLoading(false);
      }}
    };

    useEffect(() => {
      fetchData(skip,...params)
      return () => { cancelled.current = true };
    }, []);

    return [ data, isLoading, error, fetchData, setData, loaded, cancelled];
}
